// This is our accommodation Controller
// This interact with with our database

const Accommodation = require('../models/Accommodation');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { deleteFiles } = require('../utils/fsHelper');
const factory = require('./handleFactory');

// Place our controllers into an exports object
exports.getAllAccommodations = factory.getAll(Accommodation);

exports.getAccommodation = factory.getOne(Accommodation);

exports.createAccommodation = factory.createOne(Accommodation);

exports.updateAccommodation = factory.updateOne(Accommodation);
exports.deleteAccommodation = factory.deleteOne(Accommodation);

exports.deleteAccommodationImages = catchAsync(async (req, res, next) => {
  const accommodation = await Accommodation.findById(req.params.id);
  if (!accommodation) return next();
  const { images = [] } = accommodation;

  console.log(images);
  if (images.length > 0) {
    await deleteFiles(images);
  }
  console.log('Successfully deleted');
  next();
});

exports.removeAccommodationImage = catchAsync(async (req, res, next) => {
  const accommodation = await Accommodation.findOneAndUpdate(
    {
      _id: req.params.id,
      host_id: req.user.id,
    },
    { $pull: { images: req.body.imagePath } },
    {
      new: true,
    },
  );

  if (!accommodation) {
    return next(new AppError('Accommodation not found or access denied', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Image deleted successfully',
    data: {
      data: accommodation.images,
    },
  });
});

exports.getAllHostAccommodations = catchAsync(async (req, res, next) => {
  // build a query
  const features = new APIFeatures(
    Accommodation.find({ host_id: req.user._id }),
    req.query,
  ).filter();

  // await our query
  const docs = await features.query;

  // const accommodations = Acc
  res.status(200).json({
    status: 'success',
    results: docs.length,
    data: {
      data: docs,
    },
  });
});
