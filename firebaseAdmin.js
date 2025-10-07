/**
 * @file firebaseAdmin.js
 * @description Initializes Firebase Admin SDK and exports the storage bucket instance.
 *
 * Loads service account credentials from the FIREBASE_ADMIN_KEY environment variable,
 * sets up Firebase Admin with those credentials, and connects to a specified storage bucket.
 *
 * @usage
 * const { admin, bucket } = require('./firebaseAdmin');
 */
require('dotenv').config();
const admin = require('firebase-admin');

/**
 * @constant {Object} serviceAccount
 * @description Parsed Firebase service account credentials from environment variable
 */
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);

/**
 * Initializes Firebase Admin SDK with credentials and storage bucket.
 */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'air-bnb-storage.firebasestorage.app',
});

console.log('✅Firebase has been initialized');

/**
 * @constant {Bucket} bucket
 * @description Firebase Storage bucket instance
 */
const bucket = admin.storage().bucket();

/**
 * @exports admin - Firebase Admin SDK instance
 * @exports bucket - Firebase Storage bucket instance
 */
module.exports = { admin, bucket };
