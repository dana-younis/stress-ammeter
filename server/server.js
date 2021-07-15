const express = require('express');

const http = require('http');
const PORT = process.env.PORT || 5000;
const userRoom = ""
const { v4: uuidv4 } = require('uuid');
const io = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

const socket = io(server, {
  cors: {
    origin: '*'
  }
})

const queue = {
  user: [],
  tickets: []
};
app.use(cors());
let m;
let counter;

socket.on('connection', (socket) => {
  console.log('client connected', socket.id);
  socket.on("student", (payload) => {

    console.log("jjjjj", payload);
    m = payload.studentName
    counter = payload.counter;
  })


  socket.on('counter', (payload) => {
    console.log(payload.studentName, payload.counter);
    counter = payload.counter;

    const ticketData = { counter: payload.counter, studentName: payload.studentName, id: uuidv4(), socketId: socket.id };
    queue.tickets.push(ticketData);
    socket.in(userRoom).emit('newTicket', ticketData);

    socket.emit('result', { counter: payload.counter, studentName: payload.studentName })

    socket.emit('getData', { studentName: payload.studentName })
  })
  let user;
  socket.on('join', (payload) => {
    console.log('userjooooooin');
    payload.studentName = m
    payload.counter = counter;

    // socket.join will put the socket in a private room
    console.log("join", payload.studentName, "id", socket.id);
    user = { "studentName": payload.studentName, "id": socket.id, "counter": payload.counter };
    console.log(user);
    queue.user.push(user);
    socket.join(userRoom);
    socket.to(userRoom).emit('onlineUser', user);


  });

  socket.on('getAll', () => {
    queue.user.forEach((person) => {
      socket.emit('onlineUser', { studentName: person.studentName, id: person.id, counter: person.counter });
    });
  })


  socket.on('disconnect', () => {

    console.log(socket.id, "disconnected");
    socket.to(userRoom).emit('offlineUser', { id: socket.id });
  })










})




server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
