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
    api/contact/route.ts#   POST /api/contact — contact form → Resend email
    resume/page.tsx     #   /resume — PDF viewer + download (new tab from CTA)
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
  deliberately toned down (commit `425d576`). The preloader overlay is removed
  from the DOM only after its CSS fade-out fires `animationend`
  (`lib/animation.ts`) — never on a fixed timer, which used to cut it off
  mid-fade. Work-experience timeline cards slide in on scroll (odd from the
  left, even from the right) via an IntersectionObserver in
  `components/sections/Experience.tsx` + rules in
  `styles/sections/experience.css`; the timeline library's own reveal stays
  disabled (`animate={false}`) because its sensor doesn't fire under the App
  Router.
- **Contact form (Resend):** the form POSTs to the Next.js route
  `app/api/contact/route.ts`, which calls Resend's REST API server-side
  (`RESEND_API_KEY` never reaches the browser). Replaced EmailJS 2026-07-06 —
  its Gmail OAuth grant expired and every submission had been failing silently
  (verified live: 412 "Gmail_API: Invalid grant"). The route validates input,
  sends plain-text email (no HTML injection surface), sets `reply_to` to the
  visitor's address, and drops bot submissions via a hidden "company" honeypot
  field (returns fake success). The form shows real states now: button disables
  to "Sending...", green success note (form clears only then), red failure note
  telling the visitor to email directly (typed message is preserved).
  Until najrul.com is verified in Resend, sender must stay
  `onboarding@resend.dev` and Resend only delivers to the account owner's own
  email — sign up with the inbox that should receive the messages.

## 5. Environment variables

| App | Variable | Purpose |
|---|---|---|
| backend | `DATABASE_URL` | Postgres connection string |
| backend | `PORT` | listen port (default 4000; local dev uses 4001) |
| backend | `CORS_ORIGIN` | comma-separated allowed origins |
| backend | `JWT_SECRET` | JWT signing secret |
| frontend | `NEXT_PUBLIC_GRAPHQL_URL` | GraphQL endpoint (inlined into bundle) |
| frontend | `RESEND_API_KEY` | Resend API key for the contact form (server-side only — no `NEXT_PUBLIC`; set in `.env.local` and on Vercel) |
| frontend | `CONTACT_TO_EMAIL` | contact form recipient (optional, defaults to nazrul2517@gmail.com — must be the Resend account owner email until the domain is verified) |
| frontend | `CONTACT_FROM_EMAIL` | contact form sender (optional; leave unset until najrul.com is verified in Resend) |

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

## 8. Open items — pick up here (state as of 2026-07-06)

**Branch state:** the 2026-07-05 portfolio rebuild is fully shipped — PR #18
merged `feature/portfolio-media-rebuild` → `staging`, PR #19 merged `staging` →
`main`; najrul.com serves it. Real MonuDesk tags + monudesk.com/remembertag.com
demo links went in before the merge. Uncommitted on `staging`: the 2026-07-06
contact-form Resend migration (see Change History).

**Short-term to-dos:**

1. **Finish the Resend setup (contact form is dead until this is done):**
   create a Resend account with nazrul2517@gmail.com, create an API key, put it
   in `frontend/.env.local` and on Vercel (`RESEND_API_KEY`, Production +
   Preview), test locally, then commit/push the migration. Optionally verify
   najrul.com in Resend (2 DNS records at Namecheap) and set
   `CONTACT_FROM_EMAIL` for a branded sender.
2. **Rotate the Neon DB password** — the connection string (incl. password) was
   pasted into a chat session on 2026-07-05. Neon → Roles → reset
   `neondb_owner` password, then update `DATABASE_URL` on Render → Environment.
3. **testing.najrul.com** — Vercel domain + Namecheap CNAME (`testing` →
   cname.vercel-dns.com) may still need to be added/verified; once live, append
   `,https://testing.najrul.com` to `CORS_ORIGIN` on Render.
4. Second Vercel project `portfolio-naj` is probably redundant — verify and
   delete to stop duplicate PR checks.
5. ~20 Skills icons still hotlink external sites (only CSS/JS/Netlify/
   VS Code were localized after their links rotted); Go High Level even uses
   the flaky `i.ibb.co.com` domain variant — localize the rest into
   `public/assets/skills/`.
6. Review the portfolio card descriptions (drafted, plain-HR-language) and
   the Monudesk experience bullets — user's voice, user should approve.
