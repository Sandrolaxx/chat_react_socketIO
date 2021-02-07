const Koa = require('koa');
const http = require('http');
const socket = require('socket.io');

const app = new Koa();
const server = http.createServer(app.callback());
const io = socket(server);

const SERVER_HOST = 'localhost';
const SERVER_PORT = 8080;

io.on('connection', () => {
  console.log('[IO] => Server has a new connection');
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log('Server is running pai🔥');
});