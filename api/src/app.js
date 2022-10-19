const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const servoRouter = require('./routes/servoRoute');

app.use(servoRouter);

app.use(bodyParser.json());
app.use(morgan);

module.exports = app;