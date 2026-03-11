const express = require("express");
const { getCategories, getHealth } = require("../controllers/systemController");

const systemRouter = express.Router();

systemRouter.get("/health", getHealth);
systemRouter.get("/categories", getCategories);

module.exports = {
  systemRouter,
};
