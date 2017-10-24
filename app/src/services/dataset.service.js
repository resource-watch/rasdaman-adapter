const URL = require('url').URL;
const logger = require('logger');
const http = require('http');
const rp = require('request-promise');
const DatasetNotFound = require('errors/datasetNotFound.error');
const ctRegisterMicroservice = require('ct-register-microservice-node');

class DatasetService {
    static async checkDataset(ctx) {
	logger.debug(`Obtaining dataset`);
	try {
	    if (ctx.request.body.dataset) {
		const dataset = ctx.request.body.dataset;
		logger.debug(`Dataset is: ${dataset}`);
		const tableName = await DatasetService.getTablename(dataset);
		logger.debug(JSON.stringify(tableName));
		ctx.request.body.tableName = tableName;
	    } else {
		ctx.throw(400, 'Dataset not provided in layer');
	    }
	} catch (err) {
	    logger.error(`No dataset provided`);
	}
    }

    static async getTablename(dataset) {
	const datasetObject = await ctRegisterMicroservice.requestToMicroservice({
	    method: 'GET',
	    uri: `/dataset/${dataset}`,	    
	    json: true
	});
	const tableName = datasetObject.data.attributes.tableName;
	logger.debug(`tableName: ${tableName}`);
	return tableName;
    }
}

module.exports = DatasetService;
