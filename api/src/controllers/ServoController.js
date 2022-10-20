const five = require("johnny-five");
const led = new five.Led(13);

const servoBottom = new five.Servo(8);
const servoRight = new five.Servo(9);
const servoLeft = new five.Servo(10);
const servoTop = new five.Servo(11);

const servoReset = [ 90, 65, 90, 90 ];

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const moveRightServo = async (degrees) => {
    console.log(degrees);
    servoRight.to(degrees);
}

const moveLeftServo = async (degrees) => {
    console.log(degrees);
    servoLeft.to(degrees);
}

let isRecording = false;
let macro = [];

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

    startRecording(req, res, next) {
        isRecording = true;
        macro = []
        
        res.send('startRecording')

        function recordMacroKey() {
            if (!isRecording) return;
            setTimeout(function() {
                macro.push([servoBottom.position, servoRight.position, servoLeft.position, servoTop.position])
                recordMacroKey();
            }, 500)
        }

        recordMacroKey();
    }

    stopRecording(req, res, next) {
        res.send('stopRecording')
        isRecording = false;
        let i = 0;
        while (isRecording == false && macro.length > 0) {
            i++;
            let currentKey = macro[i]
            if (currentKey) {
                servoBottom.to(currentKey[0]);
                servoRight.to(currentKey[1]);
                servoLeft.to(currentKey[2]);
                servoTop.to(currentKey[3]);
                macro.pop();
            }
        }
    }

    reset(req, res, next) {
        res.send('Reset');
        servoBottom.to(servoReset[0]);
        servoRight.to(servoReset[1]);
        servoLeft.to(servoReset[2]);
        servoTop.to(servoReset[3]);
    }

}

module.exports = new ServoController();
