const config = require('config');
const logger = require('logger');
const rp = require('request-promise');
const fs = require('fs');
const tempy = require('tempy');
const SphericalMercator = require('sphericalmercator');
const tinygradient = require('tinygradient');
const Jimp = require('jimp');
const uniqueString = require('unique-string');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

Jimp.prototype.writeAsync = util.promisify( Jimp.prototype.write );

const tiles = new SphericalMercator({
    size: 256
});

class TileService {
    static async getTile(z, x, y, tableName, layerConfig) {
	logger.info('[TileService] Obtaining tile');
	logger.debug(`tile coordinates: ${z}, ${x}, ${y}`);
	logger.debug(`tile tableName: ${tableName}`);
	logger.debug(`tile layerConfig: ${layerConfig}`);
	const bbox = await TileService.getBbox(z, x, y);
	logger.debug(`bbox is: ${bbox}`);
	const slices_expr = TileService.formSliceExpr(bbox);
	logger.debug(`slices_expr is: ${slices_expr}`);
	// ^ Remember to consider any extra axes
	// const extra_slices_expr = TileService.formSliceExpr(bbox, [{'axis': 'ansi', 'value': 1955}]);
	const tile_type = layerConfig.style;
	let query, result;
	switch (tile_type) {

	case 'single-band':

	    logger.debug('Single band raster detected');
	    // const bounds = layerConfig.bounds.map(parseFloat).sort();
	    const stops = layerConfig.colorRamp.map((col) => parseFloat(col.value)).sort((a, b) => a - b);
	    logger.debug(stops);
	    let {0: minBound, [stops.length -1]: maxBound} = stops;
	    const bounds = [minBound, maxBound];
	    logger.debug(`layer bounds:  ${bounds}`);
	    const band = layerConfig.band;
	    logger.debug(`band:  ${band}`);
	    query = TileService.formSingleBandQuery(tableName, slices_expr, bounds, band);
	    const blackAndWhiteTile = await TileService.tileQuery(query);
	    logger.debug(`blackAndWhiteTile: ${blackAndWhiteTile}`);
	    const rampObject = layerConfig.colorRamp;
	    const colorRamp = await TileService.generateColorRamp(rampObject, bounds);
	    logger.debug(`colorRamp: ${colorRamp}`);
	    const outFileName = tempy.file({extension: 'png'});
	    //const outFileName = '/tmp/' + uniqueString() + '.png';
	    logger.debug(`outFileName: ${outFileName}`);
	    result = await TileService.convert(blackAndWhiteTile, colorRamp, outFileName);
	    break;

	case 'rgb':
	    logger.debug('RGB raster detected');
	    query = TileService.formTileQuery(tableName, slices_expr);
	    const tile = await TileService.tileQuery(query);
	    result = TileService.base64encode(tile);
	    break;

	case 'false-color':
	    
	    break;

	default:
	    throw new Error('No style provided in layerConfig. It must be one of <single-band|multiband|false-color>.');
	    break;
	}
	// Huge output
	// logger.debug(`result: ${result}`);
	return result;
    }

    static base64encode(file) {
	const imageData = fs.readFileSync(file);
	const b64 = Buffer.from(imageData, 'base64');
	return b64;
    }

    static async convert(blackAndWhiteTile, colorRamp, outFileName) {
	try {
	    const {stdout, stderr } = await exec(`convert ${blackAndWhiteTile} ${colorRamp} -clut ${outFileName}`);
	    logger.debug(stdout);
	    logger.debug(stderr);
	    return TileService.base64encode(outFileName);
	} catch (err) {
	    logger.error('Error colorizing query');
	    throw new Error('Error colorizing query');
	}
    }

    static async tileQuery(query) {
	try {
	    logger.debug('Executing rasdaman query for tile');
	    logger.debug(`query: ${query}`);
	    const endpoint = `${config.get('rasdaman.uri')}/rasdaman/ows`;
	    const body = '<?xml version="1.0" encoding="UTF-8" ?>' +
		'<ProcessCoveragesRequest xmlns="http://www.opengis.net/wcps/1.0" service="WCPS" version="1.0.0">' +
		'<query><abstractSyntax>' +
		query +
		'</abstractSyntax></query>' +
		'</ProcessCoveragesRequest>';

	    const tempFilename = tempy.file({extension: 'png'});
	    logger.debug(`tempFilename: ${tempFilename}`);
	    const request = await rp({
		method: 'POST',
		url: endpoint,
		encoding: null,
		headers: {
		    'content-type': 'application/xml'
		},
		json: false,
		body
	    }).then(function (res) {
		const buffer = Buffer.from(res, 'utf8');
		fs.writeFileSync(tempFilename, buffer);
	    });;

	    return tempFilename;
	} catch (err) {
	    logger.error('Error obtaining query from Rasdaman');
	    throw new Error('Error obtaining query from Rasdaman');
	}
    }

