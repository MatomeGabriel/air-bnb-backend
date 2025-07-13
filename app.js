const express = require('express');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const accommodationRoute = require('./routes/accommodationRoutes');
// 1) Initialize our express app
const app = express();

// 2) Middlewares
// body-parser
app.use(express.json());

// 3) Routes Middleware

app.use('/api/accommodations', accommodationRoute);

// 4) Catch all request that were not handled by our routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorHandler);

module.exports = app;
