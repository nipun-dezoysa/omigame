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
      `CREATE TABLE game (
            gameid INTEGER PRIMARY KEY AUTOINCREMENT,
            roomid text
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
            gameid text,
            name text,
            socket text
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
