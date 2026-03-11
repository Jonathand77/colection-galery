const path = require("path");
const fs = require("fs");

const ROOT_DIR = path.join(__dirname, "..", "..");
const DB_PATH = path.join(ROOT_DIR, "gallery.db");
const UPLOAD_DIR = path.join(ROOT_DIR, "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

module.exports = {
  ROOT_DIR,
  DB_PATH,
  UPLOAD_DIR,
};
