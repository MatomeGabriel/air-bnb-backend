const factory = require('./handleFactory');
const Reservation = require('../models/Reservation');

exports.createReservation = factory.createOne(Reservation);

exports.getHostReservations = (req, res, next) => {};
exports.getUserReservations = (req, res, next) => {};
exports.deleteReservation = (req, res, next) => {};
