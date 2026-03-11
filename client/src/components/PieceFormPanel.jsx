import { useEffect, useMemo } from 'react'

function PieceFormPanel({
  isOpen,
  mode,
  categories,
  formData,
  onChange,
  onFileChange,
  onClose,
  onSubmit,
}) {
  const selectedFileName = useMemo(() => formData.imageFile?.name || '', [formData.imageFile])

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

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <section className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="editor-header modal-header">
          <div>
            <h2>{mode === 'create' ? 'Añadir Nueva Pieza' : 'Editar Pieza'}</h2>
            <p className="modal-subtitle">Completa los detalles de tu pieza de colección</p>
          </div>
          <button className="modal-close" onClick={onClose} type="button" aria-label="Cerrar formulario">
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="piece-form modal-form">
          <label className="full-width">
            Título *
            <input name="title" value={formData.title} onChange={onChange} required placeholder="Nombre de la pieza" />
          </label>

          <label className="full-width">
            Categoría *
            <select name="category" value={formData.category} onChange={onChange} required>
              {categories
                .filter((category) => category !== 'Todas')
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </label>

          <label className="full-width">
            URL de Imagen
            <input name="imageUrl" type="url" value={formData.imageUrl} onChange={onChange} placeholder="https://ejemplo.com/imagen.jpg" />
          </label>

          <label className="full-width">
            Imagen de la pieza
            <input name="imageFile" type="file" accept="image/*" onChange={onFileChange} />
            {selectedFileName && <span className="file-name">Archivo: {selectedFileName}</span>}
          </label>

          <label>
            Artista / Estudio
            <input name="artist" value={formData.artist} onChange={onChange} placeholder="Nombre del artista" />
          </label>

          <label>
            Año
            <input name="year" type="number" min="0" max="3000" value={formData.year} onChange={onChange} placeholder="2024" />
          </label>

          <label className="full-width">
            Colección *
            <input name="collection" value={formData.collection} onChange={onChange} required placeholder="Colección o serie" />
          </label>

          <label className="full-width">
            Ubicación
            <input name="location" value={formData.location} onChange={onChange} placeholder="Vitrina, salón, estante..." />
          </label>

          <label className="full-width">
            Descripción
            <textarea name="description" rows="4" value={formData.description} onChange={onChange} placeholder="Descripción de la pieza" />
          </label>

          <div className="form-actions full-width modal-actions">
            <button className="btn-ghost" type="button" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn-primary" type="submit">
              {mode === 'create' ? 'Añadir Pieza' : 'Actualizar Pieza'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default PieceFormPanel
