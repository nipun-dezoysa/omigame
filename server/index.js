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
    var roomid = randomstring
      .generate({
        length: 5,
        charset: "alphabetic",
      })
      .toUpperCase();
    db.run("INSERT INTO room VALUES (?,?,?)", [roomid,"",socket.id], (err) => {
      if (err) console.log(err);
      else {
        socket.join(roomid);
        var sql =
          "INSERT INTO player (playerno,roomid,name,socket) VALUES (?,?,?,?)";
        db.run(sql, [0, roomid, data.name, socket.id]);
        db.run(sql, [0, roomid, "", ""]);
        db.run(sql, [0, roomid, "", ""]);
        db.run(sql, [0, roomid, "", ""]);
        socket.emit("admin", true);
        socket.emit("room",roomid);
      }
    });
  });
  socket.on("join_room", (data) => {
    db.get("SELECT * FROM player where roomid=? AND playerno=0 AND name=''", [data.room], (err, row) => {
      if(row){
        var sql = "UPDATE player SET name=? , socket=? WHERE playerid=?";
        db.run(sql, [data.name,socket.id,row.playerid]);
        socket.join(data.room);
        db.all("SELECT playerno,name,socket FROM player WHERE socket!=? AND roomid=?",[socket.id,data.room],(eror,rowss)=>{
           socket.emit("slots", rowss);
           socket.emit("room", data.room);
        })
      }else{
        socket.emit("error", "Room is full");
        console.log("no");
      }
    });
    
  });

  socket.on("slot_push", ({ status, slot, roomid, name }) => {
    var sql = "UPDATE player SET playerno=? WHERE socket=?";
    if (status == 1) {
      db.run(sql, [slot, socket.id]);
    } else {
      db.run(sql, [0, socket.id]);
    }
    socket.to(roomid).emit("slot_pull", {status, slot, name});
  });

  socket.on("game_start", ({roomid}) => {
    db.get("SELECT * FROM room WHERE roomid=? AND admin=?",[roomid,socket.id],(err,row)=>{
      if(!err){
        if(row){
          db.run("INSERT INTO game (roomid) VALUES(?)",[roomid]);
          db.get("SELECT * FROM game WHERE roomid=? ORDER BY gameid DESC",[roomid],(error,rows)=>{
            console.log(rows);
          })
        }
      }else console.log(err);
    });
  });

  socket.on("disconnecting", () => {
    db.get("SELECT * FROM player WHERE socket=?",[socket.id],(err,row)=>{
    if(row){socket.to(row.roomid).emit("slot_pull", { status:0, slot:row.playerno, name:row.name });}
    });
    var sql = "UPDATE player SET playerno=0 , name='', socket='' WHERE socket=?";
    db.run(sql, [socket.id]);
    console.log(socket.id); // the Set contains at least the socket ID
  });
});

function game(gameid,roomid){
var roundid;
db.get("SELECT * FROM round WHERE gameid=? ORDER BY roundid DESC",[gameid],(err,row)=>{
  
})
}

server.listen(3001, () => {
  console.log("server working");
});
