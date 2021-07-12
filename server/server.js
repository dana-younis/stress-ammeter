const express = require('express');
const app = express();
const http = require('http');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const server = http.createServer(app);
const io = require('socket.io')(http);
const staffRoom = 'staff';
const { v4: uuidv4 } = require('uuid');
io.listen(server);

app.use(cors());
// app.get('/hi', (req, res) => {
//   res.send('Hello World');
// });

io.on('connection', (socket) => {
  // console.log('clie.nt connected', socket.id);
  //2a
  socket.on('join', (payload) => {
    // socket.join will put the socket in a private room
    socket.join(staffRoom);
    socket.to(staffRoom).emit('onlineStaff', { name: payload.name, id: socket.id, score: payload.score });
  });
  socket.on('createTicket', (payload) => {
    // 2
    socket
      .in(staffRoom)
      .emit('newTicket', { ...payload, id: uuidv4(), socketId: socket.id, score: payload.score });
  });

  socket.on('claim', (payload) => {
    // 2
    socket
      .in(staffRoom)
      .emit('newTicket', { ...payload, id: uuidv4(), socketId: socket.id, score: payload.score });
  });
  socket.on('disconnect', () => {
    socket.to(staffRoom).emit('offlineStaff', { id: socket.id, score: payload.score });
  });
});
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
