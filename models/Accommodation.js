/**
 * Accommodation Model
 * Defines the schema for accommodation listings, including host, location, amenities, images, and pricing.
 */
const mongoose = require('mongoose');
/**
 * Accommodation Schema
 * Represents a listing with location, pricing, hosting options, and availability
 */
const accommodationSchema = new mongoose.Schema({
  /**
   * Title of the accommodation listing.
   * Must be unique.
   */
  title: {
    type: String,
    required: [true, 'Please provide an accommodation name'],
    unique: true,
  },
  /**
   * Optional description for guests.
   */
  description: String,
  /**
   * Type of accommodation.
   * Allowed values: 'Entire Unit', 'Room', 'Whole Villa'
   */
  type: {
    type: String,
    enum: ['Entire Unit', 'Room', 'Whole Villa'],
    required: [true, 'Please provide the type of an accommodation'],
  },
  /**
   * Location of listing.
   * Allowed values: predefined cities around the world
   */
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
  /**
   * Array of image file path.
   */
  /**
  images: {
    type: [String],
    required: [true, 'Please provide at least one image'],
    validate: {
      validator: (arr) => Array.isArray(arr) && arr.length > 0,
      message: 'Please provide at least one image',
    },
  },
  **/

  images: {
    type: [
      {
        url: {
          type: String,
          required: true,
        },
        path: {
          type: String,
          required: true,
        },
      },
    ],
    required: [true, 'Please provide at least one image'],
    validate: {
      validator: (arr) => !arr || (Array.isArray(arr) && arr.length > 0),
      message: 'Please provide at least one image',
    },
  },
  /**
   * Maximum number of guest allowed.
   * Default is 1, must be >=1
   */
  maxGuests: {
    type: Number,
    required: [true, 'Tell us how many guest are allowed at most.'],
    min: [1, 'At least one guest must be allowed.'],
    default: 1,
  },
  /**
   * Number of bedrooms.
   * Default is 1, must be >=1
   */
  bedrooms: {
    type: Number,
    required: [true, 'Please specify how many bedrooms are available'],
    min: [1, 'At least one bedroom must be provided.'],
    default: 1,
  },
  bathrooms: {
    type: Number,
    required: [true, 'Please specify how many bathrooms are available'],
    min: [1, 'At least one bathroom must be provided.'],
    default: 1,
  },
  beds: {
    type: Number,
    required: [true, 'Please specify how many beds are available'],
    min: [1, 'At least one bed must be provided.'],
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
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);
module.exports = Accommodation;
