const URL = require('url').URL;
const logger = require('logger');
const http = require('http');
const rp = require('request-promise');
const LayerNotFound = require('errors/layerNotFound.error');
const ctRegisterMicroservice = require('ct-register-microservice-node');

class LayerService {
    static async checkLayer(ctx) {
        if (ctx.params.layer || ctx.request.body.layer) {
            const layerId = ctx.params.layer || ctx.request.body.layer;
            logger.info(`[LayerService] Validating presence of layer with id: ${layerId}`);
            try {
                const apicall = await ctRegisterMicroservice.requestToMicroservice({
                    uri: `/layer/${layerId}`,
                    method: 'GET',
                    json: true
                });
                return apicall;
            } catch (err) {
                logger.info(`[LayerService] There was an error obtaining the layer: ${err}`);
                throw err;
            }
        } else {
            // If no layers are present, it has to be catched by the validator
            logger.info(`[LayerService] No layer provided in this context.`);
        }
    }
}


module.exports = LayerService;
