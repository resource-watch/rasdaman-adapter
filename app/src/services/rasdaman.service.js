const logger = require('logger');
const request = require('request');
const requestPromise = require('request-promise');
const xmlParser = require('xml2json');
const jsonPath = require('jsonpath');

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
	    const rasterName = jsonPath.query(result, '$.wcs:CoverageDescriptions.wcs:CoverageDescription.wcs:CoverageId');
	    return result;
        } catch (err) {
            logger.error('Error obtaining fields', err);
            throw new Error('Error obtaining fields');
        }
    }

    // static executeQuery(urlDataset, query) {
    //     logger.debug(`Doing query`);
    //     const reqUrl = `${urlDataset.split('?')[0]}/query${query}&f=json`.replace('http:', 'https:');
    //     logger.debug('Doing request to ', reqUrl);
    //     try {
    //         return request({
    //             method: 'GET',
    //             uri: reqUrl,
    //             json: true
    //         });
    //     } catch (err) {
    //         logger.error('Error doing query', err);
    //         throw new Error('Error doing query');
    //     }
    // }

}

module.exports = RasdamanService;
