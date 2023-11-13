const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
var db = require("./database.js");
var randomstring = require("randomstring");
const { start } = require("repl");

const cards = [
  { type: "h", val: 14},
  { type: "h", val: 7 },
  { type: "h", val: 8 },
  { type: "h", val: 9 },
  { type: "h", val: 10 },
  { type: "h", val: 11 },
  { type: "h", val: 12 },
  { type: "h", val: 13 },
  { type: "c", val: 14 },
  { type: "c", val: 7 },
  { type: "c", val: 8 },
  { type: "c", val: 9 },
  { type: "c", val: 10 },
  { type: "c", val: 11 },
  { type: "c", val: 12 },
  { type: "c", val: 13 },
  { type: "s", val: 14 },
  { type: "s", val: 7 },
  { type: "s", val: 8 },
  { type: "s", val: 9 },
  { type: "s", val: 10 },
  { type: "s", val: 11 },
  { type: "s", val: 12 },
  { type: "s", val: 13 },
  { type: "d", val: 14 },
  { type: "d", val: 7 },
  { type: "d", val: 8 },
  { type: "d", val: 9 },
  { type: "d", val: 10 },
  { type: "d", val: 11 },
  { type: "d", val: 12 },
  { type: "d", val: 13 },
];

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
    db.run(
      "INSERT INTO room VALUES (?,?,?)",
      [roomid, "", socket.id],
      (err) => {
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
          socket.emit("room", roomid);
        }
      }
    );
  });
  socket.on("join_room", (data) => {
    db.get(
      "SELECT * FROM player where roomid=? AND playerno=0 AND name=''",
      [data.room],
      (err, row) => {
        if (row) {
          var sql = "UPDATE player SET name=? , socket=? WHERE playerid=?";
          db.run(sql, [data.name, socket.id, row.playerid]);
          socket.join(data.room);
          db.all(
            "SELECT playerno,name,socket FROM player WHERE socket!=? AND roomid=?",
            [socket.id, data.room],
            (eror, rowss) => {
              socket.emit("slots", rowss);
              socket.emit("room", data.room);
            }
          );
        } else {
          socket.emit("error", "Room is full");
          console.log("no");
        }
      }
    );
  });

  socket.on("slot_push", ({ status, slot, roomid, name }) => {
    var sql = "UPDATE player SET playerno=? WHERE socket=?";
    if (status == 1) {
      db.run(sql, [slot, socket.id]);
    } else {
      db.run(sql, [0, socket.id]);
    }
    socket.to(roomid).emit("slot_pull", { status, slot, name });
  });

  socket.on("game_start", ({ roomid }) => {
    db.get(
      "SELECT * FROM room WHERE roomid=? AND admin=?",
      [roomid, socket.id],
      (err, row) => {
        if (!err) {
          if (row) {
            db.run("INSERT INTO game (roomid) VALUES(?)", [roomid]);
            db.get(
              "SELECT * FROM game WHERE roomid=? ORDER BY gameid DESC",
              [roomid],
              (error, rows) => {
                io.in(roomid).emit("game_status", {
                  status: "gamestart",
                  gameid: rows.gameid,
                });
                game(rows.gameid, roomid);
              }
            );
          }
        } else console.log(err);
      }
    );
  });

  socket.on("thurumpu", ({ thurumpu, roundid, roomid }) => {
    db.run("UPDATE round SET thurumpu=? WHERE roundid=?", [thurumpu, roundid]);
    socket.to(roomid).emit("game_status", { status: "thurumpu", thurumpu });
    for (var i = 2; i < 5; i++) {
      sendAtha(roundid, roomid, i, 1);
    }
    for (var i = 1; i < 5; i++) {
      sendAtha(roundid, roomid, i, 2);
    }
  });

  socket.on("disconnecting", () => {
    db.get("SELECT * FROM player WHERE socket=?", [socket.id], (err, row) => {
      if (row) {
        socket
          .to(row.roomid)
          .emit("slot_pull", { status: 0, slot: row.playerno, name: row.name });
      }
    });
    var sql =
      "UPDATE player SET playerno=0 , name='', socket='' WHERE socket=?";
    db.run(sql, [socket.id]);
    console.log(socket.id); // the Set contains at least the socket ID
  });
});

function sendAtha(roundid, roomid, playerno, atha) {
  // console.log("send atha");
  var sql;
  if (atha == 1)
    sql =
      "SELECT type,value FROM card WHERE playerno=? AND roundid=? ORDER BY cardid ASC LIMIT 4";
  else
    sql =
      "SELECT type,value FROM card WHERE playerno=? AND roundid=? ORDER BY cardid DESC LIMIT 4";
  db.all(sql, [playerno, roundid], (err, rows) => {
    if (err) console.log(err);
    else {
      if (rows) {
        db.get(
          "SELECT socket FROM player WHERE playerno=? AND roomid=?",
          [playerno, roomid],
          (error, row) => {
            if (error) console.log(error);
            else {
              if (row) {
                console.log(rows);
                io.to(row.socket).emit("cards", rows);
                io.in(roomid).emit("slot_cards", {
                  status: 1,
                  count: 4,
                  slot: playerno,
                });
                // console.log(row);
              } else console.log("gg");
            }
          }
        );
      } else console.log("ffff");
    }
  });
}

function game(gameid, roomid) {
  var roundid;
  var thowner = 1;
  db.get(
    "SELECT * FROM round WHERE gameid=? ORDER BY roundid DESC",
    [gameid],
    (error, rowws) => {
      if (error) console.log(error);
      else {
        if (rowws) {
          if (rowws.thowner == 4) thowner = 1;
          else thowner = rowws.thowner + 1;
        }
        var selection = [...cards];
        var cardOwner = thowner;
        db.run(
          "INSERT INTO round (gameid,winner,thurumpu,thowner) VALUES (?,?,?,?)",
          [gameid, "", "", thowner]
        );
        db.get(
          "SELECT * FROM round WHERE gameid=? ORDER BY roundid DESC",
          [gameid],
          (err, row) => {
            if (err) console.log(err);
            else {
              if (row) {
                roundid = row.roundid;
                io.in(roomid).emit("game_status", {
                  status: "roundstart",
                  roundid,
                });
                for (let i = 1; i < 33; i++) {
                  var randNum = Math.floor(Math.random() * selection.length);
                  db.run(
                    "INSERT INTO card (roundid,playerno,type,value) VALUES (?,?,?,?)",
                    [
                      roundid,
                      cardOwner,
                      selection[randNum].type,
                      selection[randNum].val,
                    ]
                  );
                  selection.splice(randNum, 1);
                  if (i % 4 == 0) {
                    if (cardOwner == 4) cardOwner = 1;
                    else cardOwner++;
                  }
                }
                db.all(
                  "SELECT type,value FROM card WHERE playerno=? AND roundid=? ORDER BY cardid ASC LIMIT 4",
                  [thowner, roundid],
                  (errd, rowd) => {
                    if (!errd) {
                      db.get(
                        "SELECT * FROM player WHERE playerno=? AND roomid=?",
                        [thowner, roomid],
                        (errsd, rowsd) => {
                          if (rowsd) {
                            io.to(rowsd.socket).emit("cards", rowd);
                            io.in(roomid).emit("slot_cards", {
                              status: 1,
                              count: 4,
                              slot: thowner,
                            });
                            io.in(roomid).emit("game_status", {
                              status: "thowner",
                              slot: thowner,
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          }
        );
      }
    }
  );
}

server.listen(3001, () => {
  console.log("server working");
});
