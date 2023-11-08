const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
var db = require("./database.js");
var randomstring = require("randomstring");

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
    var roomid = randomstring.generate(5);
    db.run(
      "INSERT INTO rooms(roomid,password) VALUES (?,?)",
      [roomid, "aa"],
      (err) => {
        if (err) console.log(err);
        else console.log("inserted");
      }
    );
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
});

var sql = "select * from rooms";

db.get(sql, (err, row) => {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  console.log(row);
});

server.listen(3001, () => {
  console.log("server working");
});
