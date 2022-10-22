const five = require('johnny-five');
const clamp = require('./../util/clamp');
const led = new five.Led(13);

const servoBottom = new five.Servo({
    pin: 8,
    range: [0, 180],
    startAt: 90
});
const servoRight = new five.Servo({
    pin: 9,
    range: [0, 180],
    startAt: 90
});
const servoLeft = new five.Servo({
    pin: 10,
    range: [0, 130],
    startAt: 110
});
const servoTop = new five.Servo({
    pin: 11,
    range: [0, 70],
    startAt: 35
});

const servoReset = [ 90, 90, 90, 35 ];

const moveBottomServo = async degrees => servoBottom.to(degrees);
const moveRightServo = async degrees => servoRight.to(degrees);
const moveLeftServo = async degrees => servoLeft.to(degrees);
const moveTopServo = async degrees => servoTop.to(degrees);

let isRecording = false;
let macro;
let macroIndex;

const recordMacroKey = () => {
    if (!isRecording) return;
    setTimeout(() => {
        macro.push([servoBottom.position, servoRight.position, servoLeft.position, servoTop.position])
        recordMacroKey();
    }, 500);
};

const runMacro = () => {
    setTimeout(() => {
        let currentKey = macro[macroIndex];
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
        const rightDegrees = clamp(130 - leftDegrees, 0,  130);
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
        servoTop.min();

        console.log('Open claw');
        res.send('Open claw');
    }

    closeClaw(req, res) {
        led.off();
        servoTop.max();

        console.log('Close claw');
        res.send('Close claw');
    }

    startRecording(req, res) {
        isRecording = true;
        macro = [];
        
        res.send('startRecording');

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
