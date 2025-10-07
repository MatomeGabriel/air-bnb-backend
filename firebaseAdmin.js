/**
 * Firebase Admin SDK Initialization
 *
 * This module sets up and exports the Firebase Admin instance and storage bucket for use in the backend.
 * - Loads service account credentials from environment variable FIREBASE_ADMIN_KEY
 * - Initializes Firebase Admin with credentials and storage bucket
 * - Exports both the admin instance and the storage bucket
 *
 * Usage:
 *   const { admin, bucket } = require('./firebaseAdmin');
 *
 * Environment Variables:
 *   FIREBASE_ADMIN_KEY: JSON string of Firebase service account credentials
 *
 * Exports:
 *   admin  - The initialized Firebase Admin SDK instance
 *   bucket - The Firebase Storage bucket instance
 */

require('dotenv').config();
const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'air-bnb-storage.firebasestorage.app',
});

console.log('✅Firebase has been initialized');
const bucket = admin.storage().bucket();
module.exports = { admin, bucket };
