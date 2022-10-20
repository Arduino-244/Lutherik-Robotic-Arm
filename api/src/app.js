const express = require('express');
const app = express();

const servoRouter = require('./routes/servoRoute');

app.use(servoRouter);

module.exports = app;