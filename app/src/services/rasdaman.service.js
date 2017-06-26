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
	    const boundedBy = jsonPath.query(
		JSON.parse(result),
		"$['wcs:CoverageDescriptions']['wcs:CoverageDescription']['boundedBy']"
	    );
	    const rangeType = jsonPath.query(
		JSON.parse(result),
		"$['wcs:CoverageDescriptions']['wcs:CoverageDescription']['gmlcov:rangeType']"
	    );
	    logger.debug("CoverageId:", coverageId);
	    logger.debug("boundedBy:", boundedBy);
	    logger.debug("rangeType:", rangeType);
	    return {
		"coverageId": coverageId,
		"axes": boundedBy,
		"fields": rangeType
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
