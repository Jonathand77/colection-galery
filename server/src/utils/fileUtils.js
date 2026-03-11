const fs = require("fs");
const path = require("path");
const { ROOT_DIR } = require("../config/paths");

function isLocalUpload(imageUrl) {
  return typeof imageUrl === "string" && imageUrl.startsWith("/uploads/");
}

function deleteLocalUpload(imageUrl) {
  if (!isLocalUpload(imageUrl)) return;

  const absolutePath = path.join(ROOT_DIR, imageUrl.replace(/^\//, ""));

  fs.unlink(absolutePath, (err) => {
    if (err && err.code !== "ENOENT") {
      console.warn("No se pudo eliminar archivo local:", absolutePath);
    }
  });
}

function uploadedFileUrl(file) {
  if (!file) return "";
  return `/uploads/${file.filename}`;
}

module.exports = {
  isLocalUpload,
  deleteLocalUpload,
  uploadedFileUrl,
};
