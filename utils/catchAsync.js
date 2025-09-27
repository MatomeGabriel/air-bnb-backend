// Add automatic error handling to our async functions
// where next = err => {}
// returns a function with errors handled automatically
/**
 * catchAsync Utility
 * Wraps async route handlers to catch errors and pass them to Express error middleware.
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware
 */
module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
