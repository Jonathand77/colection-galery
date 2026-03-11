const multer = require("multer");

function errorHandler(err, _req, res, _next) {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: "Error en la carga de archivo. Verifica tamaño máximo 5MB." });
  }

  if (err) {
    return res.status(400).json({ error: err.message || "Solicitud inválida." });
  }

  return res.status(500).json({ error: "Error no controlado." });
}

module.exports = {
  errorHandler,
};
