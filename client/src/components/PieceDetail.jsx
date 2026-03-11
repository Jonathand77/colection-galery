import { resolveImageUrl } from '../services/galleryApi'

function PieceDetail({ piece, onEdit, onDelete }) {
  if (!piece) {
    return (
      <aside className="detail-panel">
        <div className="empty-detail">
          <h2>Selecciona una pieza</h2>
          <p>Haz clic sobre una card para ver su información detallada.</p>
        </div>
      </aside>
    )
  }

  return (
    <aside className="detail-panel">
      <img src={resolveImageUrl(piece.imageUrl)} alt={piece.title} className="detail-image" />
      <p className="detail-category">{piece.category}</p>
      <h2>{piece.title}</h2>
      <p className="detail-collection">Colección: {piece.collection}</p>
      <p>{piece.description || 'Sin descripción disponible.'}</p>

      <dl>
        <div>
          <dt>Artista</dt>
          <dd>{piece.artist || 'No indicado'}</dd>
        </div>
        <div>
          <dt>Año</dt>
          <dd>{piece.year || 'No indicado'}</dd>
        </div>
        <div>
          <dt>Ubicación</dt>
          <dd>{piece.location || 'No indicada'}</dd>
        </div>
      </dl>

      <div className="detail-actions">
        <button className="btn-outline" onClick={() => onEdit(piece)}>
          Editar pieza
        </button>
        <button className="btn-danger" onClick={() => onDelete(piece)}>
          Eliminar
        </button>
      </div>
    </aside>
  )
}

export default PieceDetail
