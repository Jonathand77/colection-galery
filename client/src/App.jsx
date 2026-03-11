import { useEffect, useMemo, useState } from 'react'
import AppFooter from './components/AppFooter'
import CategoryFilters from './components/CategoryFilters'
import GalleryHeader from './components/GalleryHeader'
import GalleryToolbar from './components/GalleryToolbar'
import PieceDetail from './components/PieceDetail'
import PieceFormPanel from './components/PieceFormPanel'
import PieceGrid from './components/PieceGrid'
import { FALLBACK_CATEGORIES } from './constants/categories'
import { createPiece, getCategories, getPieces, removePiece, toPieceFormData, updatePiece } from './services/galleryApi'

const defaultForm = {
  title: '',
  category: 'Figuras',
  collection: '',
  artist: '',
  year: '',
  description: '',
  imageUrl: '',
  imageFile: null,
  location: '',
}

function App() {
  const [pieces, setPieces] = useState([])
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES)
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPiece, setSelectedPiece] = useState(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [formMode, setFormMode] = useState('create')
  const [formOpen, setFormOpen] = useState(false)
  const [formData, setFormData] = useState(defaultForm)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const totalByCategory = useMemo(
    () =>
      pieces.reduce((acc, piece) => {
        acc[piece.category] = (acc[piece.category] || 0) + 1
        return acc
      }, {}),
    [pieces],
  )

  const totalCollections = useMemo(() => {
    const uniqueCollections = new Set(pieces.map((piece) => piece.collection).filter(Boolean))
    return uniqueCollections.size
  }, [pieces])

  const totalCategories = useMemo(() => categories.filter((category) => category !== 'Todas').length, [categories])

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    loadPieces()
  }, [selectedCategory, searchTerm])

  async function loadCategories() {
    try {
      const remoteCategories = await getCategories()
      setCategories(['Todas', ...remoteCategories])
    } catch {
      setCategories(FALLBACK_CATEGORIES)
    }
  }

  async function loadPieces() {
    setIsLoading(true)
    setError('')

    try {
      const data = await getPieces({ category: selectedCategory, search: searchTerm })
      setPieces(data)

      if (selectedPiece) {
        const refreshed = data.find((piece) => piece.id === selectedPiece.id)
        setSelectedPiece(refreshed || null)
      }
    } catch {
      setError('No fue posible conectar con el backend. Verifica que el servidor esté activo en el puerto 4000.')
    } finally {
      setIsLoading(false)
    }
  }

  function openCreateForm() {
    setFormMode('create')
    setFormData({ ...defaultForm, category: categories[1] || 'Figuras' })
    setFormOpen(true)
  }

  function openEditForm(piece) {
    setDetailOpen(false)
    setFormMode('edit')
    setFormData({
      title: piece.title || '',
      category: piece.category || categories[1] || 'Figuras',
      collection: piece.collection || '',
      artist: piece.artist || '',
      year: piece.year || '',
      description: piece.description || '',
      imageUrl: piece.imageUrl?.startsWith('/uploads/') ? '' : piece.imageUrl || '',
      imageFile: null,
      location: piece.location || '',
    })
    setSelectedPiece(piece)
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
    setFormData(defaultForm)
  }

  function openDetail(piece) {
    setSelectedPiece(piece)
    setDetailOpen(true)
  }

  function closeDetail() {
    setDetailOpen(false)
  }

  function onFieldChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function onFileChange(event) {
    const file = event.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, imageFile: file }))
  }

  async function onSubmit(event) {
    event.preventDefault()
    setError('')

    const payload = {
      ...formData,
      year: formData.year ? Number(formData.year) : '',
    }

    if (!payload.imageFile && !payload.imageUrl && formMode === 'create') {
      setError('Debes agregar una URL o subir una imagen para crear la pieza.')
      return
    }

    try {
      const formPayload = toPieceFormData(payload)
      const saved =
        formMode === 'edit' && selectedPiece
          ? await updatePiece(selectedPiece.id, formPayload)
          : await createPiece(formPayload)

      setSelectedPiece(saved)
      closeForm()
      await loadPieces()
    } catch (submitError) {
      setError(submitError.message)
    }
  }

  async function onDeletePiece(piece) {
    const shouldDelete = window.confirm(`¿Eliminar la pieza "${piece.title}"?`)
    if (!shouldDelete) return

    try {
      await removePiece(piece.id)
      if (selectedPiece?.id === piece.id) {
        setSelectedPiece(null)
        setDetailOpen(false)
      }
      await loadPieces()
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  return (
    <main className="museum-app">
      <GalleryHeader totalPieces={pieces.length} totalCollections={totalCollections} totalCategories={totalCategories} />

      <section className="content-shell">
        <section className="control-hub">
          <GalleryToolbar searchTerm={searchTerm} onSearchChange={setSearchTerm} onAddClick={openCreateForm} />

          <CategoryFilters
            categories={categories}
            selectedCategory={selectedCategory}
            counts={totalByCategory}
            onSelect={setSelectedCategory}
          />
        </section>

        {error && <p className="error-box">{error}</p>}

        <section className="gallery-layout">
          <PieceGrid
            pieces={pieces}
            isLoading={isLoading}
            onViewPiece={openDetail}
            onEditPiece={openEditForm}
            onDeletePiece={onDeletePiece}
          />
        </section>
      </section>

      <PieceDetail isOpen={detailOpen} piece={selectedPiece} onClose={closeDetail} />

      <PieceFormPanel
        isOpen={formOpen}
        mode={formMode}
        categories={categories}
        formData={formData}
        onChange={onFieldChange}
        onFileChange={onFileChange}
        onClose={closeForm}
        onSubmit={onSubmit}
      />

      <AppFooter />
    </main>
  )
}

export default App
