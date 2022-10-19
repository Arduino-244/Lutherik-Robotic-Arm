class ServoController {

    moveBottomServo(req, res, next) {
        console.log('Bottom', req.body.degrees);
        res.send('Bottom servo');
    }

    moveRightServo(req, res, next) {
        console.log('Right', req.body.degrees);
        res.send('Right servo');
    }

    moveLeftServo(req, res, next) {
        console.log('Left', req.body.degrees);
        res.send('Left servo');
    }

    moveTopServo(req, res, next) {
        console.log('Top', req.body.degrees);
        res.send('Top servo');
    }

    openClaw(req, res, next) {
        console.log('Open claw');
        res.send('Open claw');
    }

    closeClaw(req, res, next) {
        console.log('Close claw');
        res.send('Close claw');
    }

}

module.exports = new ServoController();
