const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ServoController = require('../controllers/ServoController');

router.use(bodyParser.json());

router.get('/moveBottomServo', ServoController.moveBottomServo);

router.get('/moveRightServo', ServoController.moveRightServo);

router.get('/moveLeftServo', ServoController.moveLeftServo);

router.get('/moveTopServo', ServoController.moveTopServo);

router.get('/openClaw', ServoController.openClaw);

router.get('/closeClaw', ServoController.closeClaw);

module.exports = router;