7. Verify the source-badge feature live: edit a post in /admin, paste its
   LinkedIn URL into "Original post link", check the badge on the blog card.
8. Soundmade project card still has no demo/GitHub links (intentional for now).

**Feature backlog:**

- Blog categories + search UI polish (server-side tag/search filters shipped
  2026-07-05; categories concept TBD).
- Vercel Web Analytics (`@vercel/analytics`) on the Next.js app.
- **AI semantic search over blog posts (RAG):** embed post content with an LLM
  embeddings API, store vectors in PostgreSQL via `pgvector`, and answer
  natural-language queries against the blog. Goals: (a) a live, demonstrable
  AI feature on the portfolio, (b) legitimate resume claims for RAG / vector
  DB / LLM API integration. Builds on the planned blog search above — do after
  first prod deploy.

---

## Change History

Newest first. One line per change set: date — what & why.

- **2026-11-17** — **Monudesk role ended + Dennis Rodin testimonial.** Monudesk
  dates changed from "PRESENT" to "June 2025 - November 2026" in
  `lib/constants.ts` (home Experience) and `lib/resume.ts` (/resume). Added
  Dennis Rodin's LinkedIn recommendation as the first entry of
  `testimonialData`. Its avatar (`public/assets/clients/client24.png`) is a
  temporary low-res crop from a screenshot and should be swapped for a proper photo.
  About cards updated: Clients 30+, Projects 70+, and Experience is now computed
  as `currentYear - 2022` (first role, Vector Design, Jan 2022) in `About.tsx`,
  so it increments every January with no manual edit.
  Testimonials: `Testimonial` gained optional `link` and `date`. The LinkedIn
  badge is now a link (per-item `link`, else the profile's recommendations page
  built from `resume.contacts.linkedin`); `date` renders after the title.
  NazTank game: added as the second portfolio card, after MonuDesk (id 11,
  `public/assets/projects/naztank-1.jpg`) and offered in a new home-only
  floating pill, `components/layout/GameBanner.tsx` + `styles/sections/game-banner.css`
  ("Play NazTank" / "Stay professional" / close; dismissal kept in
  sessionStorage; moves to the bottom on phones). Both read `GAME_PORTFOLIO_URL`
  from `lib/constants.ts`.

- **2026-08-22** — **Dependabot alert fixes (lockfile only).** `npm audit fix`
  bumped transitive deps flagged by GitHub: `nanoid` 3.3.12→3.3.18 (via
  postcss), `js-yaml` 4.1.1→4.3.1 (via eslint), `brace-expansion`
  1.1.14/2.1.0/5.0.6→1.1.18/2.1.4/5.0.9 (via minimatch under eslint, glob,
  nodemon, typescript-estree); also body-parser, form-data, multer, qs.
  No source changes; build verified. Remaining `npm audit` items need major
  upgrades (next 14→16, postcss, @apollo/server 4→5, swiper, eslint-config-next)
  and are deliberately left for a separate, tested upgrade.

- **2026-07-07** — **Preloader exit + experience scroll reveal.** (a) The
  preloader "jumped off" instead of fading: `preLoaderAnim` display:none'd the
  overlay on a fixed 4.6s timer measured from navigation start, but the CSS
  fade's clock starts at first paint — whenever paint lagged, JS killed the
  overlay before the fade finished. Now it waits for the `preloader-out`
  `animationend` event (9s timeout kept only as a scroll-unlock safety net;
  also skips cleanly when the overlay is media-query-hidden ≤1024px or the
  fade already ended pre-hydration). (b) Work-experience timeline cards now
  slide in on scroll — odd cards from the left, even from the right — via an
  IntersectionObserver adding `.timeline-card-visible` + transitions in
  `experience.css` (wrapped in `prefers-reduced-motion: no-preference`;
  `overflow-x: clip` on html/body prevents sideways scrollbar). Only the card
  BODY moves: the center-line icon is a sibling (untouched), and the date —
  a DOM child of the sliding box — gets an inverse translate on desktop so it
  stays pinned beside the icon. (c) Restored the hero's scroll-down arrow:
  its legacy `left: 230%` was relative to the old shrink-to-fit
  `.header_info`; after that box became width:100% the arrow sat ~2
  screen-widths off-canvas (same root cause as the earlier `.coffee` fix).
  Now `left: 82% / top: 250%` — bottom-right of the hero, below the coffee
  badge.
