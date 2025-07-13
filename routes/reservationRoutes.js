const express = require('express');
const reservationController = require('../controllers/reservationController');

const router = express.Router();

router.route('/').post(reservationController.createReservation);
router.route('/host').get(reservationController.getHostReservations);
router.route('/user').get(reservationController.getUserReservations);

// Delete an accommodation based on the ID
router('/:id').delete(reservationController.deleteReservation);

module.exports = router;
