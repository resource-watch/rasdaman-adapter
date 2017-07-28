const logger = require('logger');
const request = require('request');
const rp = require('request-promise');
const xmlParser = require('xml2json');
const jsonPath = require('jsonpath');
const url = require('url');
const stream = require('stream').Transform;

class RasdamanService {

    static async getFields(urlDataset) {
        logger.debug(`Obtaining fields of ${urlDataset}`);
        const reqUrl = urlDataset;
        logger.debug('Doing request to ', reqUrl);
        try {
	    const req = await rp({
                method: 'GET',
                uri: reqUrl
            });
	    const result = xmlParser.toJson(req);
	    logger.debug("Result:", result);

	    const result_json = JSON.parse(result);

	    const coverageId = jsonPath.query(
		result_json,
		"$['wcs:CoverageDescriptions']['wcs:CoverageDescription']['gml:id']"
	    )[0];
	    const srs = jsonPath.query(
		result_json,
		"$['wcs:CoverageDescriptions']['wcs:CoverageDescription']['boundedBy']['Envelope']['srsName']"
	    )[0];
	    const axisLabels = jsonPath.query(
		result_json,
		"$['wcs:CoverageDescriptions']['wcs:CoverageDescription']['boundedBy']['Envelope']['axisLabels']"
	    )[0];
	    const uomLabels = jsonPath.query(
		result_json,
		"$['wcs:CoverageDescriptions']['wcs:CoverageDescription']['boundedBy']['Envelope']['uomLabels']"
	    )[0];
	    const srsDimension = jsonPath.query(
		result_json,
		"$['wcs:CoverageDescriptions']['wcs:CoverageDescription']['boundedBy']['Envelope']['srsDimension']"
	    )[0];
	    const lowerCorner = jsonPath.query(
		result_json,
		"$['wcs:CoverageDescriptions']['wcs:CoverageDescription']['boundedBy']['Envelope']['lowerCorner']"
	    )[0];
	    const upperCorner = jsonPath.query(
		result_json,
		"$['wcs:CoverageDescriptions']['wcs:CoverageDescription']['boundedBy']['Envelope']['upperCorner']"
	    )[0];

	    const rangeType = jsonPath.query(
		result_json,
		"$['wcs:CoverageDescriptions']['wcs:CoverageDescription']['gmlcov:rangeType']['swe:DataRecord']['swe:field'][*]"
	    );
	    const fields = rangeType.reduce(function(acc, cur) {
		acc[cur["name"]] = cur;
		delete acc[cur["name"]]["name"];
		return acc;
	    }, {});
	    return {
		"coverageId": coverageId,
		"srs": {
		    "srsDimension": srsDimension,
		    "srs": srs.replace("http://localhost:8080/def/", "")
		},
		"axisLabels": axisLabels,
		"uomLabels": uomLabels,
		"fields": fields,
		"coverageBounds": {
		    "upperCorner": upperCorner,
		    "lowerCorner": lowerCorner
		}
	    };
        } catch (err) {
            logger.error('Error obtaining fields', err);
            throw new Error('Error obtaining fields');
        }
    }

    static async getQuery(query, coverageUrl) {
	logger.debug(`[RasdamanService] Performing query`, query, `to url`, coverageUrl);	
	const url_parts = url.parse(coverageUrl);
	logger.debug(url_parts);

	const endpoint = coverageUrl.replace(url_parts.search, '');	
	logger.debug(endpoint);
	logger.debug(`Rasdaman hostname: `, endpoint);
	const body = '<?xml version="1.0" encoding="UTF-8" ?>' +
		  '<ProcessCoveragesRequest xmlns="http://www.opengis.net/wcps/1.0" service="WCPS" version="1.0.0">' +
		  '<query><abstractSyntax>' +
		  query +
		  '</abstractSyntax></query>' +
		  '</ProcessCoveragesRequest>';
	
	const req = request({
	    method: "POST",
	    url: endpoint,
	    headers: [{
		    name: 'content-type',
		    value: 'application/xml'
	    }],
	    body: body
	});
	logger.info(`REQ: ${JSON.stringify(req)}`);

	const raster = await new Promise((resolve, reject) => {
	    var data = new stream();
	    let result;
	    
	    req.on('response', function(response) {
		if (response.statusCode != 200) {
		    {} // Errors go here
		}
		response.on('data', function(dataChunk) {
		    data.push(dataChunk);
		});

		response.on('end', function() {
		    result = {
			"data": data.read(),
			"content-type": response.headers['content-type']
		    };
		    resolve(result);
		});
	    });
	});
	return raster;
    }
}

module.exports = RasdamanService;
