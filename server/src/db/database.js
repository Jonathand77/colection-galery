const sqlite3 = require("sqlite3").verbose();
const { DB_PATH } = require("../config/paths");

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Error abriendo base de datos:", err.message);
  } else {
    console.log("SQLite conectada en", DB_PATH);
  }
});

module.exports = {
  db,
};
