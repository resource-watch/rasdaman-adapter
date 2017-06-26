// Generated from WCPS.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by WCPSParser.
function WCPSListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

WCPSListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
WCPSListener.prototype.constructor = WCPSListener;

// Enter a parse tree produced by WCPSParser#WcpsQueryLabel.
WCPSListener.prototype.enterWcpsQueryLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#WcpsQueryLabel.
WCPSListener.prototype.exitWcpsQueryLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#ForClauseListLabel.
WCPSListener.prototype.enterForClauseListLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#ForClauseListLabel.
WCPSListener.prototype.exitForClauseListLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#ForClauseLabel.
WCPSListener.prototype.enterForClauseLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#ForClauseLabel.
WCPSListener.prototype.exitForClauseLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#WhereClauseLabel.
WCPSListener.prototype.enterWhereClauseLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#WhereClauseLabel.
WCPSListener.prototype.exitWhereClauseLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#ReturnClauseLabel.
WCPSListener.prototype.enterReturnClauseLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#ReturnClauseLabel.
WCPSListener.prototype.exitReturnClauseLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageVariableNameLabel.
WCPSListener.prototype.enterCoverageVariableNameLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageVariableNameLabel.
WCPSListener.prototype.exitCoverageVariableNameLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#processingExpression.
WCPSListener.prototype.enterProcessingExpression = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#processingExpression.
WCPSListener.prototype.exitProcessingExpression = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#scalarExpression.
WCPSListener.prototype.enterScalarExpression = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#scalarExpression.
WCPSListener.prototype.exitScalarExpression = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#BooleanBinaryScalarLabel.
WCPSListener.prototype.enterBooleanBinaryScalarLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#BooleanBinaryScalarLabel.
WCPSListener.prototype.exitBooleanBinaryScalarLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#BooleanReduceExpression.
WCPSListener.prototype.enterBooleanReduceExpression = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#BooleanReduceExpression.
WCPSListener.prototype.exitBooleanReduceExpression = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#BooleanUnaryScalarLabel.
WCPSListener.prototype.enterBooleanUnaryScalarLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#BooleanUnaryScalarLabel.
WCPSListener.prototype.exitBooleanUnaryScalarLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#BooleanStringComparisonScalar.
WCPSListener.prototype.enterBooleanStringComparisonScalar = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#BooleanStringComparisonScalar.
WCPSListener.prototype.exitBooleanStringComparisonScalar = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#BooleanConstantLabel.
WCPSListener.prototype.enterBooleanConstantLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#BooleanConstantLabel.
WCPSListener.prototype.exitBooleanConstantLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#BooleanNumericalComparisonScalarLabel.
WCPSListener.prototype.enterBooleanNumericalComparisonScalarLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#BooleanNumericalComparisonScalarLabel.
WCPSListener.prototype.exitBooleanNumericalComparisonScalarLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#booleanUnaryOperator.
WCPSListener.prototype.enterBooleanUnaryOperator = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#booleanUnaryOperator.
WCPSListener.prototype.exitBooleanUnaryOperator = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#booleanConstant.
WCPSListener.prototype.enterBooleanConstant = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#booleanConstant.
WCPSListener.prototype.exitBooleanConstant = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#booleanOperator.
WCPSListener.prototype.enterBooleanOperator = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#booleanOperator.
WCPSListener.prototype.exitBooleanOperator = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#numericalComparissonOperator.
WCPSListener.prototype.enterNumericalComparissonOperator = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#numericalComparissonOperator.
WCPSListener.prototype.exitNumericalComparissonOperator = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#stringOperator.
WCPSListener.prototype.enterStringOperator = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#stringOperator.
WCPSListener.prototype.exitStringOperator = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#StringScalarExpressionLabel.
WCPSListener.prototype.enterStringScalarExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#StringScalarExpressionLabel.
WCPSListener.prototype.exitStringScalarExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#StarExpressionLabel.
WCPSListener.prototype.enterStarExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#StarExpressionLabel.
WCPSListener.prototype.exitStarExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#NumericalTrigonometricScalarExpressionLabel.
WCPSListener.prototype.enterNumericalTrigonometricScalarExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#NumericalTrigonometricScalarExpressionLabel.
WCPSListener.prototype.exitNumericalTrigonometricScalarExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#NumericalRealNumberExpressionLabel.
WCPSListener.prototype.enterNumericalRealNumberExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#NumericalRealNumberExpressionLabel.
WCPSListener.prototype.exitNumericalRealNumberExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#NumericalCondenseExpressionLabel.
WCPSListener.prototype.enterNumericalCondenseExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#NumericalCondenseExpressionLabel.
WCPSListener.prototype.exitNumericalCondenseExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#NumericalUnaryScalarExpressionLabel.
WCPSListener.prototype.enterNumericalUnaryScalarExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#NumericalUnaryScalarExpressionLabel.
WCPSListener.prototype.exitNumericalUnaryScalarExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#NumericalBinaryScalarExpressionLabel.
WCPSListener.prototype.enterNumericalBinaryScalarExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#NumericalBinaryScalarExpressionLabel.
WCPSListener.prototype.exitNumericalBinaryScalarExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#NumericalComplexNumberConstant.
WCPSListener.prototype.enterNumericalComplexNumberConstant = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#NumericalComplexNumberConstant.
WCPSListener.prototype.exitNumericalComplexNumberConstant = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#ComplexNumberConstantLabel.
WCPSListener.prototype.enterComplexNumberConstantLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#ComplexNumberConstantLabel.
WCPSListener.prototype.exitComplexNumberConstantLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#numericalOperator.
WCPSListener.prototype.enterNumericalOperator = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#numericalOperator.
WCPSListener.prototype.exitNumericalOperator = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#numericalUnaryOperation.
WCPSListener.prototype.enterNumericalUnaryOperation = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#numericalUnaryOperation.
WCPSListener.prototype.exitNumericalUnaryOperation = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#trigonometricOperator.
WCPSListener.prototype.enterTrigonometricOperator = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#trigonometricOperator.
WCPSListener.prototype.exitTrigonometricOperator = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#getComponentExpression.
WCPSListener.prototype.enterGetComponentExpression = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#getComponentExpression.
WCPSListener.prototype.exitGetComponentExpression = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageIdExpressionLabel.
WCPSListener.prototype.enterCoverageIdExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageIdExpressionLabel.
WCPSListener.prototype.exitCoverageIdExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#DescribeCoverageExpressionLabel.
WCPSListener.prototype.enterDescribeCoverageExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#DescribeCoverageExpressionLabel.
WCPSListener.prototype.exitDescribeCoverageExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#EncodedCoverageExpressionLabel.
WCPSListener.prototype.enterEncodedCoverageExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#EncodedCoverageExpressionLabel.
WCPSListener.prototype.exitEncodedCoverageExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#DecodedCoverageExpressionLabel.
WCPSListener.prototype.enterDecodedCoverageExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#DecodedCoverageExpressionLabel.
WCPSListener.prototype.exitDecodedCoverageExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionRangeSubsettingLabel.
WCPSListener.prototype.enterCoverageExpressionRangeSubsettingLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionRangeSubsettingLabel.
WCPSListener.prototype.exitCoverageExpressionRangeSubsettingLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionTrigonometricLabel.
WCPSListener.prototype.enterCoverageExpressionTrigonometricLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionTrigonometricLabel.
WCPSListener.prototype.exitCoverageExpressionTrigonometricLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionUnaryBooleanLabel.
WCPSListener.prototype.enterCoverageExpressionUnaryBooleanLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionUnaryBooleanLabel.
WCPSListener.prototype.exitCoverageExpressionUnaryBooleanLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionShorthandTrimLabel.
WCPSListener.prototype.enterCoverageExpressionShorthandTrimLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionShorthandTrimLabel.
WCPSListener.prototype.exitCoverageExpressionShorthandTrimLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionVariableNameLabel.
WCPSListener.prototype.enterCoverageExpressionVariableNameLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionVariableNameLabel.
WCPSListener.prototype.exitCoverageExpressionVariableNameLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionConstantLabel.
WCPSListener.prototype.enterCoverageExpressionConstantLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionConstantLabel.
WCPSListener.prototype.exitCoverageExpressionConstantLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionCoverageLabel.
WCPSListener.prototype.enterCoverageExpressionCoverageLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionCoverageLabel.
WCPSListener.prototype.exitCoverageExpressionCoverageLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionShorthandSliceLabel.
WCPSListener.prototype.enterCoverageExpressionShorthandSliceLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionShorthandSliceLabel.
WCPSListener.prototype.exitCoverageExpressionShorthandSliceLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionScalarLabel.
WCPSListener.prototype.enterCoverageExpressionScalarLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionScalarLabel.
WCPSListener.prototype.exitCoverageExpressionScalarLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionRangeConstructorLabel.
WCPSListener.prototype.enterCoverageExpressionRangeConstructorLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionRangeConstructorLabel.
WCPSListener.prototype.exitCoverageExpressionRangeConstructorLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionScaleLabel.
WCPSListener.prototype.enterCoverageExpressionScaleLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionScaleLabel.
WCPSListener.prototype.exitCoverageExpressionScaleLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionTrimCoverageLabel.
WCPSListener.prototype.enterCoverageExpressionTrimCoverageLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionTrimCoverageLabel.
WCPSListener.prototype.exitCoverageExpressionTrimCoverageLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionCastLabel.
WCPSListener.prototype.enterCoverageExpressionCastLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionCastLabel.
WCPSListener.prototype.exitCoverageExpressionCastLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionArithmeticLabel.
WCPSListener.prototype.enterCoverageExpressionArithmeticLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionArithmeticLabel.
WCPSListener.prototype.exitCoverageExpressionArithmeticLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionOverlayLabel.
WCPSListener.prototype.enterCoverageExpressionOverlayLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionOverlayLabel.
WCPSListener.prototype.exitCoverageExpressionOverlayLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionConstructorLabel.
WCPSListener.prototype.enterCoverageExpressionConstructorLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionConstructorLabel.
WCPSListener.prototype.exitCoverageExpressionConstructorLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionExponentialLabel.
WCPSListener.prototype.enterCoverageExpressionExponentialLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionExponentialLabel.
WCPSListener.prototype.exitCoverageExpressionExponentialLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionCrsTransformLabel.
WCPSListener.prototype.enterCoverageExpressionCrsTransformLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionCrsTransformLabel.
WCPSListener.prototype.exitCoverageExpressionCrsTransformLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionLogicLabel.
WCPSListener.prototype.enterCoverageExpressionLogicLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionLogicLabel.
WCPSListener.prototype.exitCoverageExpressionLogicLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionComparissonLabel.
WCPSListener.prototype.enterCoverageExpressionComparissonLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionComparissonLabel.
WCPSListener.prototype.exitCoverageExpressionComparissonLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionDecodeLabel.
WCPSListener.prototype.enterCoverageExpressionDecodeLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionDecodeLabel.
WCPSListener.prototype.exitCoverageExpressionDecodeLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionExtendLabel.
WCPSListener.prototype.enterCoverageExpressionExtendLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionExtendLabel.
WCPSListener.prototype.exitCoverageExpressionExtendLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionUnaryArithmeticLabel.
WCPSListener.prototype.enterCoverageExpressionUnaryArithmeticLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionUnaryArithmeticLabel.
WCPSListener.prototype.exitCoverageExpressionUnaryArithmeticLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageExpressionSliceLabel.
WCPSListener.prototype.enterCoverageExpressionSliceLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageExpressionSliceLabel.
WCPSListener.prototype.exitCoverageExpressionSliceLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#coverageArithmeticOperator.
WCPSListener.prototype.enterCoverageArithmeticOperator = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#coverageArithmeticOperator.
WCPSListener.prototype.exitCoverageArithmeticOperator = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#unaryArithmeticExpressionOperator.
WCPSListener.prototype.enterUnaryArithmeticExpressionOperator = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#unaryArithmeticExpressionOperator.
WCPSListener.prototype.exitUnaryArithmeticExpressionOperator = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#UnaryCoverageArithmeticExpressionLabel.
WCPSListener.prototype.enterUnaryCoverageArithmeticExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#UnaryCoverageArithmeticExpressionLabel.
WCPSListener.prototype.exitUnaryCoverageArithmeticExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#TrigonometricExpressionLabel.
WCPSListener.prototype.enterTrigonometricExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#TrigonometricExpressionLabel.
WCPSListener.prototype.exitTrigonometricExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#exponentialExpressionOperator.
WCPSListener.prototype.enterExponentialExpressionOperator = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#exponentialExpressionOperator.
WCPSListener.prototype.exitExponentialExpressionOperator = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#ExponentialExpressionLabel.
WCPSListener.prototype.enterExponentialExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#ExponentialExpressionLabel.
WCPSListener.prototype.exitExponentialExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#NotUnaryBooleanExpressionLabel.
WCPSListener.prototype.enterNotUnaryBooleanExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#NotUnaryBooleanExpressionLabel.
WCPSListener.prototype.exitNotUnaryBooleanExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#BitUnaryBooleanExpressionLabel.
WCPSListener.prototype.enterBitUnaryBooleanExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#BitUnaryBooleanExpressionLabel.
WCPSListener.prototype.exitBitUnaryBooleanExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#rangeType.
WCPSListener.prototype.enterRangeType = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#rangeType.
WCPSListener.prototype.exitRangeType = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CastExpressionLabel.
WCPSListener.prototype.enterCastExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CastExpressionLabel.
WCPSListener.prototype.exitCastExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#fieldName.
WCPSListener.prototype.enterFieldName = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#fieldName.
WCPSListener.prototype.exitFieldName = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#RangeConstructorExpressionLabel.
WCPSListener.prototype.enterRangeConstructorExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#RangeConstructorExpressionLabel.
WCPSListener.prototype.exitRangeConstructorExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CrsTransformExpressionLabel.
WCPSListener.prototype.enterCrsTransformExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CrsTransformExpressionLabel.
WCPSListener.prototype.exitCrsTransformExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#DimensionPointListLabel.
WCPSListener.prototype.enterDimensionPointListLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#DimensionPointListLabel.
WCPSListener.prototype.exitDimensionPointListLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#DimensionPointElementLabel.
WCPSListener.prototype.enterDimensionPointElementLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#DimensionPointElementLabel.
WCPSListener.prototype.exitDimensionPointElementLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#DimensionIntervalListLabel.
WCPSListener.prototype.enterDimensionIntervalListLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#DimensionIntervalListLabel.
WCPSListener.prototype.exitDimensionIntervalListLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#TrimDimensionIntervalElementLabel.
WCPSListener.prototype.enterTrimDimensionIntervalElementLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#TrimDimensionIntervalElementLabel.
WCPSListener.prototype.exitTrimDimensionIntervalElementLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#SliceDimensionIntervalElementLabel.
WCPSListener.prototype.enterSliceDimensionIntervalElementLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#SliceDimensionIntervalElementLabel.
WCPSListener.prototype.exitSliceDimensionIntervalElementLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#DimensionCrsListLabel.
WCPSListener.prototype.enterDimensionCrsListLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#DimensionCrsListLabel.
WCPSListener.prototype.exitDimensionCrsListLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#DimensionCrsElementLabel.
WCPSListener.prototype.enterDimensionCrsElementLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#DimensionCrsElementLabel.
WCPSListener.prototype.exitDimensionCrsElementLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#FieldInterpolationListLabel.
WCPSListener.prototype.enterFieldInterpolationListLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#FieldInterpolationListLabel.
WCPSListener.prototype.exitFieldInterpolationListLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#FieldInterpolationListElementLabel.
WCPSListener.prototype.enterFieldInterpolationListElementLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#FieldInterpolationListElementLabel.
WCPSListener.prototype.exitFieldInterpolationListElementLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#InterpolationMethodLabel.
WCPSListener.prototype.enterInterpolationMethodLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#InterpolationMethodLabel.
WCPSListener.prototype.exitInterpolationMethodLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#nullResistance.
WCPSListener.prototype.enterNullResistance = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#nullResistance.
WCPSListener.prototype.exitNullResistance = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#InterpolationTypeLabel.
WCPSListener.prototype.enterInterpolationTypeLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#InterpolationTypeLabel.
WCPSListener.prototype.exitInterpolationTypeLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageConstructorExpressionLabel.
WCPSListener.prototype.enterCoverageConstructorExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageConstructorExpressionLabel.
WCPSListener.prototype.exitCoverageConstructorExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#AxisIteratorLabel.
WCPSListener.prototype.enterAxisIteratorLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#AxisIteratorLabel.
WCPSListener.prototype.exitAxisIteratorLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#IntervalExpressionLabel.
WCPSListener.prototype.enterIntervalExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#IntervalExpressionLabel.
WCPSListener.prototype.exitIntervalExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CRSIntervalExpressionLabel.
WCPSListener.prototype.enterCRSIntervalExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CRSIntervalExpressionLabel.
WCPSListener.prototype.exitCRSIntervalExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#CoverageConstantExpressionLabel.
WCPSListener.prototype.enterCoverageConstantExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#CoverageConstantExpressionLabel.
WCPSListener.prototype.exitCoverageConstantExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#AxisSpecLabel.
WCPSListener.prototype.enterAxisSpecLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#AxisSpecLabel.
WCPSListener.prototype.exitAxisSpecLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#condenseExpression.
WCPSListener.prototype.enterCondenseExpression = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#condenseExpression.
WCPSListener.prototype.exitCondenseExpression = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#reduceBooleanExpressionOperator.
WCPSListener.prototype.enterReduceBooleanExpressionOperator = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#reduceBooleanExpressionOperator.
WCPSListener.prototype.exitReduceBooleanExpressionOperator = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#reduceNumericalExpressionOperator.
WCPSListener.prototype.enterReduceNumericalExpressionOperator = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#reduceNumericalExpressionOperator.
WCPSListener.prototype.exitReduceNumericalExpressionOperator = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#ReduceBooleanExpressionLabel.
WCPSListener.prototype.enterReduceBooleanExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#ReduceBooleanExpressionLabel.
WCPSListener.prototype.exitReduceBooleanExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#ReduceNumericalExpressionLabel.
WCPSListener.prototype.enterReduceNumericalExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#ReduceNumericalExpressionLabel.
WCPSListener.prototype.exitReduceNumericalExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#reduceExpression.
WCPSListener.prototype.enterReduceExpression = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#reduceExpression.
WCPSListener.prototype.exitReduceExpression = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#condenseExpressionOperator.
WCPSListener.prototype.enterCondenseExpressionOperator = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#condenseExpressionOperator.
WCPSListener.prototype.exitCondenseExpressionOperator = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#GeneralCondenseExpressionLabel.
WCPSListener.prototype.enterGeneralCondenseExpressionLabel = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#GeneralCondenseExpressionLabel.
WCPSListener.prototype.exitGeneralCondenseExpressionLabel = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#crsName.
WCPSListener.prototype.enterCrsName = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#crsName.
WCPSListener.prototype.exitCrsName = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#axisName.
WCPSListener.prototype.enterAxisName = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#axisName.
WCPSListener.prototype.exitAxisName = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#constant.
WCPSListener.prototype.enterConstant = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#constant.
WCPSListener.prototype.exitConstant = function(ctx) {
};


// Enter a parse tree produced by WCPSParser#identifier.
WCPSListener.prototype.enterIdentifier = function(ctx) {
};

// Exit a parse tree produced by WCPSParser#identifier.
WCPSListener.prototype.exitIdentifier = function(ctx) {
};



exports.WCPSListener = WCPSListener;