- **2026-07-07** — **Blog post footer (traction package).** Below every
  /blog/[slug] post (`components/blog/PostFooter.tsx`): author card (photo,
  blurb, View Portfolio + Let's Talk CTAs), a "Join the discussion on
  LinkedIn" pill when the post has a `sourceUrl` (readers engage on the
  original LinkedIn post — the traction loop), share buttons
  (LinkedIn/X/copy-link), and "Read next" (3 related posts: first-tag matches
  topped up with latest, deduped, current excluded). Plus per-post OpenGraph
  and Twitter-card metadata via `app/blog/[slug]/layout.tsx` generateMetadata
  (server fetch to GraphQL, 5-min revalidate, absolute image URLs, graceful
  fallback when the backend sleeps) — shared blog links now unfurl with
  title/excerpt/cover. Gotchas: the site footer's bare `footer {}` gradient
  leaked into the component (root is a <div> now), and when verifying with
  mocked GraphQL responses, Apollo's normalized cache let the unpatched list
  query overwrite the patched single-post entity — patch every query that
  returns the entity. ⚠ Discovered during testing: `backend/.env`
  DATABASE_URL points at PROD Neon, so local `npm run dev:backend` serves
  production data — mind mutations, and it raises the urgency of the pending
  password rotation (§8).
- **2026-07-07** — **/resume rebuilt as a native styled page** (replaces the
  `<object>` PDF embed): content lives in `lib/resume.ts` (mirrors
  public/Resume.pdf — update both together), rendered by `app/resume/page.tsx`
  with accent-highlighted metrics (`**...**` markers in the data → `.resume_hl`
  <mark>s), skill/stack chips, sticky toolbar (Back + Download PDF, which
  still serves the real file). Fixes mobile too — no PDF plugin needed.
  Gotchas hit: the global list reset strips `ul` discs (restored per-`li`),
  and the bare `header {}` height:68vh landmine leaked into the toolbar
  <header> on ≤600px (height:auto override, same fix as blog). Round headshot
  added at the top (official photo → `/assets/najrul-official.webp`, 512px
  webp 13KB, gradient-accent ring) and each experience entry shows its
  company logo (white chip, reuses `/assets/company/*`, optional `logo`
  field in `lib/resume.ts`).
- **2026-07-06** — **Portfolio cards: company badge.** New optional
  `companyName`/`companyLogo` on `PortfolioItem` — renders a top-left pill on
  the card cover (round white-backed logo + name, same language as the
  "+N more" pill) showing which company the project was built at. Set for
  MonuDesk + RememberTag (Monudesk), Invent (Invent), Soundmade (XIIA), and
  all six practice projects (Programming Hero) — every card is badged.
- **2026-07-06** — **Homepage polish round (user feedback):** (1) section gap
  tightened — global `section { margin-top }` 8rem → 5rem (7rem → 4.5rem
  ≤1024px); the hero-to-About hole also included the sections' pre-animation
  translate offset, but the margin was the fixed part. (2) Nav dock hidden on
  /resume (it floated over the PDF; same early-return as /blog in Nav.tsx).
  (3) Work-experience timeline entries trimmed to 3-5 bullets each
  (`constants.ts` — Monudesk 8→5, XIIA 5→4, NeoTec 5→3, Invent 7→4, Vector
  7→4; all metrics kept; wording is Claude's condensation — user should
  review). (4) Portfolio coverflow got desktop prev/next arrow buttons
  (`.portfolio_carousel_nav`, same look as the modal gallery arrows;
  disabled at the ends via onSlideChange state — Swiper mutates
  isBeginning/isEnd without re-rendering React; hidden ≤720px where swiping
  is natural). Verified via Playwright: arrows advance slides, margin 80px.
- **2026-07-06** — **Resume: view-first instead of force-download.** The
  homepage CTA (`CTA.tsx`, relabeled "View Resume") now opens a new `/resume`
  page in a new tab: slim toolbar (back link, title, Download PDF button) over
  an inline `<object>` PDF viewer filling the viewport; browsers that can't
  embed PDFs (most phones, and headless test browsers) get a centered fallback
  card with the download button. Download filename set to
  `Najrul-Sumon-Resume.pdf`. New `styles/sections/resume.css` (tokens only).
  Note: `public/` holds TWO copies of Resume.pdf (root + assets/) — everything
  points at the root one; the assets/ copy is unused legacy.
