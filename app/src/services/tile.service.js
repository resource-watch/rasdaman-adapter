const logger = require('logger');
const SphericalMercator = require('sphericalmercator');

var tiles = new SphericalMercator({
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
	let query;
	switch (tile_type) {
	case 'single-band':
	    logger.debug('Single band raster detected');
	    const bounds = layerConfig.bounds.map(parseFloat).sort();
	    logger.debug(`bounds: ${bounds}`);
	    query = TileService.formSingleBandQuery(tableName, slices_expr, bounds);
	    break;
	case 'multiband':
	    break;
	case 'false-color':
	    break;
	default:
	    throw new Error('No style provided in layerConfig. It must be one of <single-band|multiband|false-color>.');
	    break;
	}
	
	logger.debug(`query is: ${query}`);

	return query;
    }
    
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

    static formSingleBandQuery (tableName, slice, bounds) {
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
	    const bounds_expr = `( 255 * ( cov${slice} - ${bounds[0]} )) / ( ${bounds[1]} - ${bounds[0]} )`;
	    return `for cov in (${tableName}) return encode(scale(${bounds_expr}, {Lat: "CRS:1"(0:255), Long: "CRS:1"(0:255)}), "PNG")`;
	} else {
	    return `for cov in (${tableName}) return encode(scale(cov${slice}, {Lat: "CRS:1"(0:255), Long: "CRS:1"(0:255)}), "PNG")`;
	}
    }
}

module.exports = TileService;


