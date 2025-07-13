const express = require('express');
const accommodationController = require('../controllers/accommodationController');

const router = express.Router();

router
  .route('/')
  .get(accommodationController.getAllAccommodations)
  .post('/', accommodationController.createAccommodation);

//  Get a single accommodation
router('/:id').get(accommodationController.getAccommodation);

// Delete an accommodation based on the ID
router('/:id').delete(accommodationController.deleteAccommodation);

module.exports = router;