- **2026-07-06** — **Preloader redesigned (matrix intro, animates from first
  paint).** The old intro sat FROZEN for 1-2s on cold loads: the GSAP word
  entrance and the react-loader-spinner Dna (styled-components) both waited
  for React hydration, so users saw a static screen that then jumped and
  replayed. New intro is 100% CSS (starts on the first painted frame): brand-
  colored code rain (18 deterministic columns — index-derived glyphs, no
  Math.random, or SSR/client hydration would mismatch), a monospace terminal
  line that types "> Dedicated. Passionate. Inquisitive." via steps() with a
  blinking-caret border, then vaporizes (blur + letter-spacing + drift), then
  the overlay fades (opacity+visibility keyframe with `forwards` = the page
  is usable even if JS never runs). JS (`preLoaderAnim`) now only locks scroll
  and display:none's the overlay at ~4.6s — measured from nav start on first
  load but from mount on client-side returns to Home (else the replay would be
  cut short). react-loader-spinner uninstalled (drops styled-components too).
  prefers-reduced-motion gets a quiet fade version. Verified via Playwright
  VIDEO frames — note for future: page.screenshot() fast-forwards finite CSS
  animations (overlay looks missing in stills); use recordVideo for anything
  animation-timing-related.
- **2026-07-06** — **Contact form: EmailJS → Resend.** Live test caught every
  submission failing with 412 "Gmail_API: Invalid grant" (EmailJS's Gmail OAuth
  grant expired) while the UI pretended success — errors only went to
  console.log and the form reset regardless. New server-side
  `app/api/contact/route.ts` calls Resend's REST API (key in `RESEND_API_KEY`,
  never in the browser; plain-text email; `reply_to` = visitor; honeypot
  anti-spam), `Contact.tsx` POSTs to it with real UI states (disabled
  "Sending..." button, green success + form clear only on success, red failure
  keeps the typed message), `emailjs-com` uninstalled. Needs Resend account +
  env var before it delivers (§8 to-do 1).
- **2026-07-05** — **Contact/social links refreshed:** displayed email fixed
  to nazrul2517@gmail.com (was showing nazrul171992@); WhatsApp number →
  01845393505 (link uses 8801845393505, shown under the card title; also
  fixed a mangled target/rel attribute on the mail link). Instagram + Facebook
  removed from the footer; Instagram removed from the header socials rail
  (LinkedIn + GitHub only). LinkedIn profile URL corrected everywhere to
  /in/najrul1704. Footer Twitter/X link → x.com/MDNazru67844430. Verified
  rendered hrefs via Playwright. (the `* { font-weight: 700 }`
  landmine is DEAD).** animation.css force-bolded every element, and since
  Poppins only loaded weights 300-600 the browser synthesized fake bold on
  top — the whole app (visibly the About section) read heavy and slightly
  off. Removed the rule + a stray Inter @font-face (700, Latin-Ext-only
  unicode-range — could render odd glyphs in a different family). Weights
  now: body 400, h1-h5 500 (globals.css), per-component rules for the rest;
  added real Poppins 700 to the Google Fonts import so genuine bold
  (markdown <strong>, preloader words, header watermark) renders true bold.
  Normalized stragglers: portfolio .tag_css bold→600, preloader 800→700,
  Experience/Header inline 'bold'→600. Verified computed weights + About
  screenshot via Playwright. (Playwright-verified at
  360/390/430px): (1) `overflow-x: hidden` → `clip` on html+body — with
  `hidden`, anchor jumps (nav links / scroll-down arrow) could still PAN the
  viewport sideways toward sections sitting at translateX(±100px) before
  their framer slide-in runs; the page then looked shifted with content cut
  off and the fixed Blogs pill "detached". `clip` forbids horizontal
  scrolling entirely. (2) `.header_info` got `width: 100%` — as an
  abs-positioned box (`left:50%` + translate) it only shrink-wrapped to
  ~half the viewport, so on phones the typed headline + CTA buttons spilled
  off the LEFT edge. (3) `.coffee` badge re-anchored for the full-width box:
  desktop `left: 65%` (same x≈936 @1440 as the live site, verified), mobile
  `right: 1rem` (user wants it on the right side of the screen).
  polish** (all verified with Playwright/Chromium against a prod build):
  (1) In coverflow's preserve-3d space the transparent `swiper-wrapper` is a
  plane at z=0 while off-center slides sit at translateZ −100 behind it, so
  pointer rays stopped at the wrapper and every non-centered card was
  unclickable (z-index can't fix true-3D ordering; verified via
  elementFromPoint). Fix: `#portfolio .swiper-wrapper { pointer-events:
  none }` + `pointer-events: auto` back on slides — swipe still works
  (events bubble to the container), visual stacking unchanged.
  (2) Mobile "Blogs" pill moved to top 2.75rem (below the header tech-logo
  strip it overlapped); verified visible + navigates to /blog at 430px.
  (3) `.blog_section` margin-top 8rem → 2rem on ≤600px (the huge dead space
  above "Back" on /blog and /blog/[slug] in the user's screenshot). (now first in
  the carousel — real products before practice projects): MonuDesk with 3
  dashboard screenshots (order pipeline, conversations inbox, settings;
  user-supplied PNGs → webp), RememberTag with its square "3-step" marketing
  graphic + QR-scan graphic and a composed 1600×900 white-banner card cover
  (square crops badly in the 16:9 card box). Tags/descriptions are drafts —
  see to-do 1. Also fixed: coverflow slide shadows swallowed clicks on
  non-centered cards (`pointer-events: none` on `[class*='swiper-slide-shadow']`).
  Mobile fixes: blog header no longer inherits the home hero's `header
  { height: 68/70vh }` (blog.css `height: auto` override; on phones the
  Back/title/toggle rows were spread across most of the viewport), and a
  fixed top-right "Blogs" pill now shows on the home page at ≤600px (the
  bottom dock is display:none there, leaving no path to /blog; home only —
  admin keeps its own top-right pill).
  Em dashes ("—") removed from ALL user-visible strings per user preference
  (project descriptions, site title, testimonial footer `&mdash;`→`&middot;`,
  blog/admin helper texts) — code comments untouched. MonuDesk tags set to the
  real stack: `#NextJS #NodeJS #ExpressJS #GraphQL #PostgreSQL`.
