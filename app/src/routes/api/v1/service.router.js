const Router = require('koa-router');
const logger = require('logger');
const ctRegisterMicroservice = require('ct-register-microservice-node');
const RasdamanService = require('services/rasdaman.service');

const router = new Router({
    prefix: '/rasdaman'
});

class RasdamanRouter {

    static sayHi(ctx) {
        ctx.body = {
            greeting: 'hi'
        };
    }

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
	const fields = await RasdamanService.getFields(ctx.body.request.body.dataset.connector_url);
    }
}

router.get('/hi', RasdamanRouter.sayHi);
router.post('/rest-datasets/rasdaman', RasdamanRouter.registerDataset);
router.post('/fields/:dataset', RasdamanRouter.fields);


module.exports = router;
