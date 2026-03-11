const multer = require("multer");
const path = require("path");
const { UPLOAD_DIR } = require("../config/paths");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase() || ".jpg";
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
      return;
    }

    cb(new Error("Solo se permiten archivos de imagen."));
  },
});

const uploadSingleImage = upload.single("imageFile");

module.exports = {
  upload,
  uploadSingleImage,
};
