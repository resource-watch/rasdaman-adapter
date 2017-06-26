const logger = require('logger');
const antlr4 = require('antlr4');
const WCPSLexer = require('parsers/WCPSLexer');
const WCPSParser = require('parsers/WCPSParser');
const QueryWCPSListener = require('parsers/QueryWCPSListener').QueryWCPSListener;
const QueryNotValid = require('errors/queryNotValid.error');

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
	const chars = new antlr4.InputStream(query);
	const lexer = new WCPSLexer.WCPSLexer(chars);
	const tokens = new antlr4.CommonTokenStream(lexer);
	const parser = new WCPSParser.WCPSParser(tokens);
	// We provide a new listener for errors
	parser.removeErrorListeners();
	var listener = new ErrorListener(errors);
	parser.addErrorListener(listener);
	// ...build the parse tree
	try {
	    parser.buildParseTrees = true;
	    const tree = parser.wcpsQuery();
	    // And check for duplicate errors, and remove them
	    const errors_dedup = [...new Set(errors)];
	    // And launch an exception in case there are errors
	    if (errors_dedup.length > 0) {
		logger.info("Query not valid: ", errors_dedup)
		throw new QueryNotValid(errors_dedup);
	    } else {
		logger.info("Query OK")
		return true;
	    }
	} catch (err) {
	    throw new Error(err.message);
	    return false;
	}
	return false;
	// And here there is a listener, so we can tag the execution
	// of different nodes at will
	//const qListener = new QueryWCPSListener();
	// antlr4.tree.ParseTreeWalker.DEFAULT.walk(qListener, tree);
    }
}

module.exports = WCPSSanitizer;
