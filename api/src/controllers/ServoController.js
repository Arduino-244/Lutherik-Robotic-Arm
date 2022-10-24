const five = require('johnny-five');
const clamp = require('./../util/clamp');
const led = new five.Led(13);
const macroUpdateTime = 100;

const servoBottom = new five.Servo({
    pin: 8,
    range: [0, 180],
    startAt: 90
});
const servoRight = new five.Servo({
    pin: 9,
    range: [0, 180],
    fps: 200,
    startAt: 90
});
const servoLeft = new five.Servo({
    pin: 10,
    range: [0, 180],
    fps: 200,
    startAt: 110
})  
const servoTop = new five.Servo({
    pin: 11,
    range: [0, 75],
    startAt: 70
});

const servoReset = [ 90, 90, 90, 35 ];

const moveBottomServo = degrees => servoBottom.to(degrees);
const moveRightServo = degrees => servoRight.to(degrees);
const moveLeftServo = degrees => servoLeft.to(degrees);
const moveTopServo = degrees => servoTop.to(degrees);

let isRecording = false;
let macro;
let macroIndex;

const recordMacroKey = () => {
    if (!isRecording) return;
    setTimeout(() => {
        macro.push([servoBottom.position, servoRight.position, servoLeft.position, servoTop.position])
        recordMacroKey();
    }, macroUpdateTime);
};

const runMacro = () => {
    setTimeout(() => {
        let currentKey = macro[macroIndex];
        if (!currentKey) return;
        servoBottom.to(currentKey[0]);
        servoRight.to(currentKey[1]);
        servoLeft.to(currentKey[2]);
        servoTop.to(currentKey[3]);
        macroIndex++;
        if (macroIndex > macro.length) return;
        runMacro();
    }, macroUpdateTime);
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
        
        console.log('Arm Servo Right', rightDegrees)
        console.log('Arm Servo Left', degrees);
        res.send(`Arm servo to ${degrees}, ${rightDegrees}`);
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

    startSweeping(req, res) {
        console.log(req)
    }

    reset(req, res) {
        res.send('Reset');
        isRecording = false;
        macro = [];
        moveBottomServo(servoReset[0]);
        moveRightServo(servoReset[1]);
        moveLeftServo(servoReset[2]);
        moveTopServo(servoReset[3]);
    }

}

module.exports = new ServoController();
