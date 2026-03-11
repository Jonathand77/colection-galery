function GalleryHeader({ totalPieces, totalCollections, totalCategories }) {
  return (
    <header className="hero">
      <div className="hero-topbar">
        <div>
          <p className="hero-label">Colection Galery</p>
          <p className="hero-kicker">Curaduría privada</p>
        </div>
        <span className="hero-badge">Edición Museo</span>
      </div>

      <div className="hero-main">
        <div className="hero-copy">
          <h1>Galería de Colecciones</h1>
          <p className="hero-subtitle">
            Gestiona y exhibe figuras, cuadros firmados, pósters y esculturas con una presencia visual más profesional.
          </p>

          <div className="hero-stats">
            <article>
              <strong>{totalPieces}</strong>
              <span>Piezas</span>
            </article>
            <article>
              <strong>{totalCollections}</strong>
              <span>Colecciones</span>
            </article>
            <article>
              <strong>{totalCategories}</strong>
              <span>Categorías</span>
            </article>
          </div>
        </div>

        <div className="hero-image-card">
          <img
            src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80"
            alt="Sala de exposición moderna"
          />
        </div>
      </div>

      <div className="hero-banners">
        <article>
          <h3>Curaduría Inteligente</h3>
          <p>Organiza por categoría, colección y artista con filtros listos para exhibición.</p>
        </article>
        <article>
          <h3>Archivo Visual</h3>
          <p>Conserva cada pieza con imagen, descripción y detalles clave para tu inventario premium.</p>
        </article>
      </div>
    </header>
  )
}

export default GalleryHeader
