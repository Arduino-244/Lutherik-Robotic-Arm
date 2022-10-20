const express = require('express');
const ServoController = require('./../controllers/ServoController');
const router = express.Router();

router.get('/moveBottomServo/:degrees', ServoController.moveBottomServo);

router.get('/moveArmServo/:degrees', ServoController.moveArmServo);

router.get('/moveForearmServo/:degrees', ServoController.moveForearmServo);

router.get('/moveTopServo/:degrees', ServoController.moveTopServo);

router.get('/openClaw', ServoController.openClaw);

router.get('/closeClaw', ServoController.closeClaw);

router.get('/reset', ServoController.reset);

router.get('/startRecording', ServoController.startRecording);

router.get('/stopRecording', ServoController.stopRecording);

module.exports = router;