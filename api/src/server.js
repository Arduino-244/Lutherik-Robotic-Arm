require('dotenv').config();

const five = require('johnny-five');
const board = new five.Board({ port: 'COM3' });

const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);

board.on('ready', () => {
    server.listen(port);
    console.log('Started')
});
