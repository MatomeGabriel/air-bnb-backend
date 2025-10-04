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
