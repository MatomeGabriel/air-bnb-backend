// Custom Error
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // Is this an operational error, error due to our system
    this.isOperational = true;
    // Clean stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
