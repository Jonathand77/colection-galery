const { db } = require("./database");

function seedData() {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO pieces (title, category, collection, artist, year, description, imageUrl, location, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const seeds = [
    [
      "Samurái de Resina Edición Limitada",
      "Figuras",
      "Colección Imperial",
      "Atelier Kuro",
      2021,
      "Figura de resina pintada a mano con base metálica pulida.",
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1200&q=80",
      "Vitrina principal",
      now,
      now,
    ],
    [
      "Horizonte Dorado",
      "Cuadros",
      "Serie Firmados",
      "L. Ferrara",
      2018,
      "Óleo sobre lienzo con firma original y certificado de autenticidad.",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
      "Muro norte",
      now,
      now,
    ],
    [
      "Afiche Retro Festival 79",
      "Pósters",
      "Archivo Vintage",
      "Studio Armonía",
      1979,
      "Póster restaurado en marco negro mate con cristal antirreflejo.",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      "Pasillo lateral",
      now,
      now,
    ],
  ];

  for (const item of seeds) {
    stmt.run(item);
  }

  stmt.finalize();
}

function initDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS pieces (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        collection TEXT NOT NULL,
        artist TEXT,
        year INTEGER,
        description TEXT,
        imageUrl TEXT NOT NULL,
        location TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `);

    db.get("SELECT COUNT(*) AS total FROM pieces", (err, row) => {
      if (err) {
        console.error("Error consultando conteo inicial:", err.message);
        return;
      }

      if (row.total === 0) {
        seedData();
      }
    });
  });
}

module.exports = {
  initDatabase,
};
