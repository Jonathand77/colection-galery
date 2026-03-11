import { resolveImageUrl } from '../services/galleryApi'

function PieceGrid({ pieces, isLoading, onViewPiece, onEditPiece, onDeletePiece }) {
  function handleCardClick(piece) {
    onViewPiece(piece)
  }

  function onActionClick(event, callback, piece) {
    event.stopPropagation()
    callback(piece)
  }

  return (
    <div className="gallery-grid">
      {isLoading && <p className="status-msg">Cargando piezas...</p>}
      {!isLoading && pieces.length === 0 && <p className="status-msg">No hay piezas para este filtro.</p>}

      {pieces.map((piece) => (
        <article key={piece.id} className="art-card" onClick={() => handleCardClick(piece)}>
          <div className="image-wrap">
            <img src={resolveImageUrl(piece.imageUrl)} alt={piece.title} loading="lazy" />

            <div className="card-actions-overlay">
              <button className="card-action view" onClick={(event) => onActionClick(event, onViewPiece, piece)} type="button">
                <span aria-hidden="true">◉</span>
                Ver
              </button>
              <button className="card-action edit" onClick={(event) => onActionClick(event, onEditPiece, piece)} type="button">
                ✎
              </button>
              <button
                className="card-action delete"
                onClick={(event) => onActionClick(event, onDeletePiece, piece)}
                type="button"
              >
                🗑
              </button>
            </div>
          </div>
          <div className="card-body">
            <p className="meta">{piece.category}</p>
            <h3>{piece.title}</h3>
            <p className="collection">{piece.collection}</p>
            <p className="artist">{piece.artist || 'Autor no especificado'}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default PieceGrid
