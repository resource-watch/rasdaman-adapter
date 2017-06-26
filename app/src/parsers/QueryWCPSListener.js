var antlr4 = require('antlr4');
var WCPSLexer = require('./WCPSLexer');
var WCPSParser = require('./WCPSParser');
var WCPSListener = require('./WCPSListener').WCPSListener;



QueryWCPSListener = function(res) {
    this.Res = res;    
    WCPSListener.call(this); // inherit default listener
    return this;
};

// inherits the default listener
QueryWCPSListener.prototype = Object.create(WCPSListener.prototype);
QueryWCPSListener.prototype.constructor = QueryWCPSListener;

exports.QueryWCPSListener = QueryWCPSListener;
