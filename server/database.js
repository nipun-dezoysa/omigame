var sqlite3 = require("sqlite3").verbose();
const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE room (
            roomid text PRIMARY KEY,
            password text,
            admin text
            )`,
      (err) => {
        if (err) {
          // Table already created
          // console.log(err);
        }
      }
    );
    db.run(
      `CREATE TABLE game (
            gameid INTEGER PRIMARY KEY AUTOINCREMENT,
            roomid text,
            FOREIGN KEY (roomid) REFERENCES room(roomid)
            )`,
      (err) => {
        if (err) {
          // Table already created
          // console.log(err);
        }
      }
    );
    db.run(
      `CREATE TABLE player (
            playerid INTEGER PRIMARY KEY AUTOINCREMENT,
            playerno INTEGER,
            roomid text,
            name text,
            socket text,
            FOREIGN KEY (roomid) REFERENCES room(roomid)
            )`,
      (err) => {
        if (err) {
          //  console.log(err);
        }
      }
    );
    db.run(
      `CREATE TABLE round (
            roundid INTEGER PRIMARY KEY AUTOINCREMENT,
            roundno INTEGER,
            gameid INTEGER,
            winner text,
            thurumpu text,
            FOREIGN KEY (gameid) REFERENCES game(gameid)
            )`,
      (err) => {
        if (err) {
          //  console.log(err);
        }
      }
    );
    db.run(
      `CREATE TABLE card (
            cardid INTEGER PRIMARY KEY AUTOINCREMENT,
            roundid INTEGER,
            playerid INTEGER,
            type text,
            value INTEGER,
            FOREIGN KEY (playerid) REFERENCES player(playerid),
            FOREIGN KEY (roundid) REFERENCES round(roundid)
            )`,
      (err) => {
        if (err) {
          //  console.log(err);
        }
      }
    );
    db.run(
      `CREATE TABLE subround (
            subroundid INTEGER PRIMARY KEY AUTOINCREMENT,
            subroundno INTEGER,
            roundid INTEGER,
            winner text,
            FOREIGN KEY (roundid) REFERENCES game(roundid)
            )`,
      (err) => {
        if (err) {
          //  console.log(err);
        }
      }
    );
    db.run(
      `CREATE TABLE hand (
            cardid INTEGER PRIMARY KEY AUTOINCREMENT,
            subroundid INTEGER,
            playerid INTEGER,
            type text,
            value INTEGER,
            FOREIGN KEY (playerid) REFERENCES player(playerid),
            FOREIGN KEY (subroundid) REFERENCES subround(subroundid)
            )`,
      (err) => {
        if (err) {
          //  console.log(err);
        }
      }
    );
  }
});

module.exports = db;
