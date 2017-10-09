
const logger = require('logger');
const rp = require('request-promise');
const xmlParser = require('xml2json');
const jsonPath = require('jsonpath');
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

    static getWhere(where) {
        logger.debug(where);
        return '';
    }

    static formQuery(tableName, fn, bbox, where) {
        logger.debug('FORM QUERY');
        let query = `for cov in (${tableName}) return `;
        const whereQuery = RasdamanService.getWhere(where);
        if (fn.function !== 'st_histogram') {
            if (bbox && bbox.length > 0) {
                if (whereQuery) {
                    query += `encode(${fn.function}((cov.${fn.arguments[0]})[${whereQuery}, Lat :"" (${bbox[0]}:${bbox[1]}), Long :"" (${bbox[2]}:${bbox[3]}) ]), \"CSV\")`;
                } else {
                    query += `encode(${fn.function}((cov.${fn.arguments[0]})[Lat :"" (${bbox[0]}:${bbox[1]}), Long :"" (${bbox[2]}:${bbox[3]}) ]), \"CSV\")`;
                }
            } else {
                if (whereQuery) {
                    query += `encode(${fn.function}((cov.${fn.arguments[0]})[${whereQuery}]), \"CSV\")`;
                } else {
                    query += `encode(${fn.function}(cov.${fn.arguments[0]}), \"CSV\")`;
                }
            }
        // st_histogram
        } else {
            query += `encode(${fn.function}(cov.${fn.arguments[1]}), \"CSV\")`;
        }
        logger.debug(query);
        return query;
    }

    static async getQuery(tableName, functions, bbox, where) {
        logger.debug(`[RasdamanService] Performing query`);
        const endpoint = `${config.get('rasdaman.uri')}/rasdaman/ows`;
        const fns = [];
        const reqs = [];
        for (let i = 0; i < functions.length; i++) {
            const query = RasdamanService.formQuery(tableName, functions[i], bbox, where);
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
