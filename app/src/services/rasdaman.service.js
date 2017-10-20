const logger = require('logger');
const rp = require('request-promise');
const xmlParser = require('xml2json');
const jsonPath = require('jsonpath');
const config = require('config');
const traverse = require('traverse');

class RasdamanService {

    static async getFields(tableName) {
	logger.debug(`Obtaining fields of ${tableName}`);
	const reqUrl = `${config.get('rasdaman.uri')}/rasdaman/ows?&SERVICE=WCS&VERSION=2.0.1&REQUEST=DescribeCoverage&COVERAGEID=${tableName}`;
	logger.debug('Doing request to ', reqUrl);
	try {
	    const req = await rp({
		method: 'GET',
		uri: reqUrl
	    });
	    const result = xmlParser.toJson(req);

	    const resultJson = JSON.parse(result);
	    const srs = jsonPath.query(resultJson, '$[\'wcs:CoverageDescriptions\'][\'wcs:CoverageDescription\'][\'boundedBy\'][\'Envelope\'][\'srsName\']')[0];
	    const fields = jsonPath.query(resultJson, '$[\'wcs:CoverageDescriptions\'][\'wcs:CoverageDescription\'][\'boundedBy\'][\'Envelope\'][\'axisLabels\']')[0].split(' ');
	    const srsDimension = jsonPath.query(resultJson, '$[\'wcs:CoverageDescriptions\'][\'wcs:CoverageDescription\'][\'boundedBy\'][\'Envelope\'][\'srsDimension\']')[0];
	    const lowerCorner = jsonPath.query(resultJson, '$[\'wcs:CoverageDescriptions\'][\'wcs:CoverageDescription\'][\'boundedBy\'][\'Envelope\'][\'lowerCorner\']')[0];
	    const upperCorner = jsonPath.query(resultJson, '$[\'wcs:CoverageDescriptions\'][\'wcs:CoverageDescription\'][\'boundedBy\'][\'Envelope\'][\'upperCorner\']')[0];
	    const rangeType = jsonPath.query(resultJson, '$[\'wcs:CoverageDescriptions\'][\'wcs:CoverageDescription\'][\'gmlcov:rangeType\'][\'swe:DataRecord\'][\'swe:field\'][*]');
	    const bands = rangeType.reduce((acc, cur) => {
		acc[cur.name] = cur;
		delete acc[cur.name].name;
		return acc;
	    }, {});
	    return {
		tableName,
		bands,
		fields,
		meta: {
		    srs: {
			srsDimension,
			srs: srs.replace('http://localhost:8080/def/', '')
		    },
		    coverageBounds: {
			upperCorner,
			lowerCorner
		    }
		}
	    };
	} catch (err) {
	    logger.error('Error obtaining fields', err);
	    throw new Error('Error obtaining fields');
	}
    }

    static getOperator(operator) {
	return `${operator.right.value}`;
    }


    static getWhereString(boundsArray) {
	try {
	    logger.debug('Validating where');
	    // First let's see if there's only a slice over this dimension
	    logger.debug(boundsArray);
	    if (boundsArray.length == 1 && boundsArray[0].operator === '=' ) {
		return `${boundsArray[0].axis}(${boundsArray[0].value})`;
	    } else if (boundsArray.length == 2) {
		// If not, there should be two bounds
		const operators = boundsArray.map(bound => bound.operator).sort();
		const boundValues = boundsArray.map(bound => parseFloat(bound.value)).sort(function(a,b) { return a - b;});
		logger.debug(`boundValues: ${boundValues}`);
		const validBounds = operators[0] === '<' && operators[1] === '>';
		if (validBounds) { 
		    return `${boundsArray[0].axis}(${boundValues[0]}:${boundValues[1]})`;
		}
	    } else {
		throw new Error('Where not valid');
	    };

	} catch (err) {
	    logger.error('Error validating where', err);
	    throw new Error('Error validating where');
	}
    }

    static getWhere(where, bbox) {
	if( typeof where === 'string' ) {
	    logger.debug('Where already processed. Skipping.');
	    return where;
	}
	const whereObj = {};
	logger.debug(`bbox: ${bbox}`);
	var bounds = [];
	var boundsString;
	if (where) {
	    logger.debug(`where: ${JSON.stringify(where)}`);
	    traverse(where).forEach(function (leaf) {
		if (leaf.type === 'operator') {
		    bounds.push({
			'axis': leaf.left.value,
			'value': leaf.right.value,
			'operator': leaf.value
		    });
		} else if (leaf.type === 'between') {
		    const values = [
			leaf.arguments[0].value,
			leaf.arguments[1].value
		    ].sort();
		    bounds.push(...[ // Unpacking  the array
			{ 'axis': leaf.value, 'value': values[0], 'operator': '>'},
			{ 'axis': leaf.value, 'value': values[1], 'operator': '<'}
		    ]);
		};

	    });

	};
	if (bbox) {
	    bounds.push(...[ // Unpacking  the array
		{ 'axis': 'Lat',  'value': bbox[1], 'operator': '>'},
		{ 'axis': 'Lat',  'value': bbox[3], 'operator': '<'},
		{ 'axis': 'Long', 'value': bbox[0], 'operator': '>'},
		{ 'axis': 'Long', 'value': bbox[2], 'operator': '<'}
	    ]);
	};

	logger.debug(`bounds: ${bounds}`);

	const axes = new Set(bounds.map(bound => bound.axis));
	let boundsArray = [];
	for (let axis of axes) {
	    const axis_bounds = bounds.filter(bound => bound.axis === axis);
	    const whereString = RasdamanService.getWhereString(axis_bounds);
	    boundsArray.push(whereString);
	}
	boundsString = `[${boundsArray.join()}]`;
	logger.debug(`boundsString: ${boundsString}`);
	return boundsString;
    }

