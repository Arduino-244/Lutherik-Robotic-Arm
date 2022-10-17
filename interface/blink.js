const five = require("johnny-five");
const board = new five.Board({ port: 'COM3' });

board.on("ready", () => {
  const led = new five.Led(6);
  led.pulse({
    easing: "inOutCube",
    duration: 5000,
    cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
    keyFrames: [0, 10, 0, 50, 0, 255],
    onstop: () => {
      console.log("Animation stopped");
    }
  });
});