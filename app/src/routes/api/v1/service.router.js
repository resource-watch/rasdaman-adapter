const Router = require('koa-router');
const logger = require('logger');
const ctRegisterMicroservice = require('ct-register-microservice-node');
const RasdamanService = require('services/rasdaman.service');
const TileService = require('services/tile.service');
const LayerService = require('services/layer.service');
const ErrorSerializer = require('serializers/error.serializer');
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

const router = new Router({
    prefix: '/rasdaman'
});


const serializeObjToQuery = (obj) => Object.keys(obj).reduce((a, k) => {
    a.push(`${k}=${encodeURIComponent(obj[k])}`);
    return a;
}, []).join('&');


class RasdamanRouter {

    static getCloneUrl(url, idDataset) {
	return {
	    http_method: 'POST',
	    url: `/dataset/${idDataset}/clone`,
	    body: {
		dataset: {
		    datasetUrl: url.replace('/rasdaman', ''),
		    application: ['your', 'apps']
		}
	    }
	};
    }

    static async fields(ctx) {
	logger.info('[RasdamanRouter] Getting fields for dataset');
	const fields = await RasdamanService.getFields(ctx.request.body.dataset.tableName);
	ctx.body = fields;
    }

    static async query(ctx) {
	logger.info('[RasdamanRouter] Querying');
	const dataset = ctx.request.body.dataset;
	const cloneUrl = RasdamanRouter.getCloneUrl(ctx.request.url, ctx.params.dataset);
	try {
	    const functions = ctx.state.functions;
	    logger.debug(`functions: ${functions}`);
	    const bbox = ctx.state.bbox ? ctx.state.bbox : undefined;
	    const where = ctx.state.jsonSql.where;
	    // is
	    logger.debug(`where: ${JSON.stringify(where)}`);
	    const response = await RasdamanService.getQuery(dataset.tableName, functions, bbox, where);
	    logger.debug(`Response: `, response);
	    response.cloneUrl = cloneUrl;
	    ctx.body = response;
	} catch (err) {
	    logger.error(err);
	    ctx.body = ErrorSerializer.serializeError(err.statusCode || 500, err.error && err.error.error ? err.error.error[0] : err.message);
	    ctx.status = 500;
	}
    }

    static async registerDataset(ctx) {
	logger.info('Registering dataset with data', ctx.request.body);
	try {
	    const coverage = `coverage_${ctx.request.body.connector.id.replace(/-/gi, '')}`;
	    ctx.request.body.connector.tableName = coverage;
	    await RasdamanService.registerDataset(ctx.request.body.connector);
	    await ctRegisterMicroservice.requestToMicroservice({
		method: 'PATCH',
		uri: `/dataset/${ctx.request.body.connector.id}`,
		body: {
		    dataset: {
			status: 1,
			tableName: ctx.request.body.connector.tableName
		    }
		},
		json: true
	    });
	} catch (e) {
	    logger.error(e);
	    await ctRegisterMicroservice.requestToMicroservice({
		method: 'PATCH',
		uri: `/dataset/${ctx.request.body.connector.id}`,
		body: {
		    dataset: {
			status: 2,
			errorMessage: `${e.name} - ${e.message}`
		    }
		},
		json: true
	    });
	}
	ctx.body = {};
    }

    static async getTile(ctx) {
	logger.debug('[RasdamanRouter] Obtaining tile');
	ctx.body = 'OK';
    }

}

const deserializer = (obj) => (new Promise((resolve, reject) => {
    new JSONAPIDeserializer({
	keyForAttribute: 'camelCase'
    }).deserialize(obj, (err, data) => {
	if (err) {
	    reject(err);
	    return;
	}
	resolve(data);
    });
}));

const deserializeDataset = async (ctx, next) => {
    if (ctx.request.body.dataset && ctx.request.body.dataset.data) {
	ctx.request.body.dataset = await deserializer(ctx.request.body.dataset);
    } else {
	if (ctx.request.body.dataset && ctx.request.body.dataset.table_name) {
	    ctx.request.body.dataset.tableName = ctx.request.body.dataset.table_name;
	}
    }
    await next();
};

const layerValidationMiddleware = async(ctx, next) => {
    logger.info(`[RasdmanRouter] Validating layer presence`);
    //
    try {
        await LayerService.checkLayer(ctx);
    } catch (err) {
        ctx.throw(err.statusCode, "Layer not found");
    };
    await next();
};


