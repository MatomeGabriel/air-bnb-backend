const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an accommodation name'],
    unique: true,
  },
  description: String,
  type: {
    type: String,
    enum: ['Entire Unit', 'Room', 'Whole Villa'],
    required: [true, 'Please provide the type of an accommodation'],
  },
  location: {
    type: String,
    enum: [
      'Cape Town',
      'Paris',
      'New York',
      'Tokyo',
      'London',
      'Barcelona',
      'Rome',
      'Sydney',
      'Dubai',
      'Bangkok',
    ],
    required: [true, 'Please select a valid location'],
  },
  images: [String],
  maxGuests: {
    type: Number,
    required: [true, 'Tell us how many guest are allowed at most.'],
    min: [1, 'At least one guest must be allowed.'],
    default: 1,
  },
  bedrooms: {
    type: Number,
    required: [true, 'Please specify how many bedrooms are available'],
    min: [1, 'At least one bedroom must be provided.'],
    default: 1,
  },
  rating: Number,
  reviews: Number,
  price: {
    type: Number,
    required: [true, 'Please provide the price per night'],
    min: [1, 'Accommodation price must be above 1'],
  },
  enhancedCleaning: {
    type: Boolean,
    default: true,
  },
  selfCheckIn: {
    type: Boolean,
    default: true,
  },
  amenities: [String],
  host_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Each tour must be associated with a user'],
    immutable: true,
  },
  host: String,
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Each tour must be associated with a user'],
    immutable: true,
  },
  user: String,
  weeklyDiscount: Number,
  cleaningFee: Number,
  serviceFee: Number,
  occupancyTaxes: Number,
  specificRatings: {
    cleanliness: { type: Number, required: true },
    communication: { type: Number, required: true },
    checkIn: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    location: { type: Number, required: true },
    value: { type: Number, required: true },
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
