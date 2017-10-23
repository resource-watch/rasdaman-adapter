const logger = require('logger');
const SphericalMercator = require('sphericalmercator');

var tiles = new SphericalMercator({
    size: 256
});

class TileService {
    static async getTile(z, x, y) {
	logger.info('[TileService] Obtaining tile');
	logger.debug(`tile coordinates: ${z}, ${x}, ${y}`);
	const bbox = await TileService.getBbox(z, x, y);
	logger.debug(`bbox is: ${bbox}`);
    }
    
    static async getBbox (z, x, y) {
	logger.debug(`Obtaining coordinates for ${z} ${x} ${y}`);
	const bbox = tiles.bbox(x, y, z);
	return bbox;
    }
}

module.exports = TileService;


