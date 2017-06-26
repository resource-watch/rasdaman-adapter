const logger = require('logger');
const antlr4 = require('antlr4');
var WCPSLexer = require('parsers/WCPSLexer');
var WCPSParser = require('parsers/WCPSParser');
var QueryWCPSListener = require('parsers/QueryWCPSListener').QueryWCPSListener;

var ErrorListener = function(errors) {
  antlr4.error.ErrorListener.call(this);
  this.errors = errors;
  return this;
};

ErrorListener.prototype = Object.create(antlr4.error.ErrorListener.prototype);
ErrorListener.prototype.constructor = ErrorListener;
ErrorListener.prototype.syntaxError = function(rec, sym, line, col, msg, e) {
    this.errors.push(msg);
};

var errors = [];

class WCPSSanitizer {
    static async sanitize(query) {
	logger.info("[WCPSSanitizer] Sanitizing query ", query);
	try {
	    const chars = new antlr4.InputStream(query);
	    const lexer = new WCPSLexer.WCPSLexer(chars);
	    const tokens = new antlr4.CommonTokenStream(lexer);
	    const parser = new WCPSParser.WCPSParser(tokens);
	    parser.removeErrorListeners();
	    var listener = new ErrorListener(errors);
	    parser.addErrorListener(listener);
	    
	    parser.buildParseTrees = true;
	    const tree = parser.wcpsQuery();
	    logger.debug("ERRORS: ", errors);
	    const qListener = new QueryWCPSListener();
	    antlr4.tree.ParseTreeWalker.DEFAULT.walk(qListener, tree);
	} catch (e) {}
    }
}

module.exports = WCPSSanitizer;
