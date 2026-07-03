# Neev Estate

A land selling website for Andhra Pradesh with React frontend and Node.js backend.

## Features

- Hero section with customizable content
- Plot listings with filtering (city, category)
- Plot detail pages
- Admin panel for content management
- Responsive design

## Tech Stack

**Frontend:**
- React 18
- React Router
- Vite

**Backend:**
- Node.js + Express
- CORS enabled
- RESTful API

## Project Structure

```
real-estate/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── properties.js
│   │   ├── hero.js
│   │   └── admin.js
│   ├── data/
│   │   └── properties.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

## Getting Started

### Backend

```bash
cd real-estate/backend
npm install
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend

```bash
cd real-estate/frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## Admin Panel

Access at `/admin`

Default password: `neev@admin123`

## API Endpoints

### Public
- `GET /api/properties` - Get all plots (with optional filters)
- `GET /api/properties/:id` - Get single plot
- `GET /api/hero` - Get hero section content

### Admin (requires `x-admin-password` header)
- `GET/PUT /api/admin/hero` - Manage hero content
- `GET/POST /api/admin/plots` - List/add plots
- `PUT/DELETE /api/admin/plots/:id` - Update/delete plot

## License

Private project for Neev Estate
