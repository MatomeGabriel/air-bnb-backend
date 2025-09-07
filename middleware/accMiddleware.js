/**
 *
 */

const Accommodation = require('../models/Accommodation');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {
  generateRandomReviewsAndRatings,
} = require('../utils/generateRandomRatingsAndReviews');

/**
 * Set the images filed to an empty array
 * We use a different end point to upload images
 */
exports.setDefaultImages = (req, res, next) => {
  req.body.images = [''];
  next();
};

exports.isAccommodationAvailable = catchAsync(async (req, res, next) => {
  if (
    !(await Accommodation.findOne({ _id: req.params.id, host_id: req.user.id }))
  ) {
    return next(
      new AppError(
        "We couldn't find the accommodation, or it may not belong to you.",
        403,
      ),
    );
  }
  next();
});

/**
 *
 */
exports.stripImagesFromBody = (req, res, next) => {
  if ('images' in req.body) {
    delete req.body.images;
    console.log('🗑️ Removed req.body.images');
  }
  next();
};

exports.stripLocationFromBody = (req, res, next) => {
  if ('location' in req.body) {
    delete req.body.location;
    console.log('🗑️ Removed req.body.location');
  }
  next();
};

exports.setReviewsAndRatings = (req, res, next) => {
  const { rating, reviewCount } = generateRandomReviewsAndRatings();
  req.body.reviews = reviewCount;
  req.body.rating = rating;
  next();
};
