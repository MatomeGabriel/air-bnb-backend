// Custom Error
/**
 * AppError Utility
 * Custom error class for operational errors, used for consistent error handling across the app.
 */
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
