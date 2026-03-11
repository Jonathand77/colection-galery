const { categories } = require("../config/categories");

function getHealth(_req, res) {
  return res.json({ ok: true });
}

function getCategories(_req, res) {
  return res.json({ categories });
}

module.exports = {
  getHealth,
  getCategories,
};
