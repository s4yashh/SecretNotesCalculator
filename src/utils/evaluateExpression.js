/**
 * Safely evaluates a mathematical expression
 * @param {string} expression - The expression to evaluate
 * @returns {number} The result of the evaluation
 */
export const evaluateExpression = (expression) => {
  try {
    // Remove spaces
    const cleanExpression = expression.replace(/\s+/g, '');
    
    // Validate expression - only allow numbers, operators, and parentheses
    if (!/^[0-9+\-*/.()%^]+$/.test(cleanExpression)) {
      throw new Error('Invalid characters in expression');
    }
    
    // Use Function constructor for safe evaluation (limited scope)
    // eslint-disable-next-line no-new-func
    const result = Function('"use strict"; return (' + cleanExpression + ')')();
    
    return isFinite(result) ? result : 'Error';
  } catch (error) {
    console.error('Expression evaluation error:', error);
    return 'Error';
  }
};

/**
 * Formats a number with commas for thousands separator
 * @param {number} num - The number to format
 * @returns {string} The formatted number
 */
export const formatNumber = (num) => {
  if (typeof num !== 'number') return num;
  return num.toLocaleString('en-US');
};
