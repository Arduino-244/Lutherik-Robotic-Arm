require('dotenv').config();

const five = require('johnny-five');
const board = new five.Board({ port: process.env.COM || 'COM3' });

board.on('ready', () => {
    const http = require('http');
    const app = require('./app');
    const port = process.env.PORT || 3000;
    const server = http.createServer(app);
    server.listen(port);
    console.log('Started')
});
