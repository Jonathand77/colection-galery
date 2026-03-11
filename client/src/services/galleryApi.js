const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'
const ASSET_BASE = import.meta.env.VITE_ASSET_BASE || 'http://localhost:4000'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, options)

  if (!response.ok) {
    let errorMessage = 'Ocurrió un error en la solicitud.'
    try {
      const payload = await response.json()
      if (payload?.error) errorMessage = payload.error
    } catch {
      // ignore parse error
    }
    throw new Error(errorMessage)
  }

  if (response.status === 204) return null
  return response.json()
}

export function resolveImageUrl(imageUrl) {
  if (!imageUrl) return ''
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl
  if (imageUrl.startsWith('/')) return `${ASSET_BASE}${imageUrl}`
  return imageUrl
}

export async function getCategories() {
  const data = await request('/categories')
  return data.categories || []
}

export async function getPieces({ category, search }) {
  const query = new URLSearchParams()

  if (category && category !== 'Todas') query.set('category', category)
  if (search?.trim()) query.set('search', search.trim())

  return request(`/pieces?${query.toString()}`)
}

export async function createPiece(formData) {
  return request('/pieces', { method: 'POST', body: formData })
}

export async function updatePiece(id, formData) {
  return request(`/pieces/${id}`, { method: 'PUT', body: formData })
}

export async function removePiece(id) {
  return request(`/pieces/${id}`, { method: 'DELETE' })
}

export function toPieceFormData(formValues) {
  const formData = new FormData()

  const fields = ['title', 'category', 'collection', 'artist', 'year', 'description', 'location', 'imageUrl']
  fields.forEach((field) => {
    const value = formValues[field]
    if (value !== undefined && value !== null) {
      formData.append(field, String(value))
    }
  })

  if (formValues.imageFile instanceof File) {
    formData.append('imageFile', formValues.imageFile)
  }

  return formData
}
