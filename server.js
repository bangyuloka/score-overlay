const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let scores = { teamA: 0, teamB: 0 };
let teamNames = { teamA: "TIM A", teamB: "TIM B" };

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.emit('scoreUpdate', scores);
  socket.emit('teamNameUpdate', teamNames);

  socket.on('updateScore', (data) => {
    scores = data;
    io.emit('scoreUpdate', scores);
  });

  socket.on('updateTeamNames', (data) => {
    teamNames = data;
    io.emit('teamNameUpdate', teamNames);
  });
});

server.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
