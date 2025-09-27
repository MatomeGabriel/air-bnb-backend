/**
 * Accommodation Routes
 * Defines RESTful routes for accommodation CRUD operations and image management.
 */
const express = require('express');

const accommodationController = require('../controllers/accommodationController');
const auth = require('../middleware/auth');
const mediaUpload = require('../middleware/mediaUpload');
const accMiddleware = require('../middleware/accMiddleware');

const router = express.Router();

// router.route('/').get(accommodationController.getAllAccommodations).post(
//   auth.protect,
//   auth.restrictTo('host', 'super-admin'),
//   // ,
//   mediaUpload.uploadAccommodationImages,
//   /**
//    * We need to set the host Id after our multer have parsed req.body
//    * Otherwise the req.body is undefined
//    */
//   auth.setHostId,
//   mediaUpload.resizeAccommodationImages,
//   accommodationController.createAccommodation,
// );

router
  .route('/')
  .get(accommodationController.getAllAccommodations)
  .post(
    auth.protect,
    auth.restrictTo('host', 'super-admin'),
    auth.setHostId,
    accMiddleware.setDefaultImages,
    accMiddleware.setReviewsAndRatings,
    accommodationController.createAccommodation,
  );

router.get('/:id', accommodationController.getAccommodation);
//  Get a single accommodation
// Delete an accommodation based on the ID

router.get('/locations/summary', accommodationController.getLocationsSummary);
/**
 * Protects all the routes
 */
router.use(auth.protect, auth.restrictTo('host', 'super-admin'));

router
  .route('/host/listings')
  .get(accommodationController.getAllHostAccommodations);

router
  .route('/:id')
  .patch(
    accMiddleware.stripImagesFromBody,
    accMiddleware.stripLocationFromBody,
    accommodationController.updateAccommodation,
  )
  .delete(
    accommodationController.deleteAccommodationImages,
    accommodationController.deleteAccommodation,
  );

// for Images
router
  .route('/:id/images')
  .post(
    mediaUpload.uploadAccommodationImages,
    accMiddleware.isAccommodationAvailable,
    mediaUpload.resizeAccommodationImages,
    accommodationController.updateAccommodation,
  )
  .patch(
    mediaUpload.uploadAccommodationImages,
    mediaUpload.updateAccommodationImages,
    mediaUpload.resizeAccommodationImages,
    accommodationController.updateAccommodation,
  )
  .delete(
    accMiddleware.isAccommodationAvailable,
    mediaUpload.deleteAccommodationImage,
    accommodationController.removeAccommodationImage,
  );

module.exports = router;
