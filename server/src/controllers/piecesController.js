const { db } = require("../db/database");
const { mapRow } = require("../utils/pieceMapper");
const { deleteLocalUpload, uploadedFileUrl } = require("../utils/fileUtils");

function parsePieceFields(req) {
  return {
    title: req.body.title,
    category: req.body.category,
    collection: req.body.collection,
    artist: req.body.artist,
    year: req.body.year,
    description: req.body.description,
    location: req.body.location,
  };
}

function resolveImageUrl(req, existingImageUrl = "") {
  const uploaded = uploadedFileUrl(req.file);
  if (uploaded) return uploaded;

  if (typeof req.body.imageUrl === "string" && req.body.imageUrl.trim()) {
    return req.body.imageUrl.trim();
  }

  return existingImageUrl;
}

function hasRequiredFields(fields, imageUrl) {
  return Boolean(fields.title && fields.category && fields.collection && imageUrl);
}

function rollbackUploadedFile(req) {
  const uploaded = uploadedFileUrl(req.file);
  if (uploaded) deleteLocalUpload(uploaded);
}

function getPieces(req, res) {
  const { category, search } = req.query;
  const filters = [];
  const params = [];

  if (category && category !== "Todas") {
    filters.push("category = ?");
    params.push(category);
  }

  if (search) {
    filters.push("(title LIKE ? OR collection LIKE ? OR artist LIKE ?)");
    const term = `%${search}%`;
    params.push(term, term, term);
  }

  const whereClause = filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";
  const query = `SELECT * FROM pieces ${whereClause} ORDER BY updatedAt DESC`;

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "No se pudieron cargar las piezas." });
    }

    return res.json(rows.map(mapRow));
  });
}

function getPieceById(req, res) {
  const id = Number(req.params.id);

  db.get("SELECT * FROM pieces WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "No se pudo cargar la pieza." });
    }

    if (!row) {
      return res.status(404).json({ error: "Pieza no encontrada." });
    }

    return res.json(mapRow(row));
  });
}

function createPiece(req, res) {
  const fields = parsePieceFields(req);
  const imageUrl = resolveImageUrl(req);

  if (!hasRequiredFields(fields, imageUrl)) {
    rollbackUploadedFile(req);
    return res.status(400).json({ error: "title, category, collection e imageUrl/imageFile son obligatorios." });
  }

  const now = new Date().toISOString();

  db.run(
    `
      INSERT INTO pieces (title, category, collection, artist, year, description, imageUrl, location, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      fields.title,
      fields.category,
      fields.collection,
      fields.artist || null,
      fields.year || null,
      fields.description || null,
      imageUrl,
      fields.location || null,
      now,
      now,
    ],
    function onInsert(err) {
      if (err) {
        rollbackUploadedFile(req);
        return res.status(500).json({ error: "No se pudo crear la pieza." });
      }

      db.get("SELECT * FROM pieces WHERE id = ?", [this.lastID], (getErr, row) => {
        if (getErr) {
          return res.status(500).json({ error: "Pieza creada, pero no se pudo recuperar." });
        }

        return res.status(201).json(mapRow(row));
      });
    }
  );
}

function updatePiece(req, res) {
  const id = Number(req.params.id);

  db.get("SELECT * FROM pieces WHERE id = ?", [id], (fetchErr, existing) => {
    if (fetchErr) {
      rollbackUploadedFile(req);
      return res.status(500).json({ error: "No se pudo cargar la pieza para editar." });
    }

    if (!existing) {
      rollbackUploadedFile(req);
      return res.status(404).json({ error: "Pieza no encontrada." });
    }

    const fields = parsePieceFields(req);
    const imageUrl = resolveImageUrl(req, existing.imageUrl);

    if (!hasRequiredFields(fields, imageUrl)) {
      rollbackUploadedFile(req);
      return res.status(400).json({ error: "title, category, collection e imageUrl/imageFile son obligatorios." });
    }

    const now = new Date().toISOString();

    db.run(
      `
        UPDATE pieces
        SET title = ?, category = ?, collection = ?, artist = ?, year = ?, description = ?, imageUrl = ?, location = ?, updatedAt = ?
        WHERE id = ?
      `,
      [
        fields.title,
        fields.category,
        fields.collection,
        fields.artist || null,
        fields.year || null,
        fields.description || null,
        imageUrl,
        fields.location || null,
        now,
        id,
      ],
      function onUpdate(err) {
        if (err) {
          rollbackUploadedFile(req);
          return res.status(500).json({ error: "No se pudo actualizar la pieza." });
        }

        if (this.changes === 0) {
          rollbackUploadedFile(req);
          return res.status(404).json({ error: "Pieza no encontrada." });
        }

        if (req.file && existing.imageUrl !== imageUrl) {
          deleteLocalUpload(existing.imageUrl);
        }

        db.get("SELECT * FROM pieces WHERE id = ?", [id], (getErr, row) => {
          if (getErr) {
            return res.status(500).json({ error: "Pieza actualizada, pero no se pudo recuperar." });
          }

          return res.json(mapRow(row));
        });
      }
    );
  });
}

function deletePiece(req, res) {
  const id = Number(req.params.id);

  db.get("SELECT * FROM pieces WHERE id = ?", [id], (fetchErr, row) => {
    if (fetchErr) {
      return res.status(500).json({ error: "No se pudo cargar la pieza." });
    }

    if (!row) {
      return res.status(404).json({ error: "Pieza no encontrada." });
    }

    db.run("DELETE FROM pieces WHERE id = ?", [id], function onDelete(err) {
      if (err) {
        return res.status(500).json({ error: "No se pudo eliminar la pieza." });
      }

      deleteLocalUpload(row.imageUrl);
      return res.json({ deleted: true, id });
    });
  });
}

module.exports = {
  getPieces,
  getPieceById,
  createPiece,
  updatePiece,
  deletePiece,
};
