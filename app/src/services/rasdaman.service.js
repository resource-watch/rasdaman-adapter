const logger = require('logger');
const request = require('request');
const requestPromise = require('request-promise');
const xmlParser = require('xml2json');
const jsonPath = require('jsonpath');
const url = require('url');

class RasdamanService {

    static async getFields(urlDataset) {
        logger.debug(`Obtaining fields of ${urlDataset}`);
        const reqUrl = urlDataset;
        logger.debug('Doing request to ', reqUrl);
        try {
	    const req = await requestPromise({
                method: 'GET',
                uri: reqUrl
            });
	    const result = xmlParser.toJson(req);
	    logger.debug("Result:", result);
	    const coverageId = jsonPath.query(
		JSON.parse(result),
		"$['wcs:CoverageDescriptions']['wcs:CoverageDescription']['gml:id']"
	    )[0];
	    const srs = jsonPath.query(
		JSON.parse(result),
		"$['wcs:CoverageDescriptions']['wcs:CoverageDescription']['boundedBy']['Envelope']['srsName']"
	    )[0];
	    const axisLabels = jsonPath.query(
		JSON.parse(result),
		"$['wcs:CoverageDescriptions']['wcs:CoverageDescription']['boundedBy']['Envelope']['axisLabels']"
	    )[0];
	    const uomLabels = jsonPath.query(
		JSON.parse(result),
		"$['wcs:CoverageDescriptions']['wcs:CoverageDescription']['boundedBy']['Envelope']['uomLabels']"
	    )[0];
	    const srsDimension = jsonPath.query(
		JSON.parse(result),
		"$['wcs:CoverageDescriptions']['wcs:CoverageDescription']['boundedBy']['Envelope']['srsDimension']"
	    )[0];
	    const lowerCorner = jsonPath.query(
		JSON.parse(result),
		"$['wcs:CoverageDescriptions']['wcs:CoverageDescription']['boundedBy']['Envelope']['lowerCorner']"
	    )[0];
	    const upperCorner = jsonPath.query(
		JSON.parse(result),
		"$['wcs:CoverageDescriptions']['wcs:CoverageDescription']['boundedBy']['Envelope']['upperCorner']"
	    )[0];

	    const rangeType = jsonPath.query(
		JSON.parse(result),
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
	const host = coverageUrl.replace(url_parts.search, '');
	logger.debug(`Rasdaman hostname: `, host)
	const body = '<?xml version="1.0" encoding="UTF-8" ?>' +
	      '<ProcessCoveragesRequest xmlns="http://www.opengis.net/wcps/1.0" service="WCPS" version="1.0.0">' +
	      '<query><abstractSyntax>' +
	      query +
	      '</abstractSyntax></query>' +
	      '</ProcessCoveragesRequest>'

	logger.debug('BODY', body)
	const req = await requestPromise({
            method: 'POST',
	    headers: {
		'Content-Type': 'text/xml'
	    },
            uri: host,
	    body: body
        });
	logger.debug("REQUEST:", req);
	return req;
    }
}

module.exports = RasdamanService;
