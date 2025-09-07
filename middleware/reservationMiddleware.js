const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/**
 * Append the user_id from the cookie, prevents people from putting their own user_id
 */
exports.appendUserId = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError('Please signup', 400));
  req.body.user_id = req.user.id;

  next();
});
