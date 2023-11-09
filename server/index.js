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

io.on("connection", (socket) => {
  console.log("user: " + socket.id);
  socket.on("create_room", (data) => {
    var roomid = randomstring.generate(5);
    db.run("INSERT INTO game(roomid) VALUES (?)", [roomid], (err) => {
      if (err) console.log(err);
      else {
        socket.join(roomid);
        var clients = io.sockets.clients
        console.log(clients);
        db.get("SELECT * from game ORDER BY gameid DESC",[],(eror,row)=>{
          console.log(row);
          var sql= "INSERT INTO player (playerno,gameid,name,socket) VALUES (?,?,?,?)";
          db.run(sql,[1,row.gameid,data.name,socket.id]);
          db.run(sql, [2,row.gameid, "", ""]);
          db.run(sql, [3,row.gameid, "", ""]);
          db.run(sql, [4,row.gameid, "", ""]);
          socket.emit("gameid",row.gameid);
        });
        
      }
    });
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



server.listen(3001, () => {
  console.log("server working");
});
