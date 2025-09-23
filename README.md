# Gamez24

Gamez24 is a small deals aggregator for PC games. It collects deals and free-to-keep offers (Steam, Epic, GOG) and presents them in a modern, responsive UI with carousels, cards and quick claim/view flows.

This repository uses Next.js (App Router) + TypeScript and is organised for fast iteration and contributor friendliness.

## Highlights / Features

- Aggregates deals from multiple sources (Steam scraping, APIs + Epic API + GOG API + third parties)
- Responsive game cards with hover, animated carousel and modal interactions
- Country selector & currency handling with Zustand global state
- Claim / View flows with client-side toasts
- Server-side HTML parsing for Steam pages using `jsdom` (extracts header image, free-until date, review summary, original price)
- Optional client caching with TanStack Query (recommended) for fast navigation

## App structure (top-level)

Key folders in `app/`:

- `app/layout.tsx` — global layout, theme and providers
- `app/page.tsx` — home page
- `app/deals/` — deals pages and layout
- `app/dealsU5/` — alternate deals view (your `dealsU5` page + nested routes)
- `app/gameSearch/` — search UI
- `app/auth/` — login / signup
- `app/privacyPolicy/`, `app/tos/`, `app/user/` — static/legal/user pages

Other important folders:

- `components/` — UI components (GameCard, DealsSection, Carousel, Modal helpers, Header, etc.)
- `lib/` — data & scraping logic (e.g. `steamGames.ts`) and helpers
- `data/` — mock dataset (e.g. `mock-games.ts`)
- `public/` — static assets
- `types/` — TypeScript types and API shapes

## Tech stack

- Next.js App Router (TypeScript)
- React + Tailwind CSS (v4)
- Zustand for lightweight state
- shadcn/ui + Radix primitives
- sonner for toast notifications
- jsdom for server-side HTML parsing of Steam pages

## Backend (Kotlin Spring Boot)

This project uses a dedicated backend service (Kotlin + Spring Boot) for user accounts, authentication, tracking claimed games, storing user stats (money saved, claims history) and search endpoints. The backend lives in a separate repository — add your production/staging repo URL here.

- Backend repository: https://github.com/devpool007/springboot-gamez24

Responsibilities of the backend service:

- User signup / login / JWT auth and session validation
- Persisting claimed games and calculating user stats (money saved, claim counts)
- Providing search endpoints and advanced filtering for games (seperate Python FastAPI backend)
- Handling user settings and preferences
- Any protected or rate-limited endpoints that should not be called directly from the client

Frontend integration notes:

- The frontend may call backend endpoints from client components or via Next.js server actions (`lib/actions/*`) depending on whether the call needs to be server-side.
- Configure the backend base URL in the frontend environment (for example in `.env.local`):

```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_PYTHON_BACKEND=https://api2.example.com
```

- For authenticated calls, the frontend uses tokens (e.g. JWT) returned by the backend. Keep auth tokens in secure httpOnly cookies or use a secure client-side storage strategy and follow best practices.

- If you run the backend locally, update `NEXT_PUBLIC_API_BASE_URL` to point to your local backend (for example `http://localhost:8080`).

Security note: do not commit backend secrets or credentials. Use environment variables and a secret manager in production.

## Quick start (local development)

Requirements: Node 18+, npm/yarn/pnpm

1. Clone

```bash
git clone https://github.com/<your-org>/gamez24.git
cd gamez24
```

2. Install dependencies

```bash
npm ci
# or
pnpm install
```

3. Run dev server

```bash
npm run dev
```

Visit http://localhost:3000

## Useful scripts

- `dev` — start Next.js in dev mode
- `build` — build for production
- `start` — start production server
- `lint` — run ESLint
- `typecheck` — run TypeScript checks

See `package.json` for the exact commands.

## Developer notes and gotchas

1) Steam scraping and cookies

- Steam data is parsed by fetching store HTML and using `jsdom` to extract fields. Some pages have age-gates; the project uses a cookie header when fetching individual game pages to bypass age prompts:

```js
'cookie': 'birthtime=788914801; lastagecheckage=1-January-1995; wants_mature_content=1'
```

- Scraping is brittle. Consider using official APIs where possible, and use respectful rate-limiting.

2) next/image domains

- Add remote hostnames used for images to `next.config.ts` (e.g. `shared.akamai.steamstatic.com`, `shared.fastly.steamstatic.com`, `steamcdn-a.akamaihd.net`) otherwise Next.js will block `next/image` loads with an "Invalid src prop" error.

3) TypeScript + running scripts

- This repo uses ESM-style module settings for Next.js. When running TypeScript files directly with `ts-node`/`tsx`, Node resolution and import extensions can be tricky:
	- For in-app code (pages/components), use extensionless imports (e.g. `import { X } from '@/data/mock-games'`).
	- For standalone scripts executed with `ts-node`, you may need `moduleResolution: 'node'` in `tsconfig.json` or to include `.ts` extensions depending on your toolchain.

4) Modal positioning inside a carousel

- If a modal is rendered inside a scrollable element (carousel), render it using a React portal (`createPortal`) to `document.body` so it stays centered and overlays the whole viewport.

5) Caching / persistence across navigations

- Server caching: use `fetch(url, { next: { revalidate: <seconds> } })` to enable ISR on server requests.
- Client caching: use TanStack Query (React Query) or SWR in a client component to cache per-user data and provide instant navigation without refetching.

## Recommended: API route + React Query example

Create a simple API route (e.g. `app/api/steam-under-5/route.ts`) that returns fetched & parsed Steam data, then use a client component with TanStack Query to fetch that endpoint. This caches in the browser and gives instant back/forward navigation for users.

## Contributing

Thanks for looking to contribute! The project accepts issues and PRs.

How to contribute:

1. Open an issue describing the bug/feature.
2. Fork and create a topic branch for changes.
3. Run lint/typecheck and add tests where appropriate.
4. Open a PR and reference the issue.

Suggested PR checklist:

- [ ] The code builds and runs locally
- [ ] Linting passes (`npm run lint`)
- [ ] Types/checks pass (`npm run typecheck`)
- [ ] Tests added or updated when applicable
- [ ] Changes documented in README or code comments where helpful

If you'd like, I can add ISSUE / PR templates and a GitHub Actions workflow to run lint/typecheck on PRs.

## Security & license

- Do not commit secrets or API keys.
- Treat scraping respectfully and avoid overloading third-party servers.

Suggested license: MIT (add `LICENSE` file if you accept)

---

If you want, I can commit this README for you and/or create the API route and React Query scaffolding to make client caching easy for contributors. Which would you like next?