- **2026-07-05** — **Portfolio: static cards + detail modal (gifs play only
  in the modal).** Cards are minimal and never autoplay: local webp cover +
  title + "View project" hint ("+N more" pill for multi-shot projects);
  description, Github/Demo buttons and the animated preview moved into a new
  `PortfolioModal.tsx` opened on card click. In the modal, the 7 classic
  projects play their ImgBB gif big (per-slide spinner — gifs are MBs; auto
  fallback to the local still if the gif host dies); Soundmade shows a
  5-screenshot scroll-snap gallery (native swipe + arrows/dots/counter).
  Esc/backdrop close, body scroll lock. Assets: legacy numbered screenshots
  renamed descriptively; Product Store + Invent card stills extracted from
  their gifs' first frames (sharp); **new project "Soundmade"** added first —
  music community app, 5 phone shots (PNG→webp ~10× smaller, originals out of
  the repo) + a composed 16:9 three-phone cover (`soundmade-cover.webp`;
  portrait shots cropped horribly in the 16:9 card box). `PortfolioItem`:
  `images: string[]` + optional `cover`/`gif`, `demo` optional (Soundmade has
  no links yet — placeholders, see to-do 1). Product Store gif URL normalized
  `i.ibb.co.com` → `i.ibb.co` (both serve it). Gif pause/canvas code deleted
  from `PortfolioMedia.tsx`; loading-shimmer/error states kept. Unused
  `1.webp` (old fitness-site screenshot matching no current project) left in
  place.
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
- **2026-07-05** — **Portfolio section rebuilt** (`PortfolioMedia.tsx`): each
  slide owns its loading state — dark 16:9 shimmer + spinner until THAT gif
  loads, fade-in, and a "Preview unavailable" state for dead gifs (the legacy
  shared loadingGif/loadedCount left spinners on loaded slides and blank
  cards on failures). Pause/play button per gif (canvas-captured first frame —
  browsers can't pause GIFs natively). New optional `description` field on
  PortfolioItem, populated for all 7 projects in plain HR-friendly language,
  shown under the card title. Card content (title/description/buttons/tags)
  centered on one axis via flex column; description explicitly font-weight 300
  (a legacy `* { font-weight: 700 }` rule was bolding it into ugliness).
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
