# Project Documentation — Portfolio Monorepo

> Living documentation for this repo. Every time a feature is added or changed,
> the relevant section here is updated (and a line is added to the Change History
> at the bottom). Kept current by Claude via `/update-docs` and automatically
> after each change set.

---

## 1. Overview

Personal portfolio + blog, rebuilt from a legacy Vite/React app into a monorepo:

| App | Stack | Dev port |
|---|---|---|
| `frontend/` | Next.js 14 (App Router), TypeScript, Apollo Client | 3000 |
| `backend/` | Express + Apollo Server 4, Prisma, PostgreSQL, JWT | 4000 by default (`PORT` env overrides — local `.env` uses 4001) |

### Deployment (live as of 2026-07-05)

- **Frontend:** Vercel project `portfolio-main-frontend`, Root Directory
  `frontend/`, Next.js preset. **najrul.com** deploys from `main`;
  **testing.najrul.com** (Namecheap CNAME `testing` → cname.vercel-dns.com) is
  assigned to the `staging` branch. Workflow: verify on testing.najrul.com
  before merging `staging` → `main`.
- **Backend:** Render free-tier web service `portfolio-backend-staging`
  (https://portfolio-backend-staging.onrender.com), deploys from `staging`.
  Free tier sleeps when idle → first request after a quiet period takes
  ~20–30s. `CORS_ORIGIN` on Render must list every frontend origin
  (najrul.com is in; add testing.najrul.com when it goes live).
- **Database:** Neon Postgres, project `portfolio`, branch `production`.
- **Vercel env vars (Production + Preview, NOT marked Sensitive):**
  `NEXT_PUBLIC_GRAPHQL_URL` = backend URL + `/graphql`,
  `NEXT_PUBLIC_API_URL` = backend URL. (The legacy `VITE_*` vars were saved as
  Sensitive and are permanently unreadable — that's why the new ones aren't.)
- **Admin password resets** run locally against prod:
  `DATABASE_URL='<neon-url>' ADMIN_EMAIL_NEW=... ADMIN_PASSWORD_NEW='...' npm run -w backend admin:update`

## 2. Repository layout

```
frontend/
  app/                  # App Router pages
    page.tsx            #   / — homepage (all portfolio sections)
    blog/page.tsx       #   /blog — post list
    blog/[slug]/page.tsx#   /blog/:slug — single post (opens in new tab from list)
    admin/page.tsx      #   /admin — login + post management
    layout.tsx          #   root layout
    providers.tsx       #   Apollo + auth providers
  components/
    sections/           # homepage sections (Header, About, Skills, Experience,
                        #   Portfolio, Testimonials, CTA, Contact, Footer…)
    blog/               # LoginForm, MarkdownEditor, PostForm, PostPreview, Pagination
    layout/             # Nav, PreLoader
    ui/                 # Badge, Button, Card, Input, Textarea, Spinner, etc.
    hoc/SectionWrapper.tsx
  lib/
    apollo-client.ts    # Apollo singleton + JWT auth link (token in localStorage)
    auth-context.tsx    # React auth state
    graphql/            # ALL GraphQL operations (queries.ts / mutations.ts) —
                        #   no inline gql in components
    animation.ts, motion.ts, constants.ts, utils/slug.ts
  styles/
    tokens.css          # SINGLE SOURCE OF TRUTH for colors/sizes/radii
    globals.css         # base/element rules
    sections/*.css      # per-section styles, aggregated by sections/index.css;
                        #   must reference var(--token), never literal colors

backend/
  src/
    index.ts            # Express + Apollo bootstrap, CORS, /health probe
    schema/typeDefs.ts  # GraphQL schema
    schema/resolvers/   # auth.resolver.ts, post.resolver.ts
    routes/images.ts    # REST image upload/serve (multipart via multer)
    middleware/auth.middleware.ts  # JWT parsing → context.user
    lib/                # jwt.ts, password.ts (bcrypt), prisma.ts
    seed.ts             # npm run seed
    updateAdmin.ts      # npm run admin:update
  prisma/schema.prisma  # Post, Admin, Image models
```

## 3. Backend

- **GraphQL** at `/graphql` (Apollo Server 4 via `expressMiddleware`). Per-request
  context = `{ prisma, user }`; `user` comes from parsing the
  `Authorization: Bearer <JWT>` header.
- **Auth:** single `Admin` row (email + bcrypt hash). Login mutation returns a JWT;
  admin-only mutations check `context.user`.
- **Images (REST, not GraphQL):** `routes/images.ts` handles multipart upload with
  multer and serves images back with the stored `mimeType`. Images are stored as
  Postgres `bytea` in the `Image` table so the whole site state lives in one DB.
  The router is mounted **before** `express.json` on its path — multer must read
  the multipart stream first.
- **CORS:** `CORS_ORIGIN` env is a comma-separated origin list
  (default `http://localhost:5173,http://localhost:3000`).
- **Health check:** `GET /health` → `{ status: "ok" }` (used by Render).
- **Public queries:** `posts(page, perPage, tag, search)` — paginated (10/page
  default, capped at 50), filters run DB-side (Prisma `where`: exact tag match
  via array `has`, case-insensitive search on title/excerpt); `tags` — distinct
  tags across published posts (for the blog filter dropdown).
- **Tag normalization:** `createPost`/`updatePost` split tag input on
  commas/whitespace, strip leading `#`, dedupe. Migration `20260705120000`
  repaired legacy rows and backfilled `Post.number` by `createdAt`.
- **Migrations on prod:** Render's build does NOT run migrations — after adding
  one, run `DATABASE_URL='<neon-url>' npx prisma migrate deploy` from
  `backend/` before (or right after) deploying the backend.
- **Database models** (`prisma/schema.prisma`):
  - `Post` — unique `number` (creation-order, assigned max+1 in createPost,
    never renumbered on delete), title, unique `slug`, raw-markdown `content`,
    excerpt, optional coverImage, `tags String[]`, `published` flag; indexed on
    `[published, createdAt]` for listing queries.
  - `Admin` — email + passwordHash.
  - `Image` — filename, mimeType, `data Bytes`, denormalized `size`.
- **Scripts:** `dev` (nodemon + ts-node), `predev` (auto-frees the port — see
  §7), `build` (tsc + prisma generate), `seed`, `admin:update`,
  `prisma:migrate`, `prisma:studio`.
- **Startup/shutdown hardening (`src/index.ts`):** `EADDRINUSE` is caught and
  reported with an actionable message instead of a stack trace; `SIGINT`/`SIGTERM`
  handlers close the HTTP server explicitly so the process never exits while
  still holding the port.

## 4. Frontend

- **Pages:** homepage (`/`) renders all portfolio sections; `/blog` lists
  published posts with server-side pagination (10/page), a debounced search box
  + tag dropdown (both filter in the DB), per-post creation numbers (`#4`), and
  cover images with a shimmer/spinner loading state
  (`components/blog/CoverImage.tsx`) that fades in on load and collapses on
  error; `/blog/[slug]` renders a post's markdown
  (react-markdown + remark-gfm); `/admin` is the login + post CRUD area with a
  markdown editor and live preview; its post table is numbered and has
  client-side search (title/slug/tag) + a status filter.
- **Data layer:** one Apollo Client singleton (`lib/apollo-client.ts`) with an
  auth link that reads the JWT from `localStorage` (`AUTH_TOKEN_KEY`) on every
  request. Default fetch policy is `cache-and-network` so admin edits/deletes
  never leave stale rows. GraphQL endpoint comes from `NEXT_PUBLIC_GRAPHQL_URL`
  (falls back to `http://localhost:4000/graphql`).
- **Styling system (most important convention):** design tokens live in
  `styles/tokens.css`; changing a value there must cascade everywhere. No
  hardcoded colors/sizes/radii anywhere else. Per-section CSS files consume
  tokens via `var(--token)`.
- **Animations:** GSAP, Swiper, tsParticles, AOS, framer-motion, typewriter —
  kept faithful to the live legacy site. Homepage entrance animations were
  deliberately toned down (commit `425d576`).
- **Contact form:** emailjs-com.

## 5. Environment variables

| App | Variable | Purpose |
|---|---|---|
| backend | `DATABASE_URL` | Postgres connection string |
| backend | `PORT` | listen port (default 4000; local dev uses 4001) |
| backend | `CORS_ORIGIN` | comma-separated allowed origins |
| backend | `JWT_SECRET` | JWT signing secret |
| frontend | `NEXT_PUBLIC_GRAPHQL_URL` | GraphQL endpoint (inlined into bundle) |

## 6. Conventions (enforced)

- Strict TypeScript, no `any`.
- Non-trivial decisions get a `// WHY:` comment.
- GraphQL operations only in `frontend/lib/graphql/`.
- Tokens-only CSS (see §4).
- Local `npm run build` must pass before anything is pushed that auto-deploys.
- Claude never runs git — the user reviews diffs and commits/pushes personally.

## 7. Troubleshooting

- **`EADDRINUSE` on backend start — now auto-fixed.** Two historical causes:
  an orphaned `ts-node` child left behind by nodemon on Windows, and running
  `npm run dev` both at the repo root (which already starts the backend via
  concurrently) and inside `backend/`. The `predev` script
  (`backend/scripts/free-port.cjs`) now runs before every `npm run dev`: it
  finds whatever is listening on the port, kills it **only if it is this
  repo's backend**, and logs what it did. If the port is held by an unrelated
  app it warns and leaves it alone — stop that app or change `PORT` in
  `backend/.env`.
- **Run only ONE dev entrypoint at a time:** either `npm run dev` at the root
  (backend + frontend together) or the per-app dev scripts — not both.

## 8. Planned / upcoming

- First production deploy (Vercel frontend + Render backend). Reminder: set the
  Vercel project root directory to `frontend/`.
- Blog categories + search (after first prod deploy).
- Vercel Web Analytics (`@vercel/analytics`) after deploy is live.
- **AI semantic search over blog posts (RAG):** embed post content with an LLM
  embeddings API, store vectors in PostgreSQL via `pgvector`, and answer
  natural-language queries against the blog. Goals: (a) a live, demonstrable
  AI feature on the portfolio, (b) legitimate resume claims for RAG / vector
  DB / LLM API integration. Builds on the planned blog search above — do after
  first prod deploy.

---

## Change History

Newest first. One line per change set: date — what & why.

- **2026-07-05** — **Testimonials redesign (reviewer rail):** replaced the
  Swiper card carousel with a two-panel layout — left: vertical scrollable
  rail of reviewers on a "(" arc (active one enlarged with accent ring +
  name/title/star; wheel-scroll via non-passive native listener, click to
  select, endless wrap-around); right: active person's quote in large italic
  with accent quote mark, thin-scrollbar overflow for long reviews, footer
  with name/title + LinkedIn/UpWork/Local badge, fade-in on change. Mobile
  (≤900px): rail turns horizontal, avatars only. Swiper no longer used in
  this section. New tokens `--gradient-glass` + `--blur-glass` in
  `tokens.css` (glass look, reusable).
- **2026-07-05** — Country flags added left of each Work Experience location
  (local PNGs in `public/assets/flags/` — images, not emoji, since Windows
  browsers don't render flag emojis). Fixed 4 broken Skills icons (CSS,
  JavaScript, Netlify, VS Code): their Wikimedia/seeklogo hotlinks had rotted —
  replaced with local devicon SVGs in `public/assets/skills/`.
- **2026-07-05** — Added Monudesk (Germany, June 2025–present) as the newest
  Work Experience entry in `lib/constants.ts`, logo at
  `public/assets/company/monudesk.png`. Timeline dates pulled back in from 150% → 126% of the card width so
  they sit beside the icon like the live-site reference.
- **2026-07-05** — Homepage hero properly centered: `.header_info` was pinned
  by its right edge (`right: 38%` + per-breakpoint patches 23%/7.5%), which
  only looked centered at one width. Replaced with `left: 50% +
  translateX(-50%)` — true center at any viewport; media-query overrides
  removed.
- **2026-07-05** — **Source badge feature:** posts can link back to the
  original social post. New nullable `Post.sourceUrl` column (migration
  `20260705150000`), exposed through GraphQL (`Post.sourceUrl` +
  `PostInput.sourceUrl`), "Original post link" field in the admin form, and a
  `SourceBadge` component that detects the platform from the URL hostname
  (LinkedIn/FB/Instagram/YouTube/X, generic link icon otherwise) — shown as a
  round icon pinned bottom-right on blog cards (a sibling of the card Link, so
  clicking it opens the platform) and inline in the single-post meta row.
- **2026-07-05** — Blog grid polish round 2: grid rows no longer stretch cards
  to the tallest sibling (`align-items: start` — the actual cause of the dead
  space); preview line-clamp hardened with `line-clamp` + max-height fallback
  (tooling can strip `-webkit-box-orient`); filter bar left-aligned and
  modernized — pill-shaped search with magnifier icon + focus ring.
- **2026-07-05** — Polish: intro preloader ("Dedicated, Passionate,
  Inquisitive") is now homepage-only — `PreLoader` returns null unless
  `usePathname() === '/'`, so /blog, /blog/[slug] and /admin never ship the
  overlay markup at all (no intro, no blink; verified in server HTML). It
  replays whenever the user lands on Home. This replaced an earlier
  sessionStorage/pre-paint-script approach that still blinked; blog card meta pinned to the card bottom (`margin-top: auto`)
  so grid-stretched cards don't end in a dead zone below the date; pointer
  cursor on the blog/admin filter dropdowns.
- **2026-07-05** — **Blog upgrade (DB-backed):** `Post.number` column
  (creation-order, backfilled by createdAt, assigned max+1 on create) shown on
  blog cards + admin table; server-side tag/search filtering on `posts` query +
  new `tags` query with a search box + tag dropdown on `/blog`; tag input
  normalized in resolvers (split on commas/spaces, strip `#`) with migration
  repairing legacy rows like `'#A #B #C'`; cover images get a shimmer skeleton
  + spinner + fade-in (`CoverImage.tsx`); tag chips restyled (roomier, bordered,
  CSS-drawn `#`). Migration `20260705120000` must be deployed to Neon.
- **2026-07-05** — **Production migration completed.** Merged staging → main
  (resolved 3 conflicts from a legacy hotfix vs the restructure), repointed
  Vercel Root Directory `_legacy_portfolio` → `frontend`, added
  `NEXT_PUBLIC_GRAPHQL_URL`/`NEXT_PUBLIC_API_URL` env vars, reset the prod
  admin password against Neon. najrul.com now serves the Next.js app with
  working blog + admin. Deployment topology documented in the Overview section.
- **2026-07-04** — **Root cause of all the admin layout weirdness found and
  removed:** `styles/sections/animation.css` had a legacy leftover rule
  `section span { transform: translateX(-100px) }` that silently shifted every
  span inside every section 100px left, site-wide (admin email out of its pill,
  status badges out of their column, login labels out of their card, the status
  filter overlapping the search box). Nothing in the codebase animated it;
  deleted. Verified gone from the CSS served by the dev server.
- **2026-07-04** — Admin header polish: restored the bordered pill around
  email + Sign out (inline-flex so it shrink-wraps tightly), and replaced the
  native select arrow with a custom token-colored chevron, vertically centered
  with proper spacing (`.admin_select_wrap`). Verified via headless-Edge render.
- **2026-07-04** — Admin "Manage Posts" improvements: numbered `#` column
  (hidden in the stacked mobile layout), client-side search (title/slug/tag)
  + status dropdown (All/Published/Drafts) in the toolbar with a "no matching
  posts" empty state, and the email/sign-out pill background removed — plain
  email text + button, fixing the email overflowing the pill's edge.
- **2026-07-04** — Admin "Manage Posts" UI fixes: action buttons were escaping
  the table card (`display:flex` was applied to the `<td>`, breaking table
  layout — moved to an inner `.admin_actions` wrapper), and the email/sign-out
  pill no longer floats fixed in the viewport corner — it now sits inline in
  the page header next to the title.
- **2026-07-04** — Fixed recurring backend `EADDRINUSE`: added
  `backend/scripts/free-port.cjs` as a `predev` hook (auto-kills a stale/duplicate
  backend holding the port, never unrelated apps), friendly `EADDRINUSE` error
  message, and graceful SIGINT/SIGTERM shutdown in `backend/src/index.ts`.
- **2026-07-04** — Created this documentation file and the `/update-docs`
  command; documentation is now updated after every change set.
- **Pre-doc history (from git):** toned down homepage entrance animations
  (`425d576`); blog posts open in new tab at `/blog/:slug` (`6c3649a`); Vercel
  outDir fix (`31266b2`); Linux case-sensitivity import fix (`6d79fb1`);
  monorepo restructure with Next.js frontend + Express/Apollo backend
  (`1dce8a3`); legacy Vite app fully ported then removed.
