# MERN Band / Student API

This project is a MERN backend API for managing Bands and Students with authentication, filtering, protected routes, and integration testing using Vitest. A special "Hello!" to the team at C******.io, with whom I am currently interviewing (and studying for the technical assessment). This project was built entirely from scratch over the course of three days, with assistance along the way from both technical docs online and generative AI tools. All features were tested manually during the development process with the integration test page added at the end.

Thank you and enjoy!

Built with:

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT authentication
- dotenv
- Vitest (integration testing)
- supertest
- curl / Postman testing

---

## Clone the repository

Do this however you prefer.

## Install dependencies

```bash
cd server
npm install
```

If you add a client later:

```bash
cd client
npm install
```

---

## Create environment variables

Create a `.env` file inside the `server/` directory.

```
PORT=5050
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
JWT_EXPIRES_IN=1h
```

Example:

```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
```

---

## Start the server

From the `server/` directory:

```
node server.js
```

Expected output:

```
Server listening on port 5050
Mongo connected
```

---

## API Routes

### Auth

```
POST /auth/register    - Register a new teacher account
POST /auth/login       - Login and receive a JWT token
GET  /auth/me          - Get current logged-in teacher (protected)
```

### Bands (all routes protected)

```
GET  /bands            - Get all bands for the authenticated teacher
GET  /bands/:id        - Get a single band by ID
POST /bands            - Create a new band
```

### Students (all routes protected)

```
GET    /students           - Get all students across the teacher's bands
GET    /students/:id       - Get a single student by ID
POST   /students           - Create a new student
PATCH  /students/:id       - Update a student's name and/or instrument
DELETE /students/:id       - Delete a student
```

### Sorting students

```
GET /students?sort=name         - Sort by name ascending
GET /students?sort=-name        - Sort by name descending
GET /students?sort=instrument   - Sort by instrument ascending
GET /students?sort=-instrument  - Sort by instrument descending
```

---

## Authentication

Login to get token:

```bash
curl -X POST http://localhost:5050/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"a@example.com","password":"123456"}'
```

Response:

```
{
  "token": "JWT_TOKEN"
}
```

Use token:

```bash
curl http://localhost:5050/bands \
-H "Authorization: Bearer YOUR_TOKEN"
```

---

## Testing with curl

Register:

```bash
curl -X POST http://localhost:5050/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Jane","email":"a@example.com","password":"123456"}'
```

Create band:

```bash
curl -X POST http://localhost:5050/bands \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{"name":"Band A"}'
```

Create student:

```bash
curl -X POST http://localhost:5050/students \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{"name":"John","instrument":"trumpet","bandId":"BAND_ID"}'
```

Update student:

```bash
curl -X PATCH http://localhost:5050/students/STUDENT_ID \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{"instrument":"guitar"}'
```

Sort students:

```bash
curl "http://localhost:5050/students?sort=name" \
-H "Authorization: Bearer YOUR_TOKEN"
```

---

## Running integration tests (Vitest)

This project uses **Vitest + Supertest** for integration testing.

Tests run against the same database configured in `.env`. Use a dedicated test database in `MONGO_URI` to avoid affecting real data.

From the `server/` directory:

```bash
npm test
```

or

```bash
npx vitest
```

Test coverage:

- Auth register/login/me
- Protected routes
- Band CR (no UD)
- Student CRUD
- Student sorting by name/instrument
- JWT authentication
- Mongo test database

---

## Features implemented

- Teacher registration and login with JWT
- Protected routes (all band/student routes require auth)
- Band CR (no UD)
- Student CRUD with PATCH update
- Student sorting by name/instrument
- Scoped data (teachers only see their own bands/students)
- MongoDB Atlas connection
- dotenv config
- Error handling
- Vitest integration tests

---

## Future improvements

- Frontend UI
- Role permissions
- Pagination
- Validation
- CI pipeline
- U/D endpoints for bands
- Student filtering by band

---

## Author

Nathan Feldman