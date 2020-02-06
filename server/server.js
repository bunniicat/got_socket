const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (sock) => {
    console.log('Someone connected!!');  
    sock.emit('message', 'Hi, you are connected');
})

io.on('connection', (sock) => {
    sock.emit('playerObject', {name: "test name", age: 23, status: "plswork"})
})

server.on('error', (err) => {
    console.log('Server error:', err);
});

server.listen(8080, () => {
    console.log('Game of Thrones connected to 8080!');
})