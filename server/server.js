const express = require('express');

const http = require('http');
const PORT = process.env.PORT || 5000;
const staffRoom = '';

const io = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

const socket = io(server, {
  cors: {
    origin: '*',
  },
});

socket.on('connection', (socket) => {
  console.log('client connected', socket.id);

  socket.on('counter', (payload) => {
    console.log(payload.studentName,payload.counter);
    counter = payload.counter;
    studentName = payload.studentName;
    socket.emit('result', {
      counter: payload.counter,
      studentName: payload.studentName,
    });
  });

  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnected');
  });
});

app.use(cors());

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
