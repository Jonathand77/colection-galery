# Colection Galery

Web app full-stack estilo galería de museo para exhibir y gestionar colecciones (figuras, cuadros, pósters, esculturas y más).

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Base de datos: SQLite (`server/gallery.db`)

## Funcionalidades

- Galería grid responsive con cards interactivas
- Filtros por categoría y búsqueda por texto
- Vista detallada de cada pieza
- Sistema para añadir, editar y eliminar piezas
- Imagen por URL o carga de archivo local
- Diseño visual neutro con acentos dorados y títulos serif

## Estructura de frontend

- `client/src/components`: componentes UI reutilizables
- `client/src/services`: capa de acceso a API
- `client/src/constants`: constantes compartidas
- `client/src/styles`: estilos globales y de galería

## Ejecutar proyecto

### 1) Backend

```bash
cd server
npm install
npm run start
```

API disponible en `http://localhost:4000`.

### 2) Frontend

En otra terminal:

```bash
cd client
npm install
npm run dev
```

Aplicación disponible en `http://localhost:5173`.

## Endpoints principales

- `GET /api/pieces` (soporta `?category=` y `?search=`)
- `GET /api/pieces/:id`
- `POST /api/pieces` (acepta `multipart/form-data` con `imageFile`)
- `PUT /api/pieces/:id` (acepta `multipart/form-data` con `imageFile`)
- `DELETE /api/pieces/:id`
- `GET /api/categories`
- `GET /uploads/:filename`
