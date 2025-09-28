/**
 * Entry point for the backend server.
 * - Loads environment variables
 * - Connects to MongoDB
 * - Starts Express server
 * - Handles unhandled promise rejections
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

/**
 * Load environment variables from config.env file
 */
dotenv.config({ path: './config.env' });

/**
 * Import Express app instance
 */
const app = require('./app');

/**
 * Build MongoDB connection string from environment variables
 */
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

/**
 * Connect to MongoDB using Mongoose
 */
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB Connection Successful');
  })
  .catch((err) => console.log(err));

/**
 * Start Express server on configured port
 */
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}....`);
});

/**
 * Handle unhandled promise rejections to gracefully shut down the server
 */
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 🔥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
