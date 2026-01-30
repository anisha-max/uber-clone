# Uber Clone (Node + React + Socket.io) 

**Short description**
A full-stack Uber-style ride booking app demonstrating real-time location updates, user & driver workflows, and Google Maps integration , Node/Express + MongoDB backend and a React (Vite) frontend.
Features user & captain (driver) authentication, ride lifecycle (create/confirm/start/end), Google Maps integration, and real-time location updates via Socket.io.

---

## Table of contents
- **Tech stack**
- **Quick start**
- **Environment variables**
- **Run & Build**
- **API reference (overview)**
- **Socket events**
- **Project structure**
- **Contributing & License**

---

##  Tech stack
- Backend: Node.js, Express, Mongoose (MongoDB), Socket.io
- Frontend: React (Vite), TailwindCSS (dev deps), react-router
- External: Google Maps APIs (Geocoding / Distance Matrix / Places)

---

##  Quick start
Prerequisites:
- Node.js (16+ recommended)
- npm or yarn
- MongoDB (Atlas or local)
- Google Maps API key (Geocoding, Distance Matrix, Places)

Install dependencies:
```bash
# Backend
cd Backend
npm install

# Frontend
cd ../Frontend
npm install
```

Create a `.env` file in `Backend/` (example below) and add your environment values.

---

##  Environment variables (.env example)
Place this file at `Backend/.env`:

```ini
# MongoDB connection
DB_CONNECT=mongodb+srv://<user>:<pass>@cluster0.../dbname

# JWT secret used for signing tokens
JWT_SECRET=your_jwt_secret

# Google Maps API Key
GOOGLE_MAPS_API=YOUR_GOOGLE_MAPS_API_KEY

# Optional: server port
PORT=4000
```


## Frontend .env.example
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API=your_google_maps_api_key_here



---

##  Run & Build
Backend (development):
```bash
cd Backend
node server.js
# or use nodemon if available: nodemon server.js
```
Backend defaults to port **4000** (can be overridden with `PORT` env).

Frontend (development):
```bash
cd Frontend
npm run dev
```
Vite dev server (default: `http://localhost:5173`). To build:
```bash
npm run build
npm run preview
```

---

##  API Reference (overview)
Base: `http://localhost:4000`

Users (`/users`):
- `POST /users/register` — register user (body: email, password, fullname.)
- `POST /users/login` — login (returns token cookie / header)
- `GET /users/profile` — get authenticated user profile (auth required)
- `GET /users/logout` — logout (auth required)
- `POST /users/save-suggestion` — save suggestion (auth required)

Captains (`/captains`):
- `POST /captains/register` — register driver (email, password, fullname ,vehicle details required)
- `POST /captains/login` — login
- `GET /captains/profile` — get authenticated captain profile (auth required)
- `GET /captains/logout` — logout

Maps (`/maps`):
- `GET /maps/get-coordinates?address=...` — geocode an address (auth required)
- `GET /maps/get-distance-time?origin=...&destination=...` — distance & travel time (auth required)
- `GET /maps/get-suggestions?input=...&ltd=...&lng=...` — place autocomplete (auth required)

Rides (`/rides`):
- `POST /rides/create` — create a ride (auth user required). body: pickup, destination, vehicleType
- `GET /rides/get-fare?pickup=...&destination=...` — estimate fare (auth user required)
- `POST /rides/confirm` — captain confirms ride (auth captain required)
- `GET /rides/start-ride?rideId=...&otp=...` — captain starts ride (auth captain required)
- `POST /rides/end-ride` — captain ends ride (auth captain required)

Authentication uses JWT tokens (cookie or Authorization header `Bearer <token>`). Protect routes with middleware `authUser` / `authCaptain`.

---

##  Socket events (real-time)
Server initializes Socket.io in `Backend/socket.js`.
- Client -> Server:
  - `join` { userId, userType } — register socket
  - `update-location-user` { userId, location } — user updates location
  - `update-location-captain` { userId, location } — captain updates location
- Server -> Client:
  - Server emits to socket ids via `sendMessageToSocketId(socketId, { event, data })`

Use socket connection to show live driver location and ride updates.

---

##  Project structure (key files)
- `Backend/`
  - `app.js` — express app, route mounting
  - `server.js` — server + socket initialization
  - `db/db.js` — mongoose connection
  - `routes/` — route definitions (`users`, `captains`, `maps`, `rides`)
  - `controllers/` — route handlers
  - `services/` — external-service helpers (maps, rides)
  - `models/` — mongoose models

- `Frontend/`
  - `src/` — React app (pages, components, contexts)
  - `package.json` — scripts (`dev`, `build`, `preview`)

---

##  Quick notes & tips
- Ensure `GOOGLE_MAPS_API` has Geocoding / Distance matrix / Places permissions.
- Backend expects `JWT_SECRET` for token signing.
- Add `nodemon` as a dev dependency for automatic backend reloads.


