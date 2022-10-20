const five = require("johnny-five");
const board = new five.Board({ port: 'COM3' });

board.on('ready', () => {
    createServer();
});

function createServer() {
    require('dotenv').config();
    const http = require('http');
    const app = require('./app');

    const port = process.env.PORT || 3000;
    const server = http.createServer(app);

    server.listen(port);
}
