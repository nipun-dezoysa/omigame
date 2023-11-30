const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
var db = require("./database.js");
var randomstring = require("randomstring");
const { start } = require("repl");
const { log } = require("console");

const cards = [
  { type: "h", val: 14 },
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
var usercount = 0;
app.use(cors());
const server = http.createServer(app);
const io = new socket.Server(server, { cors: { origin: '*' } });

io.on("connection", (socket) => {
  console.log("user: " + socket.id);
  usercount++;
  io.emit("usercount", usercount);
  socket.on("roomdetails", (data) => {
    db.get("SELECT * FROM room WHERE roomid=?", [data.roomid], (err, row) => {
      if (row) {
        socket.emit("roomdet", { status: true });
      } else {
        socket.emit("roomdet", { status: false });
      }
    });
  });
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
          socket.emit("logged", { status: true, roomid });
        }
      }
    );
  });
  socket.on("join_room", (data) => {
    console.log("aaaa");
    db.get("SELECT * FROM room WHERE roomid=?", [data.room], (ers, rws) => {
      if (rws) {
        db.get(
          "SELECT * FROM player where roomid=? AND name=''",
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
                  socket.emit("logged", { status: true, roomid: data.room });
                }
              );
            } else {
              socket.emit("logged", { status: false, type: 2 });
              console.log("no", data.room);
            }
          }
        );
      } else {
        socket.emit("logged", { status: false, type: 1 });
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
    socket.to(roomid).emit("slot_pull", { status, slot, name });
  });

  socket.on("game_start", ({ roomid }) => {
    db.get(
      "SELECT * FROM room WHERE roomid=? AND admin=?",
      [roomid, socket.id],
      (err, row) => {
        if (!err) {
          if (row) {
            db.run(
              "INSERT INTO game (roomid,team0,team1) VALUES(?,?,?)",
              [roomid, 0, 0],
              (err) => {
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
            );
          }
        } else console.log(err);
      }
    );
  });

  socket.on("thurumpu", ({ thurumpu, roundid, roomid, slot }) => {
    db.run("UPDATE round SET thurumpu=? WHERE roundid=?", [thurumpu, roundid]);
    socket.to(roomid).emit("game_status", { status: "thurumpu", thurumpu });
    for (var i = 1; i < 5; i++) {
      if (i == slot) continue;
      sendAtha(roundid, roomid, i, 1);
    }
    for (var i = 1; i < 5; i++) {
      sendAtha(roundid, roomid, i, 2);
      io.in(roomid).emit("game_status", {
        status: "throwing",
      });
    }
    io.in(roomid).emit("slot_cards", [
      {
        count: 8,
        slot: 1,
      },
      {
        count: 8,
        slot: 2,
      },
      {
        count: 8,
        slot: 3,
      },
      {
        count: 8,
        slot: 4,
      },
    ]);
    io.in(roomid).emit("throw_card", slot);
  });

  socket.on("place_card", ({ card, slot, roomid, roundid }) => {
    db.get(
      "SELECT * FROM card WHERE roundid=? AND playerno=? AND type=? AND value=?",
      [roundid, slot, card.type, card.value],
      (err, row) => {
        if (row) {
          db.run(
            "DELETE FROM card WHERE roundid=? AND playerno=? AND type=? AND value=?",
            [roundid, slot, card.type, card.value]
          );
          socket.to(roomid).emit("player_place_card", {
            slot,
            type: card.type,
            value: card.value,
          });
          db.get(
            "SELECT * FROM subround WHERE roundid=? AND winner='' ORDER BY subroundid DESC",
            [roundid],
            (error, rows) => {
              if (error) console.log(error);
              if (rows) {
                db.run(
                  "INSERT INTO hand(subroundid,playerno,type,value) VALUES (?,?,?,?)",
                  [rows.subroundid, slot, card.type, card.value]
                );
                db.all(
                  "SELECT * FROM hand WHERE subroundid=?",
                  [rows.subroundid],
                  (errss, rowss) => {
                    if (rowss.length < 4) {
                      var a = slot + 1 > 4 ? 1 : slot + 1;
                      io.in(roomid).emit("throw_card", a);
                    } else {
                      db.get(
                        "SELECT * FROM round WHERE roundid=?",
                        [roundid],
                        (errsss, rowsss) => {
                          var wasiya = rowss[0];
                          for (var i = 1; i < 4; i++) {
                            if (rowss[i].type == wasiya.type) {
                              if (rowss[i].value > wasiya.value) {
                                wasiya = rowss[i];
                              }
                            } else {
                              if (rowss[i].type == rowsss.thurumpu) {
                                wasiya = rowss[i];
                              }
                            }
                          }
                          var winner = wasiya.playerno % 2;
                          db.run(
                            "UPDATE subround SET winner=? WHERE subroundid=?",
                            [winner, rows.subroundid]
                          );
                          gameEnd(
                            roomid,
                            roundid,
                            rows.subroundid,
                            winner,
                            wasiya.playerno
                          );
                        }
                      );
                    }
                  }
                );
              } else {
                db.run("INSERT INTO subround(roundid,winner) VALUES(?,?)", [
                  roundid,
                  "",
                ]);
                db.get(
                  "SELECT * FROM subround WHERE roundid=? AND winner='' ORDER BY subroundid DESC",
                  [roundid],
                  (errss, rowss) => {
                    if (rowss) {
                      db.run(
                        "INSERT INTO hand(subroundid,playerno,type,value) VALUES (?,?,?,?)",
                        [rowss.subroundid, slot, card.type, card.value]
                      );
                      var a = slot + 1 > 4 ? 1 : slot + 1;
                      io.in(roomid).emit("throw_card", a);
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });
  socket.on("userrest", () => {
    userReset(socket);
  });
  socket.on("disconnecting", () => {
    usercount--;
    io.emit("usercount", usercount);
    userReset(socket);
    console.log(socket.id); // the Set contains at least the socket ID
  });
});

function userReset(socket) {
  db.get("SELECT * FROM player WHERE socket=?", [socket.id], (err, row) => {
    if (row) {
      db.run(
        "UPDATE player SET playerno=0 , name='', socket='' WHERE socket=?",
        [socket.id]
      );
      socket
        .to(row.roomid)
        .emit("slot_pull", { status: 0, slot: row.playerno, name: row.name });
      db.all(
        "SELECT * FROM player WHERE roomid=? AND socket!=''",
        [row.roomid],
        (error, rows) => {
          if (rows.length == 0) {
            db.run("DELETE FROM room WHERE roomid=?", [row.roomid]);
          } else {
            db.get(
              "SELECT admin FROM room WHERE roomid=?",
              [row.roomid],
              (rerr, rrow) => {
                if (rrow) {
                  if (rrow.admin == socket.id) {
                    db.run("UPDATE room SET admin=? WHERE roomid=?", [
                      rows[0].socket,
                      row.roomid,
                    ]);
                    io.to(rows[0].socket).emit("admin", true);
                  }
                }
              }
            );
          }
        }
      );
    }
  });
}

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
                io.to(row.socket).emit("cards", rows);
                // console.log(row);
              }
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
          [gameid, 0, "", thowner]
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
                            io.in(roomid).emit("slot_cards", [
                              {
                                count: 4,
                                slot: thowner,
                              },
                            ]);
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

function gameEnd(roomid, roundid, subroundid, winner, slot) {
  db.all(
    "SELECT winner,COUNT(*) AS num FROM subround WHERE roundid=? GROUP BY winner",
    [roundid],
    (err, row) => {
      if (row) {
        var a = 0;
        var b = 0;
        for (var i = 0; i < row.length; i++) {
          if (row[i].winner == winner) a = row[i].num;
          else b = row[i].num;
        }
        //4
        if (a > 4 || (a == 4 && b == 4)) {
          db.get(
            "SELECT * FROM round WHERE roundid=?",
            [roundid],
            (errs, rows) => {
              //4
              if (a == 4) {
                //seporu
                db.run("UPDATE round SET winner=? WHERE roundid=?", [
                  3,
                  roundid,
                ]);
                io.to(roomid).emit("result", {
                  status: "seporu",
                });
                game(rows.gameid, roomid);
              } else {
                db.run("UPDATE round SET winner=? WHERE roundid=?", [
                  winner,
                  roundid,
                ]);
                db.get(
                  "SELECT * FROM round WHERE roundid!=? AND gameid=? ORDER BY roundid DESC",
                  [roundid, rows.gameid],
                  (errss, rowss) => {
                    if (!errss) {
                      var points = 0;
                      var winType = 1;
                      if (winner == rows.thowner % 2) {
                        points = 1;
                        if (rowss) {
                          if (rowss.winner == 3) {
                            points = 2;
                            winType = 3;
                          }
                        }
                      } else {
                        points = 2;
                        winType = 2;
                      }
                      db.get(
                        "SELECT * FROM game WHERE gameid=?",
                        [rows.gameid],
                        (errsss, rowsss) => {
                          var sql;
                          var marks;
                          var other;
                          if (winner == 0) {
                            sql = "UPDATE game SET team0=? WHERE gameid=?";
                            marks = rowsss.team0 + points;
                            other = rowsss.team1;
                          } else {
                            sql = "UPDATE game SET team1=? WHERE gameid=?";
                            marks = rowsss.team1 + points;
                            other = rowsss.team0;
                          }
                          db.run(sql, [marks, rows.gameid]);
                          //10
                          if (marks >= 2) {
                            //win full game
                            console.log("won the full game");
                            io.to(roomid).emit("result", {
                              status: "game",
                              winner,
                              a: marks,
                              b: other,
                              winType,
                            });
                          } else {
                            //win round
                            io.to(roomid).emit("result", {
                              status: "round",
                              winner,
                              a: marks,
                              b: other,
                              winType,
                            });
                            game(rows.gameid, roomid);
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        } else {
          //subround win
          io.to(roomid).emit("result", { status: "sub", winner, a, b, slot });
          // io.in(roomid).emit("throw_card", slot);
        }
      }
    }
  );
}

server.listen(3001, () => {
  console.log("server working");
});
