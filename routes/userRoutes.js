const express = require('express');

// middleware for authentication and authorization
const auth = require('../middleware/auth');
// Middleware for handling user image uploads and resizing
const mediaUpload = require('../middleware/mediaUpload');

const router = express.Router();

/**
 *  @route POST /signup
 *  @desc Signup a regular user
 *  @acces Public
 *
 *  Middleware chain:
 *  1 .setRole('user): sets the role to 'user' before creating an account
 *  2. Signup: creates user in the database and sends back a cookie
 */

router.post(
  '/signup',
  // mediaUpload.uploadUserImage,
  // mediaUpload.resizeUserImage,
  auth.setRole('user'),
  auth.signUp,
);

router.post('/signup/host', auth.setRole('host'), auth.signUp);
router.post('/login', auth.login);
router.post('/logout', auth.logout);

router.get('/host/:host_id', auth.getHost);

router.use(auth.protect);

router.patch(
  '/upload-profile-image',
  mediaUpload.uploadUserImage,
  mediaUpload.resizeUserImage,
  auth.updateUserImage,
);
router.get('/me', auth.getMe, auth.getUser);

module.exports = router;
