require('dotenv').config();
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

// const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
// firebaseConfig.privateKey = firebaseConfig.privateKey.replace(/\\n/g, '\n');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'air-bnb-storage.firebasestorage.app',
});

console.log('✅Firebase has been initialized');
const bucket = admin.storage().bucket();
module.exports = { admin, bucket };
