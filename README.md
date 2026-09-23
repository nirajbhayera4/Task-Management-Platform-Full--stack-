# TaskBoard (Full-Stack Starter)

React + Node.js/Express + PostgreSQL, with JWT login.

## 1. Database

```bash
createdb taskboard
psql -d taskboard -f backend/schema.sql
```

## 2. Backend

```bash
cd backend
cp .env.example .env      # then edit DATABASE_URL and JWT_SECRET
npm install
npm run dev               # http://localhost:5000
```

## 3. Frontend

```bash
cd frontend
npm install
npm run dev               # http://localhost:5173
```

## API

| Method | URL | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/signup` | No | Create an account |
| POST | `/api/auth/login` | No | Get a JWT token |
| GET/POST | `/api/boards` | Yes | List or create boards |
| DELETE | `/api/boards/:id` | Yes | Delete a board |
| GET/POST | `/api/boards/:boardId/tasks` | Yes | List or create tasks |
| PUT | `/api/tasks/:id` | Yes | Edit a task or change its status |
| DELETE | `/api/tasks/:id` | Yes | Delete a task |

## Next Steps

1. Add drag-and-drop support with `@hello-pangea/dnd`
2. Add Jest and Supertest API tests
3. Add a `Dockerfile` and `docker-compose.yml`
4. Add Redis caching, WebSockets, and deployment configuration
