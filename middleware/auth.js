exports.signup = async (req, res, next) => {
  req.status(404).json({
    status: 'fail',
    message: 'User not defined',
  });
};