const toSQLMiddleware = async (ctx, next) => {
    const options = {
	method: 'GET',
	json: true,
	resolveWithFullResponse: true,
	simple: false
    };
    if (!ctx.query.sql && !ctx.request.body.sql && !ctx.query.outFields && !ctx.query.outStatistics) {
	ctx.throw(400, 'sql or fs required');
	return;
    }

    if (ctx.query.sql || ctx.request.body.sql) {
	logger.debug('Checking sql correct');
	logger.debug(`ctx.request.body: ${JSON.stringify(ctx.request.body)}`);
	const params = Object.assign({}, ctx.query, ctx.request.body);
	logger.debug(`params: ${JSON.stringify(params)}`);
	options.uri = `/convert/sql2SQL?sql=${encodeURIComponent(params.sql)}`;
	logger.debug(options.uri);
    } else {
	logger.debug('Obtaining sql from featureService');
	const fs = Object.assign({}, ctx.request.body);
	delete fs.dataset;
	const query = serializeObjToQuery(ctx.request.query);
	const body = fs;
	const resultQuery = Object.assign({}, query);

	if (resultQuery) {
	    options.uri = `/convert/fs2SQL${resultQuery}&tableName=${ctx.request.body.dataset.tableName}`;
	} else {
	    options.uri = `/convert/fs2SQL?tableName=${ctx.request.body.dataset.tableName}`;
	}
	options.body = body;
	options.method = 'POST';
    }

    try {
	const result = await ctRegisterMicroservice.requestToMicroservice(options);
	logger.debug('result:', result.statusCode);
	if (result.statusCode === 204 || result.statusCode === 200) {
	    logger.debug(`data_response: ${JSON.stringify(result.body)}`);
	    ctx.query.sql = result.body.data.attributes.query;
	    ctx.state.jsonSql = result.body.data.attributes.jsonSql;
	    // What
	    logger.debug(`jsonSql: ${JSON.stringify(result.body.data.attributes.jsonSql)}`);
	    await next();
	} else {
	    if (result.statusCode === 400) {
		ctx.status = result.statusCode;
		ctx.body = result.body;
	    } else {
		ctx.throw(result.statusCode, result.body);
	    }
	}

    } catch (e) {
	if (e.errors && e.errors.length > 0 && e.errors[0].status >= 400 && e.errors[0].status < 500) {
	    ctx.status = e.errors[0].status;
	    ctx.body = e;
	} else {
	    throw e;
	}
    }
};

const allowedOperationsMiddleware = async (ctx, next) => {
    const allowedOperations = ['st_histogram', 'max', 'min', 'avg'];
    const functions = [];
    if (ctx.state.jsonSql.select.length > 0) {
	ctx.state.jsonSql.select.forEach(el => {
	    if ((el.type === 'function') && (allowedOperations.indexOf(el.value) > -1)) {
		functions.push({
		    function: el.value,
		    alias: el.alias,
		    arguments: el.arguments.map(ar => ar.value)
		});
	    }
	});
    }
    if (functions.length === 0) {
	ctx.throw(400, 'Operation not allowed');
    }
    ctx.state.functions = functions;
    await next();
};


const getBbox = async (ctx, next) => {
    if (ctx.query.geostore) {
	const options = {
	    method: 'GET',
	    json: true,
	    resolveWithFullResponse: true,
	    simple: false
	};
	options.uri = `/geostore/${ctx.query.geostore}`;
	try {
	    const result = await ctRegisterMicroservice.requestToMicroservice(options);
	    if (result.statusCode === 204 || result.statusCode === 200) {
		ctx.state.bbox = result.body.data.attributes.bbox;
		await next();
	    } else {
		if (result.statusCode === 400) {
		    ctx.status = result.statusCode;
		    ctx.body = result.body;
		} else {
		    ctx.throw(result.statusCode, result.body);
		}
	    }

	} catch (e) {
	    if (e.errors && e.errors.length > 0 && e.errors[0].status >= 400 && e.errors[0].status < 500) {
		ctx.status = e.errors[0].status;
		ctx.body = e;
	    } else {
		throw e;
	    }
	}
    } else {
	await next();
    }
};

const getCoordinates = async (ctx, next) => {
    logger.debug('Middleware running');
};


router.post('/query/:dataset', deserializeDataset, toSQLMiddleware, allowedOperationsMiddleware, getBbox, RasdamanRouter.query);
router.get('/layer/:layer/tile/rasdaman/:z/:x/:y', layerValidationMiddleware, RasdamanRouter.getTile);
// router.post('/download/:dataset', deserializeDataset, queryMiddleware, RasdamanRouter.download);
router.post('/fields/:dataset', deserializeDataset, RasdamanRouter.fields);
router.post('/rest-datasets/rasdaman', deserializeDataset, RasdamanRouter.registerDataset);
module.exports = router;
