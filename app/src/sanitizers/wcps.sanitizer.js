const logger = require('logger');
const antlr4 = require('antlr4');
const WCPSLexer = require('parsers/WCPSLexer');
const WCPSParser = require('parsers/WCPSParser');
const QueryNotValid = require('errors/queryNotValid.error');

const ErrorListener = function (errors) {
    antlr4.error.ErrorListener.call(this);
    this.errors = errors;
    return this;
};

ErrorListener.prototype = Object.create(antlr4.error.ErrorListener.prototype);
ErrorListener.prototype.constructor = ErrorListener;
ErrorListener.prototype.syntaxError = function (rec, sym, line, col, msg, e) {
    this.errors.push(msg);
};

class WCPSSanitizer {

    static async sanitize(query) {
        logger.info('[WCPSSanitizer] Sanitizing query ', query);
        const errors = [];
        const chars = new antlr4.InputStream(query);
        const lexer = new WCPSLexer.WCPSLexer(chars);
        const tokens = new antlr4.CommonTokenStream(lexer);
        const parser = new WCPSParser.WCPSParser(tokens);
        // We provide a new listener for errors
        parser.removeErrorListeners();
        const listener = new ErrorListener(errors);
        parser.addErrorListener(listener);
        // ...build the parse tree
        try {
            parser.buildParseTrees = true;
            // And check for duplicate errors, and remove them
            const errorsDedup = [...new Set(errors)];
            // And launch an exception in case there are errors
            if (errorsDedup.length > 0) {
                logger.info('Query not valid: ', errorsDedup);
                throw new QueryNotValid(errorsDedup);
            } else {
                logger.info('Query OK');
                return true;
            }
        } catch (err) {
            throw new Error(err.message);
        }
        // And here there is a listener, so we can tag the execution
        // of different nodes at will
        // const qListener = new QueryWCPSListener();
        // antlr4.tree.ParseTreeWalker.DEFAULT.walk(qListener, tree);
    }

}

module.exports = WCPSSanitizer;
