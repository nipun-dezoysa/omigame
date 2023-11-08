const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});
var name = [];
var games = {
  id: "as",
  player1: { cards: [1, 2, 3, 4, 5] },
  player2: null,
};
io.on("connection", (socket) => {
  console.log("user: " + socket.id);
  socket.on("create_room", (data) => {
    var found = false;
    for (var a = 0; a < name.length; a++) {
      if (name[a].id == data.roomId) found = true;
    }
    if (found) {
      socket.emit("receive_message", "already have");
    } else {
      name.push({
        id: data.roomId,
        player1: {name:data.name, socket: socket.id, cards: null },
        player2: null,
      });
      socket.join(data.roomId);
      socket.emit("receive_message", "ok");
    }
  });
  socket.on("join_room", (data) => {
    var found = false;
    for (var a = 0; a < name.length; a++) {
      if (name[a].id == data.roomId) {
        found = true;
        name[a].player2 = { name:data.name, socket: socket.id, cards: null };
        socket.join(data.roomId);
        io.in(data.roomId).emit("receive_message", "player2: "+name[a].player2.name);
      }
    }
    if (!found) {
      socket.emit("receive_message", "not found room");
    }
  });
  socket.on("disconnecting", () => {
    console.log(socket.id); // the Set contains at least the socket ID
  });
  socket.on("disconnect", () => {
    console.log("ado " + socket.id);
  });
});

server.listen(3001, () => {
  console.log("server working");
});
