// Add automatic error handling to our async functions
// where next = err => {}
// returns a function with errors handled automatically
module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
