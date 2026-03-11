function GalleryToolbar({ searchTerm, onSearchChange, onAddClick }) {
  return (
    <section className="toolbar">
      <div className="search-block">
        <label htmlFor="search">Buscar</label>
        <input
          id="search"
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Título, colección o artista"
        />
      </div>

      <div className="actions">
        <button className="btn-primary" onClick={onAddClick}>
          Añadir pieza
        </button>
      </div>
    </section>
  )
}

export default GalleryToolbar
