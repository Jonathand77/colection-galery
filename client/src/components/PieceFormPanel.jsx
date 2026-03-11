import { useMemo } from 'react'

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

  if (!isOpen) return null

  return (
    <section className="editor-panel">
      <div className="editor-header">
        <h2>{mode === 'create' ? 'Añadir nueva pieza' : 'Editar pieza'}</h2>
        <button className="btn-ghost" onClick={onClose}>
          Cerrar
        </button>
      </div>

      <form onSubmit={onSubmit} className="piece-form">
        <label>
          Título
          <input name="title" value={formData.title} onChange={onChange} required />
        </label>

        <label>
          Categoría
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

        <label>
          Colección
          <input name="collection" value={formData.collection} onChange={onChange} required />
        </label>

        <label>
          Artista / Estudio
          <input name="artist" value={formData.artist} onChange={onChange} />
        </label>

        <label>
          Año
          <input name="year" type="number" min="0" max="3000" value={formData.year} onChange={onChange} />
        </label>

        <label>
          Ubicación
          <input name="location" value={formData.location} onChange={onChange} />
        </label>

        <label className="full-width">
          URL de imagen (opcional si subes archivo)
          <input name="imageUrl" type="url" value={formData.imageUrl} onChange={onChange} />
        </label>

        <label className="full-width">
          Imagen de la pieza
          <input name="imageFile" type="file" accept="image/*" onChange={onFileChange} />
          {selectedFileName && <span className="file-name">Archivo: {selectedFileName}</span>}
        </label>

        <label className="full-width">
          Descripción
          <textarea name="description" rows="4" value={formData.description} onChange={onChange} />
        </label>

        <div className="form-actions full-width">
          <button className="btn-primary" type="submit">
            {mode === 'create' ? 'Guardar pieza' : 'Actualizar pieza'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default PieceFormPanel
