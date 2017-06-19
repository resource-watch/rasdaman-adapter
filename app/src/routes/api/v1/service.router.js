const Router = require('koa-router');


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
}

router.get('/hi', RasdamanRouter.sayHi);
router.post('/rest-datasets/rasdaman', RasdamanRouter.registerDataset);

module.exports = router;
