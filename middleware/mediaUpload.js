const { Types } = require('mongoose');
const sharp = require('sharp');

const multer = require('multer');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const fsHelper = require('../utils/fsHelper');
const Accommodation = require('../models/Accommodation');

/**
 * Create memory storage to save our images on memory
 * We will work on this images late such as resizing them
 */
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadAccommodationImages = upload.array('images', 10);
// exports.uploadAccommodationImages = upload.fields([
//   { name: 'images', maxCount: 10 },
//   { name: 'amenities' },
// ]);
exports.uploadUserImage = upload.single('photo');

exports.resizeUserImage = catchAsync(async (req, res, next) => {
  // req.body.photo = '';
  // if there is no image we go to the next

  if (!req.file) return next();
  // delete this
  req.tempUserId = new Types.ObjectId();
  const id = req.user._id;
  const fullPath = `uploads/users/${id}`;
  await fsHelper.createFolder(fullPath);

  const fileName = `user-${id}-${Date.now()}.jpeg`;
  const imgUrl = `${fullPath}/${fileName}`;
  await sharp(req.file.buffer)
    .resize(300, 300)
    .toFormat('jpeg')
    .jpeg({ quality: 80, progressive: true, chromaSubsampling: '4:4:4' })
    .toFile(imgUrl);

  req.body.photo = imgUrl;

  next();
});

exports.resizeAccommodationImages = catchAsync(async (req, res, next) => {
  // Set Images to an empty array
  req.body.images = [];
  if (!req.files) return next();

  /**
   * Get our ID from req.params
   */
  const { id } = req.params;

  // 2. Create folder path dynamically
  const fullPath = `uploads/accommodations/${id}`;
  /**
   *Create folder for this accommodation
   */
  await fsHelper.createFolder(fullPath);
  await Promise.all(
    req.files.map(async (file, i) => {
      // uploads/accommodations/accId
      // uploads/users/userId
      const filename = `accommodation-${id}-${Date.now()}-${i + 1}.jpeg`;
      const imgUrl = `${fullPath}/${filename}`;
      await sharp(file.buffer)
        .resize(1440, 960, { fit: 'cover' })
        .toFormat('jpeg')
        .jpeg({ quality: 90, progressive: true, chromaSubsampling: '4:4:4' })
        .toFile(imgUrl);

      req.body.images.push(imgUrl);
    }),
  );

  next();
});

// 1. know what is the method are we replacing, amending or deleting

// if we are replacing, we need to get all the images
//  then delete them from our server
// save our new images and generate urls
// then save the urls to the server

// if we are appending,
// generate our image urls
// then we append and save the images on the server

exports.updateAccommodationImages = catchAsync(async (req, res, next) => {
  if (!req.body.mode || req.body.mode === 'replace') {
    req.body.mode = 'replace';
    const { images } = await Accommodation.findById(req.params.id);
    await fsHelper.deleteFiles(images);
    return next();
  }
  req.body.mode = 'append';
  next();
});

exports.deleteAccommodationImage = catchAsync(async (req, res, next) => {
  await fsHelper.deleteFiles([`${req.body.imagePath}`]);
  next();
});
