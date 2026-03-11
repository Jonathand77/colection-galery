import { resolveImageUrl } from '../services/galleryApi'

function PieceGrid({ pieces, isLoading, onSelectPiece }) {
  return (
    <div className="gallery-grid">
      {isLoading && <p className="status-msg">Cargando piezas...</p>}
      {!isLoading && pieces.length === 0 && <p className="status-msg">No hay piezas para este filtro.</p>}

      {pieces.map((piece) => (
        <article key={piece.id} className="art-card" onClick={() => onSelectPiece(piece)}>
          <div className="image-wrap">
            <img src={resolveImageUrl(piece.imageUrl)} alt={piece.title} loading="lazy" />
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
