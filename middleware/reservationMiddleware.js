const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Accommodation = require('../models/Accommodation');

/**
 * Append the user_id from the cookie, prevents people from putting their own user_id
 */
exports.appendUserId = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError('Please signup', 400));

  req.body.user_id = req.user._id;
  req.body.user = req.user.name;
  req.body.username = req.user.username;

  next();
});

exports.appendHostIdAndUsername = catchAsync(async (req, res, next) => {
  if (!req.body._id)
    return next(new AppError('Please provide the accommodation ID', 401));
  const user = await Accommodation.find({
    id: req.body.accommodationId,
  }).populate('host_id');

  req.body.username = user.username;

  next();
});

exports.setQueryId = catchAsync(async (req, res, next) => {
  if (!req.user)
    return next(
      new AppError('You do not have permission to access this endpoint', 401),
    );

  if (req.user.role === 'host') req.queryId = { host_id: req.user._id };

  if (req.user.role === 'user') req.queryId = { user_id: req.user._id };

  next();
});

exports.isReservationAvailable = catchAsync(async (req, res, next) => {});
