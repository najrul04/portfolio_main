# Portfolio + Blog

Najrul's portfolio site with a public blog and a private admin panel for writing posts.

- **_legacy_portfolio/** — React + Vite frontend (portfolio sections, `/blog`, `/admin`)
- **backend/** — Express + Apollo GraphQL + Prisma + PostgreSQL + JWT auth
- **frontend/** — Next.js scaffold (parked; not currently in use)

---

## 🚀 Daily startup

Three things must be running. Order matters: DB → backend → frontend.

### ① Start Postgres (Docker container)

```powershell
docker start portfolio-pg
```

- Container persists across reboots but stops when Docker Desktop closes.
- Docker Desktop itself auto-starts at login and runs in the background — no need to open the GUI.
- If you get `No such container`, Docker Desktop isn't running yet → open it from Start Menu, wait for the whale icon to go green, then retry.

Verify:
```powershell
docker ps --filter name=portfolio-pg
```
Should show `Up X seconds` and `0.0.0.0:5433->5432/tcp`.

### ② Backend — Terminal 1

```powershell
cd h:\Projects\personal\portfolio_main
npm run dev:backend
```

Wait for: `🚀 GraphQL ready at http://localhost:4000/graphql`. Leave this terminal open.

### ③ Frontend — Terminal 2 (new window)

```powershell
cd h:\Projects\personal\portfolio_main\_legacy_portfolio
npm run dev
```

Opens on `http://localhost:5173/`.

### URLs you'll use

| URL | What |
|---|---|
| http://localhost:5173 | Portfolio home |
| http://localhost:5173/blog | Public blog list |
| http://localhost:5173/admin | Login + post management (only you) |
| http://localhost:4000/graphql | GraphQL playground (debug queries) |

### Shutting down

`Ctrl+C` in each terminal. Optionally `docker stop portfolio-pg` to free RAM (~30MB).

---

## 🛠 First-time setup (fresh clone)

Skip this if you already did it once on this machine.

### Prereqs
- **Node.js 18.18+** and **npm 9+**
- **Docker Desktop** running (https://www.docker.com/products/docker-desktop/)

### 1. Install dependencies
```powershell
cd h:\Projects\personal\portfolio_main
npm install
cd _legacy_portfolio
npm install
```

### 2. Start a Postgres container
```powershell
docker run --name portfolio-pg `
  -e POSTGRES_PASSWORD=postgres `
  -e POSTGRES_DB=portfolio `
  -p 5433:5432 `
  -d postgres:16
```

> Using **5433** on the host to avoid clashing with any existing Postgres on 5432.

### 3. Configure backend `.env`
```powershell
cd ..\backend
Copy-Item .env.example .env
```

Edit `backend/.env` and set:
- `DATABASE_URL="postgresql://postgres:postgres@localhost:5433/portfolio?schema=public"`
- `JWT_SECRET` — generate with:
  ```powershell
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- `ADMIN_EMAIL` — your email

### 4. Configure frontend `.env`
Already committed for local dev. If missing, create `_legacy_portfolio/.env`:
```
VITE_GRAPHQL_URL=http://localhost:4000/graphql
```

### 5. Run migrations + seed admin
```powershell
cd h:\Projects\personal\portfolio_main
npm run -w backend prisma:migrate -- --name init
npm run seed
```

⚠ **Copy the printed admin password into your password manager NOW** — it's bcrypt-hashed in the DB and can't be recovered.

### 6. Start everything (see [Daily startup](#-daily-startup) above)

---

## 📂 Project structure

```
portfolio_main/
├── _legacy_portfolio/         # Vite frontend (active app)
│   ├── src/
│   │   ├── components/        # Portfolio sections + blog components
│   │   │   ├── blog/          # MarkdownEditor, PostPreview, PostForm, LoginForm
│   │   │   └── ...            # about, header, nav, footer, etc.
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── lib/
│   │   │   ├── apolloClient.js
│   │   │   ├── graphql/       # ALL queries + mutations live here (never inlined)
│   │   │   └── utils/
│   │   ├── pages/
│   │   │   ├── Blog.jsx       # Public read-only
│   │   │   └── Admin.jsx      # JWT-gated CRUD
│   │   ├── App.jsx
│   │   └── index.jsx
│   └── .env                   # VITE_GRAPHQL_URL
├── backend/
│   ├── src/
│   │   ├── schema/
│   │   │   ├── typeDefs.ts
│   │   │   └── resolvers/
│   │   ├── lib/               # prisma, jwt, password singletons
│   │   ├── middleware/
│   │   ├── context.ts
│   │   ├── index.ts           # Express + Apollo Server entrypoint
│   │   └── seed.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── .env                   # DATABASE_URL, JWT_SECRET, etc.
├── frontend/                  # Next.js scaffold — parked, not used right now
└── package.json               # npm workspaces root
```

---

## 🧰 Common commands

| Command | What |
|---|---|
| `npm run dev:backend` | Backend only (from root) |
| `npm run dev:frontend` | Next.js scaffold (parked — usually skip) |
| `cd _legacy_portfolio && npm run dev` | Vite portfolio (the actual frontend) |
| `npm run seed` | Re-seed admin (only works if no admin row exists yet) |
| `npm run -w backend prisma:migrate` | Apply a new migration after editing `schema.prisma` |
| `npm run -w backend prisma:studio` | Browse/edit DB rows at http://localhost:5555 |
| `docker start portfolio-pg` | Start Postgres |
| `docker stop portfolio-pg` | Stop Postgres |
| `docker logs portfolio-pg` | View Postgres logs |
| `docker rm -f portfolio-pg` | Delete container (⚠ also deletes all data) |

---

## 🐛 Troubleshooting

**Backend says `Can't reach database server at localhost:5433`**
Container isn't running. `docker start portfolio-pg`.

**Backend says `Authentication failed against database server`**
The Postgres on that port isn't ours. Run `docker ps` and check the Ports column — make sure `portfolio-pg` is mapped to the port in `DATABASE_URL` (5433).

**Browser console: `CORS error` or `NetworkError`**
- Check the backend terminal is running on port 4000
- Check `backend/.env` has `CORS_ORIGIN` including `http://localhost:5173`

**`/admin` login says "Invalid email or password"**
Either wrong password, or the admin row never got seeded. Verify:
```powershell
npm run -w backend prisma:studio
```
Open at http://localhost:5555 → Admin table → there should be exactly one row.

**Forgot admin password**
Open Prisma Studio (as above), delete the Admin row, then:
```powershell
npm run seed
```
Get a fresh generated password.

**Port 4000 or 5173 already in use**
Something else is using it. Either close that thing, or change the port:
- Backend: edit `PORT` in `backend/.env`
- Frontend: edit `_legacy_portfolio/vite.config.js` to add `server: { port: 5174 }`
- Then update `CORS_ORIGIN` and `VITE_GRAPHQL_URL` accordingly.
