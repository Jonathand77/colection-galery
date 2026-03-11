function mapRow(row) {
  if (!row) return null;

  return {
    id: row.id,
    title: row.title,
    category: row.category,
    collection: row.collection,
    artist: row.artist,
    year: row.year,
    description: row.description,
    imageUrl: row.imageUrl,
    location: row.location,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

module.exports = {
  mapRow,
};
