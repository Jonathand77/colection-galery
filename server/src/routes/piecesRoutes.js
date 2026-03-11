const express = require("express");
const {
  getPieces,
  getPieceById,
  createPiece,
  updatePiece,
  deletePiece,
} = require("../controllers/piecesController");
const { uploadSingleImage } = require("../middlewares/upload");

const piecesRouter = express.Router();

piecesRouter.get("/pieces", getPieces);
piecesRouter.get("/pieces/:id", getPieceById);
piecesRouter.post("/pieces", uploadSingleImage, createPiece);
piecesRouter.put("/pieces/:id", uploadSingleImage, updatePiece);
piecesRouter.delete("/pieces/:id", deletePiece);

module.exports = {
  piecesRouter,
};
