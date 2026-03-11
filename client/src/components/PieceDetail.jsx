import { useEffect } from 'react'
import { resolveImageUrl } from '../services/galleryApi'

function PieceDetail({ isOpen, piece, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !piece) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <section className="detail-modal-card" onClick={(event) => event.stopPropagation()}>
        <header className="detail-modal-header">
          <h2>{piece.title}</h2>
          <button className="detail-close" type="button" onClick={onClose} aria-label="Cerrar detalle">
            ✕
          </button>
        </header>

        <img src={resolveImageUrl(piece.imageUrl)} alt={piece.title} className="detail-modal-image" />

        <div className="detail-tags">
          <span>{piece.category || 'Sin categoría'}</span>
          <span>{piece.year || 'Año no indicado'}</span>
        </div>

        <div className="detail-content">
          <h3>Artista/Marca</h3>
          <p>{piece.artist || 'No indicado'}</p>

          <h3>Colección</h3>
          <p>{piece.collection || 'No indicada'}</p>

          <h3>Descripción</h3>
          <p>{piece.description || 'Sin descripción disponible.'}</p>

          <h3>Ubicación</h3>
          <p>{piece.location || 'No indicada'}</p>
        </div>
      </section>
    </div>
  )
}

export default PieceDetail