    static async query(tableName, fn, bbox, whereQuery) {
	logger.debug('Forming query');
	logger.debug('Forming query');
	logger.debug('Checking number of bands.');
	const fields = await RasdamanService.getFields(tableName);
	const bands = Object.keys(fields['bands']);
	logger.debug(`bands: ${bands}`);
	const multiband = bands.length && bands.length > 1 ? true : false;
	const current_band = fn.arguments[0];
	logger.debug(`multiband: ${multiband}`);
	logger.debug(`current_band: ${current_band}`);
	const band_subset_expr = multiband ? `.${current_band}` : '';
	logger.debug(`band_subset_expr: ${band_subset_expr}`);
	// ^ When creating queries for Rasdaman one shouldn't pass along the band name where rasters have one band only
	let query = `for cov in (${tableName}) return `;

	if (fn.function !== 'st_histogram') {
	    logger.debug('No histogram in sight');

	    if (!(whereQuery === '[]')) {
		query += `encode(${fn.function}((cov${band_subset_expr})${whereQuery}), \"CSV\")`;
	    } else {
		query += `encode(${fn.function}(cov${band_subset_expr}), \"CSV\")`;
	    }
	    	    
	    const result = await RasdamanService.rasdamanQuery(query);
	    return parseFloat(result);
	// st_histogram
	} else {
	    logger.debug('Histogram requested');
	    const result = await RasdamanService.histogramQuery(tableName, bbox, whereQuery, 10, band_subset_expr, current_band);
	    return result;
	}
    }

    static async histogramQuery(tableName, bbox, whereQuery, nbins, band_subset_expr, current_band) {
	logger.debug('Forming histogram query.');

	// Once this is done, we need to figure out the max and min of the coverage under question
	logger.debug('Building max and min queries');
	const maxmin_fn = [
	    {
		"function": "max",
		"arguments": [current_band]
	    },
	    {
		"function": "min",
		"arguments": [current_band]
	    }
	];
	logger.debug(`maxmin_fn: ${maxmin_fn}`);
	const maxmin = await RasdamanService.getQuery(tableName, maxmin_fn, bbox, whereQuery);
	const query_max = maxmin['data'][0]['max'];
	const query_min = maxmin['data'][0]['min'];
	logger.debug(`query_max: ${query_max}`);
	logger.debug(`query_min: ${query_min}`);
	logger.debug(`type: ${typeof(query_min)}`);
	// To build the histogram query:
	const query = `for cov in (${tableName}) return encode( coverage histogram over $bucket x(0:${nbins}) values count (((int)((cov${band_subset_expr})${whereQuery} * ${nbins} / (${query_max - query_min}) )) = $bucket), "CSV")`;
	logger.debug(`query: ${query}`);
	const rasdaman_result = await RasdamanService.rasdamanQuery(query);
	const histogram_y = rasdaman_result.replace('{', '').replace('}', '').split(',');
	logger.debug(`rasdaman_result: ${rasdaman_result}`);
	logger.debug(`histogram_y: ${histogram_y}`);
	const histogram_steps = [...Array(nbins +1).keys()].map(step => parseFloat((query_min + step * ((query_max - query_min)/nbins))).toFixed(2) );
	logger.debug(`histogram_steps: ${histogram_steps}`);
	const results = histogram_y.map(function(result, i) {
	    const val = histogram_steps[i].toString();
	    return [
		parseFloat(val),
		parseInt(result)
	    ];
	});

	logger.debug(`results: ${JSON.stringify(results)}`);
	return results;
    }

    static async rasdamanQuery(query) {
	logger.debug('Executing rasdaman query');
	logger.debug(`query: ${query}`);
	const endpoint = `${config.get('rasdaman.uri')}/rasdaman/ows`;
	const body = '<?xml version="1.0" encoding="UTF-8" ?>' +
	      '<ProcessCoveragesRequest xmlns="http://www.opengis.net/wcps/1.0" service="WCPS" version="1.0.0">' +
	      '<query><abstractSyntax>' +
	      query +
	      '</abstractSyntax></query>' +
	      '</ProcessCoveragesRequest>';
	const request = await rp({
	    method: 'POST',
	    url: endpoint,
	    headers: {
		'content-type': 'application/xml'
	    },
	    json: false,
	    body
	});
	logger.debug(`request: ${request}`);
	return request;
    }

    static async getQuery(tableName, functions, bbox, where) {
	logger.debug(`[RasdamanService] Performing query`);
	const endpoint = `${config.get('rasdaman.uri')}/rasdaman/ows`;
	const fns = [];
	const reqs = [];
	const responses = [];
	logger.debug(`where: ${JSON.stringify(where)}`);
	const whereQuery = RasdamanService.getWhere(where, bbox);
	logger.debug(`Functions are: ${JSON.stringify(functions)}`);
	for (let i = 0; i < functions.length; i++) {
	    const query = await RasdamanService.query(tableName, functions[i], bbox, whereQuery);
	    logger.debug(`query: ${query}`);
	    fns.push(functions[i].function);
	    responses.push(query);
	}
	// Provisional?
	var response = {};
	for (let j = 0; j < fns.length; j++) {
	    response[fns[j]] = responses[j];
	}
	return { data: [response] };
    }

    static registerDataset(connector) {
	const options = {
	    uri: `${config.get('rasdaman.importer')}/import`,
	    method: 'POST',
	    body: {
		tableName: connector.tableName,
		connectorUrl: connector.connectorUrl
	    },
	    json: true
	};
	try {
	    return rp(options);
	} catch (e) {
	    throw new Error('error connecting to rasda');
	}
    }


}

module.exports = RasdamanService;
