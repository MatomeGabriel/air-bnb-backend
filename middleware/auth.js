exports.signup = async (req, resizeBy, next) => {
  req.status(404).json({
    status: "fail",
    message: "User not defined",
  });
};
