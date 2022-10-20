const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ServoController = require('../controllers/ServoController');

router.use(bodyParser.json());

router.get('/moveBottomServo/:degrees', ServoController.moveBottomServo);

router.get('/moveArmServo/:degrees', ServoController.moveArmServo);

router.get('/moveForearmServo/:degrees', ServoController.moveForearmServo);

router.get('/moveTopServo/:degrees', ServoController.moveTopServo);

router.get('/openClaw', ServoController.openClaw);

router.get('/closeClaw', ServoController.closeClaw);

router.get('/reset', ServoController.reset);

module.exports = router;