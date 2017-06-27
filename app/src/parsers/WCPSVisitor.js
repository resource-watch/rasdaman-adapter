// Generated from WCPS.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by WCPSParser.

function WCPSVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

WCPSVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
WCPSVisitor.prototype.constructor = WCPSVisitor;

// Visit a parse tree produced by WCPSParser#WcpsQueryLabel.
WCPSVisitor.prototype.visitWcpsQueryLabel = function(ctx) {
  console.log("HOLIS");
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#ForClauseListLabel.
WCPSVisitor.prototype.visitForClauseListLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#ForClauseLabel.
WCPSVisitor.prototype.visitForClauseLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#WhereClauseLabel.
WCPSVisitor.prototype.visitWhereClauseLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#ReturnClauseLabel.
WCPSVisitor.prototype.visitReturnClauseLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageVariableNameLabel.
WCPSVisitor.prototype.visitCoverageVariableNameLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#processingExpression.
WCPSVisitor.prototype.visitProcessingExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#scalarExpression.
WCPSVisitor.prototype.visitScalarExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#BooleanBinaryScalarLabel.
WCPSVisitor.prototype.visitBooleanBinaryScalarLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#BooleanReduceExpression.
WCPSVisitor.prototype.visitBooleanReduceExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#BooleanUnaryScalarLabel.
WCPSVisitor.prototype.visitBooleanUnaryScalarLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#BooleanStringComparisonScalar.
WCPSVisitor.prototype.visitBooleanStringComparisonScalar = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#BooleanConstantLabel.
WCPSVisitor.prototype.visitBooleanConstantLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#BooleanNumericalComparisonScalarLabel.
WCPSVisitor.prototype.visitBooleanNumericalComparisonScalarLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#booleanUnaryOperator.
WCPSVisitor.prototype.visitBooleanUnaryOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#booleanConstant.
WCPSVisitor.prototype.visitBooleanConstant = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#booleanOperator.
WCPSVisitor.prototype.visitBooleanOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#numericalComparissonOperator.
WCPSVisitor.prototype.visitNumericalComparissonOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#stringOperator.
WCPSVisitor.prototype.visitStringOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#StringScalarExpressionLabel.
WCPSVisitor.prototype.visitStringScalarExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#StarExpressionLabel.
WCPSVisitor.prototype.visitStarExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#NumericalTrigonometricScalarExpressionLabel.
WCPSVisitor.prototype.visitNumericalTrigonometricScalarExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#NumericalRealNumberExpressionLabel.
WCPSVisitor.prototype.visitNumericalRealNumberExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#NumericalCondenseExpressionLabel.
WCPSVisitor.prototype.visitNumericalCondenseExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#NumericalUnaryScalarExpressionLabel.
WCPSVisitor.prototype.visitNumericalUnaryScalarExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#NumericalBinaryScalarExpressionLabel.
WCPSVisitor.prototype.visitNumericalBinaryScalarExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#NumericalComplexNumberConstant.
WCPSVisitor.prototype.visitNumericalComplexNumberConstant = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#ComplexNumberConstantLabel.
WCPSVisitor.prototype.visitComplexNumberConstantLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#numericalOperator.
WCPSVisitor.prototype.visitNumericalOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#numericalUnaryOperation.
WCPSVisitor.prototype.visitNumericalUnaryOperation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#trigonometricOperator.
WCPSVisitor.prototype.visitTrigonometricOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#getComponentExpression.
WCPSVisitor.prototype.visitGetComponentExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageIdExpressionLabel.
WCPSVisitor.prototype.visitCoverageIdExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#DescribeCoverageExpressionLabel.
WCPSVisitor.prototype.visitDescribeCoverageExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#EncodedCoverageExpressionLabel.
WCPSVisitor.prototype.visitEncodedCoverageExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#DecodedCoverageExpressionLabel.
WCPSVisitor.prototype.visitDecodedCoverageExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionRangeSubsettingLabel.
WCPSVisitor.prototype.visitCoverageExpressionRangeSubsettingLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionTrigonometricLabel.
WCPSVisitor.prototype.visitCoverageExpressionTrigonometricLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionUnaryBooleanLabel.
WCPSVisitor.prototype.visitCoverageExpressionUnaryBooleanLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionShorthandTrimLabel.
WCPSVisitor.prototype.visitCoverageExpressionShorthandTrimLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionVariableNameLabel.
WCPSVisitor.prototype.visitCoverageExpressionVariableNameLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionConstantLabel.
WCPSVisitor.prototype.visitCoverageExpressionConstantLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionCoverageLabel.
WCPSVisitor.prototype.visitCoverageExpressionCoverageLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionShorthandSliceLabel.
WCPSVisitor.prototype.visitCoverageExpressionShorthandSliceLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionScalarLabel.
WCPSVisitor.prototype.visitCoverageExpressionScalarLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionRangeConstructorLabel.
WCPSVisitor.prototype.visitCoverageExpressionRangeConstructorLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionScaleLabel.
WCPSVisitor.prototype.visitCoverageExpressionScaleLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionTrimCoverageLabel.
WCPSVisitor.prototype.visitCoverageExpressionTrimCoverageLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionCastLabel.
WCPSVisitor.prototype.visitCoverageExpressionCastLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionArithmeticLabel.
WCPSVisitor.prototype.visitCoverageExpressionArithmeticLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionOverlayLabel.
WCPSVisitor.prototype.visitCoverageExpressionOverlayLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionConstructorLabel.
WCPSVisitor.prototype.visitCoverageExpressionConstructorLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionExponentialLabel.
WCPSVisitor.prototype.visitCoverageExpressionExponentialLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionCrsTransformLabel.
WCPSVisitor.prototype.visitCoverageExpressionCrsTransformLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionLogicLabel.
WCPSVisitor.prototype.visitCoverageExpressionLogicLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionComparissonLabel.
WCPSVisitor.prototype.visitCoverageExpressionComparissonLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionDecodeLabel.
WCPSVisitor.prototype.visitCoverageExpressionDecodeLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionExtendLabel.
WCPSVisitor.prototype.visitCoverageExpressionExtendLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionUnaryArithmeticLabel.
WCPSVisitor.prototype.visitCoverageExpressionUnaryArithmeticLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageExpressionSliceLabel.
WCPSVisitor.prototype.visitCoverageExpressionSliceLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#coverageArithmeticOperator.
WCPSVisitor.prototype.visitCoverageArithmeticOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#unaryArithmeticExpressionOperator.
WCPSVisitor.prototype.visitUnaryArithmeticExpressionOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#UnaryCoverageArithmeticExpressionLabel.
WCPSVisitor.prototype.visitUnaryCoverageArithmeticExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#TrigonometricExpressionLabel.
WCPSVisitor.prototype.visitTrigonometricExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#exponentialExpressionOperator.
WCPSVisitor.prototype.visitExponentialExpressionOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#ExponentialExpressionLabel.
WCPSVisitor.prototype.visitExponentialExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#NotUnaryBooleanExpressionLabel.
WCPSVisitor.prototype.visitNotUnaryBooleanExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#BitUnaryBooleanExpressionLabel.
WCPSVisitor.prototype.visitBitUnaryBooleanExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#rangeType.
WCPSVisitor.prototype.visitRangeType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CastExpressionLabel.
WCPSVisitor.prototype.visitCastExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#fieldName.
WCPSVisitor.prototype.visitFieldName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#RangeConstructorExpressionLabel.
WCPSVisitor.prototype.visitRangeConstructorExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CrsTransformExpressionLabel.
WCPSVisitor.prototype.visitCrsTransformExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#DimensionPointListLabel.
WCPSVisitor.prototype.visitDimensionPointListLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#DimensionPointElementLabel.
WCPSVisitor.prototype.visitDimensionPointElementLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#DimensionIntervalListLabel.
WCPSVisitor.prototype.visitDimensionIntervalListLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#TrimDimensionIntervalElementLabel.
WCPSVisitor.prototype.visitTrimDimensionIntervalElementLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#SliceDimensionIntervalElementLabel.
WCPSVisitor.prototype.visitSliceDimensionIntervalElementLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#DimensionCrsListLabel.
WCPSVisitor.prototype.visitDimensionCrsListLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#DimensionCrsElementLabel.
WCPSVisitor.prototype.visitDimensionCrsElementLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#FieldInterpolationListLabel.
WCPSVisitor.prototype.visitFieldInterpolationListLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#FieldInterpolationListElementLabel.
WCPSVisitor.prototype.visitFieldInterpolationListElementLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#InterpolationMethodLabel.
WCPSVisitor.prototype.visitInterpolationMethodLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#nullResistance.
WCPSVisitor.prototype.visitNullResistance = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#InterpolationTypeLabel.
WCPSVisitor.prototype.visitInterpolationTypeLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageConstructorExpressionLabel.
WCPSVisitor.prototype.visitCoverageConstructorExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#AxisIteratorLabel.
WCPSVisitor.prototype.visitAxisIteratorLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#IntervalExpressionLabel.
WCPSVisitor.prototype.visitIntervalExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CRSIntervalExpressionLabel.
WCPSVisitor.prototype.visitCRSIntervalExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#CoverageConstantExpressionLabel.
WCPSVisitor.prototype.visitCoverageConstantExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#AxisSpecLabel.
WCPSVisitor.prototype.visitAxisSpecLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#condenseExpression.
WCPSVisitor.prototype.visitCondenseExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#reduceBooleanExpressionOperator.
WCPSVisitor.prototype.visitReduceBooleanExpressionOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#reduceNumericalExpressionOperator.
WCPSVisitor.prototype.visitReduceNumericalExpressionOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#ReduceBooleanExpressionLabel.
WCPSVisitor.prototype.visitReduceBooleanExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#ReduceNumericalExpressionLabel.
WCPSVisitor.prototype.visitReduceNumericalExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#reduceExpression.
WCPSVisitor.prototype.visitReduceExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#condenseExpressionOperator.
WCPSVisitor.prototype.visitCondenseExpressionOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#GeneralCondenseExpressionLabel.
WCPSVisitor.prototype.visitGeneralCondenseExpressionLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#crsName.
WCPSVisitor.prototype.visitCrsName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#axisName.
WCPSVisitor.prototype.visitAxisName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#constant.
WCPSVisitor.prototype.visitConstant = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by WCPSParser#identifier.
WCPSVisitor.prototype.visitIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};



exports.WCPSVisitor = WCPSVisitor;
