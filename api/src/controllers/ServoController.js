const five = require("johnny-five");
const led = new five.Led(13);

const servoBottom = new five.Servo(8);
const servoRight = new five.Servo(9);
const servoLeft = new five.Servo(10);
const servoTop = new five.Servo(11);

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const moveRightServo = async (degrees) => {
    console.log(degrees);
    servoRight.to(degrees);
}

const moveLeftServo = async (degrees) => {
    console.log(degrees);
    servoLeft.to(degrees);
}

class ServoController {

    moveBottomServo(req, res, next) {
        console.log('Bottom', req.params.degrees);
        res.send('Bottom servo');
        servoBottom.to(req.params.degrees)

    }

    moveArmServo(req, res, next) {
        console.log('Arm Servo', req.params.degrees);
        res.send('Arm Servo');
        const leftDegrees = req.params.degrees;
        const rightDegrees = clamp(180 - leftDegrees, 0,  180);
        moveRightServo(rightDegrees);
        moveLeftServo(leftDegrees);
    }

    moveForearmServo(req, res, next) {
        console.log('Forearm Servo', req.params.degrees);
        res.send('Forearm Servo');
        servoRight.to(req.params.degrees);
    }

    moveTopServo(req, res, next) {
        degrees = req.params.req.params.degrees;
        res.send('Top servo');
        servoTop.to(req.params.degrees);
    }

    openClaw(req, res, next) {
        console.log('Open claw');
        res.send('Open claw');
        led.on();
        servoTop.max();
    }

    closeClaw(req, res, next) {
        console.log('Close claw');
        res.send('Close claw');
        led.off();
        servoTop.min();
    }

}

module.exports = new ServoController();
