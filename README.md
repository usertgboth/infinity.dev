# Infinity — describe it, and it builds

AI-powered automation builder. Lovable-style UX on top of the n8n execution engine.

> Type what you want in plain English. The AI assembles an n8n workflow live on the canvas. Click Activate — it runs.

## Architecture

```
infinity.dev/
├── web/        ← Next.js 15 + Tailwind + Prisma + NextAuth + OpenAI (this is what we deploy)
└── n8n/        ← Official n8n monorepo (cloned separately, NOT pushed). Runs on :5678.
```

- **Frontend / control plane:** `web/` — chat UI, live ReactFlow canvas, auth (Google + email),
  admin panel, Prisma-backed metadata DB.
- **Execution engine:** n8n. The frontend pushes generated workflows to n8n via REST API
  (`/api/v1/workflows`) so the user gets all 400+ official integrations.

## Quick start (web only)

```bash
cd web
cp .env.example .env
# fill OPENAI_API_KEY at minimum; Google + n8n optional
npm install
npm run db:push
npm run dev
```

Open <http://localhost:3000>.

## Run n8n alongside (recommended)

```bash
# In a separate terminal
git clone --depth 1 https://github.com/n8n-io/n8n.git
cd n8n
npx n8n         # or: pnpm install && pnpm run start
```

Then in n8n UI (<http://localhost:5678>) go to **Settings → n8n API** and create an API key.
Put it in `web/.env` as `N8N_API_KEY=...`.

## Environment variables

See `web/.env.example`. The important ones:

- `OPENAI_API_KEY` — required for AI generation
- `NEXTAUTH_SECRET` — `openssl rand -base64 32`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — optional, for Google sign-in
- `N8N_BASE_URL` / `N8N_API_KEY` — optional, to actually execute workflows
- `ADMIN_EMAIL` — the first user with this email becomes ADMIN automatically

## Deploy

The `web/` folder is a stock Next.js app. Deploy to Netlify / Vercel / Render. For production,
swap SQLite for Postgres in `web/prisma/schema.prisma` and set `DATABASE_URL` accordingly.

## License notes

- This project's code: MIT.
- n8n itself: [Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/LICENSE.md).
  We do not redistribute n8n; we depend on it as a separate service.