    static rescale(number, bounds) {
	return (number - bounds[0]) / (bounds[1] - bounds[0]);
    }

    // This might need to be cached too
    static async generateColorRamp(rampObject, bounds) {
	logger.debug('Generating color ramp');
	logger.debug(`rampObject: ${JSON.stringify(rampObject)}`);

	const stops = rampObject.map(
	    (x) =>  TileService.rescale(x.value, bounds)
	);

	const colors = rampObject.map(
	    (colour) => colour.color
	);

	const gradient = tinygradient(stops.map( function(stop, i) {
	    return {
		color: colors[i],
		pos: stop
	    };
	})).rgb(255);

	// logger.debug(gradient);
	let colorMap = Array();
	gradient.forEach(function(color) {
	    colorMap.push([color._r, color._g, color._b, 255].map((c) => Math.round(c)));
	});

	const imageData = colorMap.map( (a) => Jimp.rgbaToInt(...a));

	const tempFilename = tempy.file({extension: 'png'});
	logger.debug(`tempFilename: ${tempFilename}`);

	const fn = await TileService.writeCRPNG(imageData, tempFilename);

	return fn;

    }

    static async writeCRPNG (imageData, tempFilename) {
	let image = new Jimp(1, 255);
	imageData.forEach((col, i) => {
	    image.setPixelColor(col, 1, i);
	});
	await image.writeAsync(tempFilename);

	logger.debug(`Done`);
	return tempFilename;

    };

    static async getBbox (z, x, y) {
	const bbox = tiles.bbox(x, y, z);
	return bbox;
    }

    static formSliceExpr(bbox, extra_slices) {
	try {
	    if (extra_slices == null) {
		return `[Lat(${bbox[1]}:${bbox[3]}),Long(${bbox[0]}:${bbox[2]})]`;
	    } else {
		const extra_slices_expr = extra_slices.map(
		    slice => `,${slice.axis}(${TileService.quoteString(slice.value)})`
		).join();
		return `[Lat(${bbox[1]}:${bbox[3]}),Long(${bbox[0]}:${bbox[2]})${extra_slices_expr}]`;
	    }
	} catch (err) {
	    logger.error(err);
	}
    }

    static quoteString(variable) {
	if (typeof variable === 'string') {
	    return `'${variable}'`;
	} else {
	    return variable;
	}
    }

    static negativeNExpr(num) {
	if (parseFloat(num) > 0) {
	    return `- ${num}`;
	} else if (parseFloat(num) < 0) {
	    return `+ ${Math.abs(num)}`;
	} else {
	    return '';
	}
    }

    static formSingleBandQuery (tableName, slice, bounds, band) {
	if (bounds) {
	    // To rescale a value x with known bounds min and max to the values a and b:
	    //
	    //        (b-a)(x - min)
	    // f(x) = --------------  + a
	    //          max - min
	    //
	    // In this case, the bounds  a and b will be translated to the  0-255 range. So f(x)...
	    //
	    // (255) * (x - bounds[0]) / ( bounds[1] - bounds[0] )
	    const bandExpr = band ? `.${band}` : ``;
	    const bounds_expr = `( 255 * ( (cov${bandExpr})${slice} ${TileService.negativeNExpr(bounds[0])} )) / ( ${bounds[1]} ${TileService.negativeNExpr(bounds[0])} )`;
	    return `for cov in (${tableName}) return encode(scale(${bounds_expr}, {Lat: "CRS:1"(0:255), Long: "CRS:1"(0:255)}), "PNG")`;
	} else {
	    return `for cov in (${tableName}) return encode(scale(cov${slice}, {Lat: "CRS:1"(0:255), Long: "CRS:1"(0:255)}), "PNG")`;
	}
    }

    static formTileQuery (tableName, slice) {
	    return `for cov in (${tableName}) return encode(scale(cov${slice}, {Lat: "CRS:1"(0:255), Long: "CRS:1"(0:255)}), "PNG")`;
    }

}

module.exports = TileService;
