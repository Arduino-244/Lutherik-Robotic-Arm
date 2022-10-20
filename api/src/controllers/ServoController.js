const five = require('johnny-five');
const clamp = require('./../util/clamp')
const led = new five.Led(13);

const servoBottom = new five.Servo(8);
const servoRight = new five.Servo(9);
const servoLeft = new five.Servo(10);
const servoTop = new five.Servo(11);

const servoReset = [ 90, 65, 90, 90 ];

const moveBottomServo = async degrees => servoBottom.to(degrees);
const moveRightServo = async degrees => servoRight.to(degrees);
const moveLeftServo = async degrees => servoLeft.to(degrees);
const moveTopServo = async degrees => servoTop.to(degrees);

let isRecording = false;
let macro;
let macroIndex;

const recordMacroKey = () => {
    if (!isRecording) return;
    setTimeout(function() {
        macro.push([servoBottom.position, servoRight.position, servoLeft.position, servoTop.position])
        recordMacroKey();
    }, 500)
};

const runMacro = () => {
    setTimeout(() => {
        let currentKey = macro[macroIndex]
        servoBottom.to(currentKey[0]);
        servoRight.to(currentKey[1]);
        servoLeft.to(currentKey[2]);
        servoTop.to(currentKey[3]);
        macroIndex++;
        if (macroIndex > macro.length) return;
        runMacro();
    }, 500);
};

class ServoController {

    moveBottomServo(req, res) {
        const degrees = req.params.degrees;

        moveBottomServo(degrees);

        console.log('Bottom', degrees);
        res.send(`Bottom servo to ${degrees}`);
    }

    moveArmServo(req, res) {
        const degrees = req.params.degrees;

        const leftDegrees = degrees;
        const rightDegrees = clamp(180 - leftDegrees, 0,  180);
        moveRightServo(rightDegrees);
        moveLeftServo(leftDegrees);

        console.log('Arm Servo', degrees);
        res.send(`Arm servo to ${degrees}`);
    }

    moveForearmServo(req, res) {
        const degrees = req.params.degrees;

        moveRightServo(degrees);

        console.log('Forearm Servo', degrees);
        res.send(`Forearm servo to ${degrees}`);
    }

    moveTopServo(req, res) {
        const degrees = req.params.degrees;

        moveTopServo(degrees);

        console.log('Top Servo', degrees);
        res.send(`Top servo to ${degrees}`);
    }

    openClaw(req, res) {
        led.on();
        servoTop.max();

        console.log('Open claw');
        res.send('Open claw');
    }

    closeClaw(req, res) {
        led.off();
        servoTop.min();

        console.log('Close claw');
        res.send('Close claw');
    }

    startRecording(req, res) {
        isRecording = true;
        macro = []
        
        res.send('startRecording')

        recordMacroKey();
    }

    stopRecording(req, res) {
        isRecording = false;
        
        res.send('stopRecording');
        macroIndex = 0;
        runMacro();
    }

    reset(req, res) {
        res.send('Reset');
        moveBottomServo(servoReset[0]);
        moveRightServo(servoReset[1]);
        moveLeftServo(servoReset[2]);
        moveTopServo(servoReset[3]);
    }

}

module.exports = new ServoController();
