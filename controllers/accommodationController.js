// This is our accommodation Controller
// This interact with with our database

// Place our controllers into an exports object
exports.getAllAccommodations = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Get All Accommodation',
  });
};

exports.getAccommodation = (req, res, next) => {};
exports.createAccommodation = (req, res, next) => {};
exports.deleteAccommodation = (req, res, next) => {};
