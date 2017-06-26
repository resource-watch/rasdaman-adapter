const logger = require('logger');

class WCPSSanitizer {
    static async sanitize(query) {
	logger.info("[WCPSSanitizer] ", query);
    }
}

module.exports = WCPSSanitizer;
