const express = require('express');
const qs = require('qs');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const accommodationRoute = require('./routes/accommodationRoutes');
const reservationRoute = require('./routes/reservationRoutes');
const userRoute = require('./routes/userRoutes');

// 1) Initialize our express app
const app = express();
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // or use '*' for development

    credentials: true, // if you're using cookies
  }),
);

app.set('query parser', (str) => qs.parse(str, { depth: 1 }));

// 2) MIDDLEWARES

app.use('/uploads', express.static(path.resolve('./uploads')));
// body-parser
app.use(express.json({ limit: '100kb' }));
// enables form data
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(cookieParser());

// 3) ROUTES MIDDLEWARE
app.use('/api/users', userRoute);
app.use('/api/accommodations', accommodationRoute);
app.use('/api/reservations', reservationRoute);

// 4) Catch all request that were not handled by our routes
app.all('/{*any}', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorHandler);

module.exports = app;
