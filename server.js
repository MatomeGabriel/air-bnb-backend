const mongoose = require('mongoose');
const dotenv = require('dotenv');

// when we have a bug or errors in our syncronous code that was not caught anywhere
process.on('uncaughtException', (err) => {
  console.log('UNHANDLED EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// 1) Configure our dot env
dotenv.config({ path: './config.env' });

// 2) Call our APP
const app = require('./app');

//3) Connect to our mongodb database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB Connection Successful');
  })
  .catch((err) => console.log(err));

// Run our server
const port = process.env.PORT || 8000;
// const server =
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}....`);
});

// Async exceptions, async logic failed without recovery
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 🔥 Shutting down...');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
