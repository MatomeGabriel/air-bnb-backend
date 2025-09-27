/**
 * Reservation Routes
 * Defines RESTful routes for reservation CRUD operations and host/user-specific queries.
 */
const express = require('express');
const auth = require('../middleware/auth');
const reservationController = require('../controllers/reservationController');
const reservationMiddleware = require('../middleware/reservationMiddleware');

const router = express.Router();

// when creating the reservation you must b
/**
 * 1. logged in - get the id from the cookie,
 * - append user id
 * 2. get the host id from the listing id (query fro the )
 * 3. Save the reservation
 * 4. send back the reservation
 */

router.use(auth.protect);

router
  .route('/')
  .get(reservationMiddleware.setQueryId, reservationController.getReservations)
  .post(
    reservationMiddleware.appendUserId,
    reservationController.createReservation,
  );

// Delete an accommodation based on the ID
router
  .route('/:id')
  .delete(
    reservationMiddleware.setQueryId,
    reservationController.deleteReservation,
  );

module.exports = router;
