const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ServoController = require('../controllers/ServoController');

router.use(bodyParser.json());

router.get('/moveBottomServo/:degrees', ServoController.moveBottomServo);

router.get('/moveRightServo/:degrees', ServoController.moveRightServo);

router.get('/moveLeftServo/:degrees', ServoController.moveLeftServo);

router.get('/moveTopServo/:degrees', ServoController.moveTopServo);

router.get('/openClaw', ServoController.openClaw);

router.get('/closeClaw', ServoController.closeClaw);

module.exports = router;