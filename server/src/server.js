const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

const SERVER_HOST = 'localhost';//Trocar pelo ip local da rede
const SERVER_PORT = 4747;

io.on('connection', socket => {
    console.log('[IO] Connection => Server has a new connection');

    socket.on('chat.message', data => {
        console.log('[SOCKET] Chat message🛸📨 =>', data);
        io.emit('chat.message', data);
    });

    socket.on('disconnect', () => {
        console.log('See you later😢')
    })
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log('🔥Server is running🏃');
})