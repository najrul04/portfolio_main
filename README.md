# Portfolio + Blog

Najrul's portfolio site with a public blog and a private admin panel for writing posts.

- **frontend/** — Next.js 14 (App Router) — portfolio sections, `/blog`, `/blog/[slug]`, `/admin`
- **backend/** — Express + Apollo GraphQL + Prisma + PostgreSQL + JWT auth

> The original React + Vite app (`_legacy_portfolio/`) was fully ported into `frontend/` and removed.

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

### ② Backend + frontend together — one terminal

```powershell
cd h:\Projects\personal\portfolio_main
npm run dev
```

Runs both apps concurrently (backend on `:4000`, frontend on `:3000`). Wait for
`🚀 GraphQL ready at http://localhost:4000/graphql` and the Next.js `✓ Ready` line.

> Prefer separate terminals? Use `npm run dev:backend` in one and `npm run dev:frontend` in another.

### URLs you'll use

| URL | What |
|---|---|
| http://localhost:3000 | Portfolio home |
| http://localhost:3000/blog | Public blog list |
| http://localhost:3000/admin | Login + post management (only you) |
| http://localhost:4000/graphql | GraphQL playground (debug queries) |

### Shutting down

`Ctrl+C` in the terminal. Optionally `docker stop portfolio-pg` to free RAM (~30MB).

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
```

> One install at the root covers both workspaces (`frontend` + `backend`).

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
cd .\backend
Copy-Item .env.example .env
```

Edit `backend/.env` and set:
- `DATABASE_URL="postgresql://postgres:postgres@localhost:5433/portfolio?schema=public"`
- `JWT_SECRET` — generate with:
  ```powershell
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- `ADMIN_EMAIL` — your email
- `CORS_ORIGIN` — include `http://localhost:3000`

### 4. Configure frontend `.env.local`
```powershell
cd ..\frontend
Copy-Item .env.example .env.local
```

`frontend/.env.local` should contain:
```
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
NEXT_PUBLIC_API_URL=http://localhost:4000
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
├── frontend/                  # Next.js 14 app (the frontend)
│   ├── app/
│   │   ├── layout.tsx         # Providers + global chrome (PreLoader, Nav)
│   │   ├── providers.tsx      # Apollo + Auth ('use client')
│   │   ├── page.tsx           # Home (Header, About, … , Footer)
│   │   ├── blog/page.tsx      # Public blog list
│   │   ├── blog/[slug]/page.tsx
│   │   └── admin/page.tsx     # JWT-gated CRUD
│   ├── components/
│   │   ├── sections/          # Portfolio sections (Header, About, Skills, …)
│   │   ├── layout/            # Nav, PreLoader
│   │   ├── blog/              # MarkdownEditor, PostPreview, PostForm, LoginForm, Pagination
│   │   ├── hoc/               # SectionWrapper
│   │   └── ui/                # Design-system primitives
│   ├── lib/
│   │   ├── apollo-client.ts
│   │   ├── auth-context.tsx
│   │   ├── constants.ts       # Shared data (experiences, skills, …)
│   │   ├── motion.ts          # framer-motion variants
│   │   ├── graphql/           # ALL queries + mutations live here (never inlined)
│   │   └── utils/
│   ├── public/assets/         # Images, logos, Resume.pdf
│   └── styles/
│       ├── tokens.css         # SINGLE source of truth for colors/sizes
│       ├── globals.css        # resets + base element rules
│       └── sections/          # per-section CSS, aggregated by index.css
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
└── package.json               # npm workspaces root
```

### Styling — one place to change a color

All colors/sizes/radii are CSS variables in `frontend/styles/tokens.css`. Change a
token once and it cascades everywhere (Tailwind reads the same tokens via
`tailwind.config.ts`). Per-section CSS lives in `styles/sections/*` and references
those tokens — no literal colors in components.

---

## 🧰 Common commands

| Command | What |
|---|---|
| `npm run dev` | Backend + frontend together (from root) |
| `npm run dev:backend` | Backend only |
| `npm run dev:frontend` | Next.js frontend only (http://localhost:3000) |
| `npm run build` | Production build of both workspaces |
| `npm run -w frontend build` | Production build of the frontend only |
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
- Check `backend/.env` has `CORS_ORIGIN` including `http://localhost:3000`

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

**Port 4000 or 3000 already in use**
Something else is using it. Either close that thing, or change the port:
- Backend: edit `PORT` in `backend/.env`
- Frontend: change the `-p 3000` in `frontend/package.json` dev/start scripts
- Then update `CORS_ORIGIN` and `NEXT_PUBLIC_GRAPHQL_URL` accordingly.
