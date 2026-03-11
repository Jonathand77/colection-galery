function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="footer-grid">
        <div>
          <p className="footer-brand">Colection Galery</p>
          <p className="footer-text">Gestión elegante de colecciones privadas con estilo curatorial profesional.</p>
        </div>

        <div>
          <p className="footer-title">Secciones</p>
          <p className="footer-text">Galería · Filtros · Detalle · Edición</p>
        </div>

        <div>
          <p className="footer-title">Estado</p>
          <p className="footer-text">Sistema activo para inventario y exhibición</p>
        </div>
      </div>

      <p className="footer-copy">© {new Date().getFullYear()} Colection Galery — Diseño tipo museo</p>
    </footer>
  )
}

export default AppFooter
