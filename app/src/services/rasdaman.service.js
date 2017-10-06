const logger = require('logger');
const request = require('request');
const rp = require('request-promise');
const xmlParser = require('xml2json');
const jsonPath = require('jsonpath');
const url = require('url');
const Stream = require('stream').Transform;
const config = require('config');


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
            logger.debug('Result: ', result);

            const resultJson = JSON.parse(result);
            const coverageId = jsonPath.query(resultJson, '$[\'wcs:CoverageDescriptions\'][\'wcs:CoverageDescription\'][\'gml:id\']')[0];
            const srs = jsonPath.query(resultJson, '$[\'wcs:CoverageDescriptions\'][\'wcs:CoverageDescription\'][\'boundedBy\'][\'Envelope\'][\'srsName\']')[0];
            const axisLabels = jsonPath.query(resultJson, '$[\'wcs:CoverageDescriptions\'][\'wcs:CoverageDescription\'][\'boundedBy\'][\'Envelope\'][\'axisLabels\']')[0];
            const uomLabels = jsonPath.query(resultJson, '$[\'wcs:CoverageDescriptions\'][\'wcs:CoverageDescription\'][\'boundedBy\'][\'Envelope\'][\'uomLabels\']')[0];
            const srsDimension = jsonPath.query(resultJson, '$[\'wcs:CoverageDescriptions\'][\'wcs:CoverageDescription\'][\'boundedBy\'][\'Envelope\'][\'srsDimension\']')[0];
            const lowerCorner = jsonPath.query(resultJson, '$[\'wcs:CoverageDescriptions\'][\'wcs:CoverageDescription\'][\'boundedBy\'][\'Envelope\'][\'lowerCorner\']')[0];
            const upperCorner = jsonPath.query(resultJson, '$[\'wcs:CoverageDescriptions\'][\'wcs:CoverageDescription\'][\'boundedBy\'][\'Envelope\'][\'upperCorner\']')[0];
            const rangeType = jsonPath.query(resultJson, '$[\'wcs:CoverageDescriptions\'][\'wcs:CoverageDescription\'][\'gmlcov:rangeType\'][\'swe:DataRecord\'][\'swe:field\'][*]');
            const fields = rangeType.reduce((acc, cur) => {
                acc[cur.name] = cur;
                delete acc[cur.name].name;
                return acc;
            }, {});
            return {
                coverageId,
                srs: {
                    srsDimension,
                    srs: srs.replace('http://localhost:8080/def/', '')
                },
                axisLabels,
                uomLabels,
                fields,
                coverageBounds: {
                    upperCorner,
                    lowerCorner
                }
            };
        } catch (err) {
            logger.error('Error obtaining fields', err);
            throw new Error('Error obtaining fields');
        }
    }

    static async getQuery(query, tableName) {
        logger.debug(`[RasdamanService] Performing query`, query, `to url`, tableName);
        const endpoint = `${config.get('rasdaman.uri')}/rasdaman/ows?&SERVICE=WCS&VERSION=2.0.1&REQUEST=DescribeCoverage&COVERAGEID=${tableName}`;
        logger.debug(`Rasdaman hostname: `, endpoint);
        const body = `<?xml version="1.0" encoding="UTF-8" ?>
            <ProcessCoveragesRequest xmlns="http://www.opengis.net/wcps/1.0" service="WCPS" version="1.0.0">
            <query><abstractSyntax>
            ${query}
            </abstractSyntax></query>
            </ProcessCoveragesRequest>`;

        const req = request({
            method: 'POST',
            url: endpoint,
            headers: [{
                name: 'content-type',
                value: 'application/xml'
            }],
            body
        });
        logger.info(`REQ: ${JSON.stringify(req)}`);

        const raster = await new Promise((resolve, reject) => {
            const data = new Stream();
            let result;

            req.on('response', (response) => {
                if (response.statusCode !== 200) {
                    reject(result);
                }
                response.on('data', (dataChunk) => {
                    data.push(dataChunk);
                });

                response.on('end', () => {
                    result = {
                        data: data.read(),
                        'content-type': response.headers['content-type']
                    };
                    resolve(result);
                });
            });
        });
        return raster;
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
