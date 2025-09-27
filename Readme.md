# Capstone Backend

This is the backend API for the Capstone Airbnb-like application. It is built with Node.js, Express, and MongoDB, and provides RESTful endpoints for user management, accommodations, and reservations.

## Features

- User authentication and management
- Accommodation CRUD operations
- Reservation management
- File uploads for images
- Error handling and validation
- CORS support for frontend integration

## Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- JWT for authentication
- Multer for file uploads
- dotenv for environment variables
- CORS

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas or local MongoDB instance

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Capstone/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Copy `config.env` and update with your MongoDB credentials and secrets.

### Running the Server

```bash
npm run start
```

The server will start on the port specified in `config.env` (default: 3000).

## API Endpoints

### Users

- `POST /api/users/signup` — Register a new user
- `POST /api/users/login` — Login
- `GET /api/users/me` — Get current user profile

### Accommodations

- `GET /api/accommodations` — List all accommodations
- `POST /api/accommodations` — Create a new accommodation
- `GET /api/accommodations/:id` — Get accommodation by ID
- `PATCH /api/accommodations/:id` — Update accommodation
- `DELETE /api/accommodations/:id` — Delete accommodation

### Reservations

- `GET /api/reservations` — List all reservations
- `POST /api/reservations` — Create a reservation
- `GET /api/reservations/:id` — Get reservation by ID
- `PATCH /api/reservations/:id` — Update reservation
- `DELETE /api/reservations/:id` — Delete reservation

## Project Structure

```
backend/
  app.js
  server.js
  config.env
  package.json
  controllers/
  models/
  routes/
  utils/
  uploads/
```

## Environment Variables

See `config.env` for required variables:

- `PORT` — Server port
- `DATABASE` — MongoDB connection string
- `DATABASE_PASSWORD` — MongoDB password
- `JWT_SECRET` — JWT secret
- `JWT_EXPIRES_IN` — JWT expiration
- `JWT_COOKIE_EXPIRES_IN` — JWT cookie expiration

## License

ISC

---

For more details, see the source code and comments in each file.
