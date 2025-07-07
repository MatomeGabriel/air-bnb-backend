const express = require("express");

// 1) Initialize our express app
const app = express();

// 2) Middlewares
// body-parser
app.use(express.json());

// 3) Routes

// 4) Catch all request that were not handled

module.exports = app;
