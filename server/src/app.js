const express = require("express");
const cors = require("cors");
const { UPLOAD_DIR } = require("./config/paths");
const { systemRouter } = require("./routes/systemRoutes");
const { piecesRouter } = require("./routes/piecesRoutes");
const { errorHandler } = require("./middlewares/errorHandler");

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use("/uploads", express.static(UPLOAD_DIR));

  app.use("/api", systemRouter);
  app.use("/api", piecesRouter);

  app.use(errorHandler);

  return app;
}

module.exports = {
  createApp,
};
