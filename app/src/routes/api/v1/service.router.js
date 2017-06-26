const Router = require('koa-router');
const logger = require('logger');
const ctRegisterMicroservice = require('ct-register-microservice-node');
const RasdamanService = require('services/rasdaman.service');
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const router = new Router({
    prefix: '/rasdaman'
});

const deserializeDataset = async(ctx, next) => {
    if (ctx.request.body.dataset && ctx.request.body.dataset.data) {
        ctx.request.body.dataset = await deserializer(ctx.request.body.dataset);
    } else {
        if (ctx.request.body.dataset && ctx.request.body.dataset.table_name) {
            ctx.request.body.dataset.tableName = ctx.request.body.dataset.table_name;
        }
    }
    await next();
};

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


class RasdamanRouter {
    static async registerDataset(ctx) {
        logger.info('Registering dataset with data', ctx.request.body);
        try {
            await RasdamanService.getFields(ctx.request.body.connector.connector_url);
            await ctRegisterMicroservice.requestToMicroservice({
                method: 'PATCH',
                uri: `/dataset/${ctx.request.body.connector.id}`,
                body: {
                    dataset: {
                        status: 1
                    }
                },
                json: true
            });
        } catch (e) {
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

    static async fields(ctx) {
	logger.info('[RasdamanRouter] Getting fields for dataset');
	const fields = await RasdamanService.getFields(ctx.request.body.dataset.connectorUrl);
	ctx.body = fields;
    }
}

router.post('/rest-datasets/rasdaman', deserializeDataset, RasdamanRouter.registerDataset);
router.post('/fields/:dataset', deserializeDataset, RasdamanRouter.fields);


module.exports = router;
