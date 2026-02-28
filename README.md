# Internship Tracker

This repository contains a simple MERN-like application for tracking internships.

## Backend

### Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` in the `backend` directory with at least:
   ```env
   MONGO_URL=mongodb://localhost:27017/internship-tracker
   PORT=5001            # optional, defaults to 5000
   ```

### Running

Start the server on a free port (default 5000, or set `PORT`):

```bash
PORT=5001 node server.js
# or use nodemon for auto-restart
PORT=5001 npx nodemon server.js
```

The API will be available at `http://localhost:<PORT>/api`.

### Testing endpoints

Use `curl` or Postman to verify registration and login:

```bash
curl -i -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"pass123"}'

curl -i -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'
```

## Frontend

### Setup

```bash
cd frontend
npm install
```

### Config

Set the API root with an environment variable (defaults to `http://localhost:5001`):

```bash
export REACT_APP_API_URL=http://localhost:5001
npm start
```

### Behavior

- The **Register** page sends form data to `/api/auth/register`.
- The **Login** page sends credentials to `/api/auth/login` and stores the returned token in `localStorage`.

## Troubleshooting

- Ensure MongoDB is running and `MONGO_URL` is correct.
- If port 5000 is already in use (e.g. by AirPlay/AirTunes), choose another port with `PORT` and adjust `REACT_APP_API_URL` accordingly.
- Check backend console logs for connection errors and request handling.

---

With these steps you should be able to register a new user and log in successfully.
