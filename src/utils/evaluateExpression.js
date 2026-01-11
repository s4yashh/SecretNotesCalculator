/**
 * Safely evaluates a mathematical expression
 * @param {string} expression - The expression to evaluate
 * @returns {number} The result of the evaluation
 */
export const evaluateExpression = (expression) => {
  try {
    // Remove spaces
    const cleanExpression = expression.replace(/\s+/g, '');
    
    // Replace ^ with ** for power operation
    const processedExpression = cleanExpression.replace(/\^/g, '**');
    
    // Validate expression - only allow numbers, operators, and parentheses
    if (!/^[0-9+\-*/.()%^]+$/.test(cleanExpression)) {
      throw new Error('Invalid characters in expression');
    }
    
    // Use Function constructor for safe evaluation (limited scope)
    // eslint-disable-next-line no-new-func
    const result = Function('"use strict"; return (' + processedExpression + ')')();
    
    return isFinite(result) ? result : 'Error';
  } catch (error) {
    console.error('Expression evaluation error:', error);
    return 'Error';
  }
};

/**
 * Formats a number with commas for thousands separator and limited decimals
 * @param {number} num - The number to format
 * @returns {string} The formatted number
 */
export const formatNumber = (num) => {
  if (typeof num !== 'number') return num;
  
  // Handle very large or very small numbers with scientific notation
  if (Math.abs(num) > 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return num.toExponential(6);
  }
  
  // Limit decimal places to 10
  const rounded = Math.round(num * 1e10) / 1e10;
  return rounded.toLocaleString('en-US', {
    maximumFractionDigits: 10,
    minimumFractionDigits: 0,
  });
};
