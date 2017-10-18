
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

    static getStrQuery(whereObj) {
        let strQuery = '';
        Object.keys(whereObj).forEach(key => {
            const el = whereObj[key];
            if (el.length === 1) {
                strQuery += `${key}(${el[0]})`;
            } else {
                el.sort();
                strQuery += `${key}(${el[0]}:${el[1]})`;
            }
            strQuery += ', ';
        });
        return strQuery !== '' ? strQuery.substr(0, [strQuery.length - 2]) : undefined;
    }

    static getWhere(where) {
	if( typeof where === 'string' ) {
	    logger.debug('Where already processed. Skipping.');
	    return where;
	}
        const whereObj = {};
        if (where) {
	    logger.debug(`where: ${JSON.stringify(where)}`);

	    var bounds = [];

	    traverse(where).forEach(function (leaf) {
		if (leaf.type === 'operator') {
		    logger.debug('Found operator');
		    logger.debug(JSON.stringify(leaf));
		    bounds.push({
		    	'axis': leaf.left.value,
		    	'value': leaf.right.value,
			'operator': leaf.value
		    });
		} else if (leaf.type === 'between') {
		    logger.debug('Found operator');
		    logger.debug(JSON.stringify(leaf));

		    const values = [
			leaf.arguments[0].value,
			leaf.arguments[1].value
		    ].sort();
		    logger.debug(`values: ${values}`);

		    bounds.push(...[
			{
			    'axis': leaf.value,
		    	    'value': values[0],
			    'operator': '>'
			},{
			    'axis': leaf.value,
		    	    'value': values[1],
			    'operator': '<'
			}
		    ]);
		    
		};

	    });
	    logger.debug(`bounds: ${JSON.stringify(bounds)}`);

	    // Now we need to see what axes have been employed in the query

	    const axes = new Set(bounds.map(bound => bound.axis));
	    for (let axis of axes) {
		
	    }
	    logger.debug(`axes: ${axes}`);



	    
	    
            while (where.type === 'conditional') {
                if (whereObj[where.right.left.value] === undefined) {
                    whereObj[where.right.left.value] = [];
                }
                whereObj[where.right.left.value].push(RasdamanService.getOperator(where.right));
                where = where.left;
            }
            if (whereObj[where.left.value] === undefined) {
                whereObj[where.left.value] = [];
            }
            whereObj[where.left.value].push(RasdamanService.getOperator(where));
        }
        return RasdamanService.getStrQuery(whereObj);
    }

    static async formQuery(tableName, fn, bbox, whereQuery) {
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

	switch (fn.function) {
	    
	}

        if (fn.function !== 'st_histogram') {
	    logger.debug('No histogram in sight');
            if (bbox && bbox.length > 0) {
                if (whereQuery) {
                    query += `encode(${fn.function}((cov${band_subset_expr})[${whereQuery}, Lat :"" (${bbox[0]}:${bbox[1]}), Long :"" (${bbox[2]}:${bbox[3]}) ]), \"CSV\")`;
                } else {
                    query += `encode(${fn.function}((cov${band_subset_expr})[Lat :"" (${bbox[0]}:${bbox[1]}), Long :"" (${bbox[2]}:${bbox[3]}) ]), \"CSV\")`;
                }
            } else {
                if (whereQuery) {
                    query += `encode(${fn.function}((cov${band_subset_expr})[${whereQuery}]), \"CSV\")`;
                } else {
                    query += `encode(${fn.function}(cov${band_subset_expr}), \"CSV\")`;
                }
            }
        // st_histogram
        } else {
	    logger.debug('Histogram requested');
	    const queryFragment = await RasdamanService.formHistogramQuery(tableName, fn, bbox, whereQuery, 100, band_subset_expr, current_band);
	    query += queryFragment;
        }

        return query;
    }

    static async formHistogramQuery(tableName, fn, bbox, whereQuery, nbins, band_subset_expr, current_band) {
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

	// To build the histogram query:

	const query = `encode( coverage histogram over $bucket x(0:${nbins}) values count (((int)((cov${band_subset_expr})[${whereQuery}] * ${nbins} / (${query_max - query_min}) )) = $bucket), "CSV")`;

	logger.debug(`query: ${query}`);

	return query;
    }
    
    static async getQuery(tableName, functions, bbox, where) {
        logger.debug(`[RasdamanService] Performing query`);
        const endpoint = `${config.get('rasdaman.uri')}/rasdaman/ows`;
        const fns = [];
        const reqs = [];
        const whereQuery = RasdamanService.getWhere(where);
	logger.debug(`Functions are: ${JSON.stringify(functions)}`);
        for (let i = 0; i < functions.length; i++) {
            const query = await RasdamanService.formQuery(tableName, functions[i], bbox, whereQuery);
	    logger.debug(`query: ${query}`);
            const body = '<?xml version="1.0" encoding="UTF-8" ?>' +
            		  '<ProcessCoveragesRequest xmlns="http://www.opengis.net/wcps/1.0" service="WCPS" version="1.0.0">' +
            		  '<query><abstractSyntax>' +
            		  query +
            		  '</abstractSyntax></query>' +
            		  '</ProcessCoveragesRequest>';

            fns.push(functions[i].function);
            reqs.push(await rp({
                method: 'POST',
                url: endpoint,
                headers: {
                    'content-type': 'application/xml'
                },
                json: false,
                body
            }));
        }
        // Provisional?
        const responses = (await Promise.all(reqs));
        const response = {};
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
