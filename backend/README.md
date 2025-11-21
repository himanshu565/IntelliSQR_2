# IntelliSQR — Backend

 Express + TypeScript backend 

**Tech Stack**

- Node.js
- TypeScript
- Express
-  a database connection via `src/config/db.ts` and JWT-based auth

## Features

- User authentication (register / login)
- Todo CRUD endpoints
- Request validation (Zod schemas)
- Error logging model
- Email helper utility (see `src/utils/sendEmail.ts`)

## Quick Start

1. Clone the repository and install dependencies

cd backend
npm installl

2. Create an `.env` file in the project root with the required environment variables. Example:

```env
PORT=4000
DATABASE_URL=mongodb://localhost:27017/intellisqr
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your@email
EMAIL_PASS=yourpassword
```

3. Run the app in development (watch) mode

```powershell
npm run dev
```

## Scripts

- `npm run dev` — start the server in development (ts-node / nodemon)
- `npm run build` — compile TypeScript into `dist`
- `npm start` — run the compiled production build

(Check `package.json` for exact script names and adjust commands if needed.)

## Project Structure

- `src/app.ts` — Express app configuration and middlewares
- `src/index.ts` — application entrypoint and server startup
- `src/config/db.ts` — database connection logic
- `src/routes/` — Express route definitions (`authRoutes.ts`, `todoRoutes.ts`)
- `src/controllers/` — request handlers (`authController.ts`, `todoController.ts`)
- `src/middlewares/` — auth middleware, validation, error logging
- `src/models/` — Mongoose/ORM models (`user.ts`, `Todo.ts`, `ErrorLog.ts`)
- `src/validators/` — Zod schemas for request validation
- `src/utils/sendEmail.ts` — email helper

## API Overview

The repository provides at least the following route :

- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login and receive JWT

- `GET /api/todos` — list todos (protected)
- `POST /api/todos` — create a todo (protected)
- `GET /api/todos/:id` — get a todo by id (protected)
- `PUT /api/todos/:id` — update a todo (protected)
- `DELETE /api/todos/:id` — delete a todo (protected)

Protect endpoints using the `authmiddleware` middleware. Request validation is performed using the Zod validators in `src/validators`.

## Environment & Configuration

Ensure the DB connection string and `JWT_SECRET` are set. If the repo uses a different DB (Postgres, MySQL), update `src/config/db.ts` accordingly.

## Contributing

- Please open issues for bugs or feature requests.
- Create a branch named `feature/<short-description>` or `fix/<short-description>`.
- Submit a pull request with a clear description of changes and testing steps.

## Authors

- Project maintainers — please replace this section with real author names and contact information.


