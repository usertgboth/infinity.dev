# Infinity — describe it, and it builds

AI-native automation platform. Type what you want, ship it in 60 seconds.

> Describe an automation in plain English. The AI assembles the workflow on a live canvas. Click Activate — it runs in production.

## Architecture

```
infinity.dev/
└── web/        ← Next.js 15 + Tailwind + Prisma + NextAuth + OpenAI
```

- **Frontend / control plane:** chat UI, live ReactFlow canvas, auth (Google + email),
  admin panel, Prisma-backed metadata DB.
- **Workflow runtime:** internal execution engine handles 400+ integrations and pushes
  generated workflows live with retries, schedules, and logs.

## Quick start

```bash
cd web
cp .env.example .env
# fill OPENAI_API_KEY at minimum
npm install
npm run db:push
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

See `web/.env.example`. The important ones:

- `OPENAI_API_KEY` — required for AI generation
- `NEXTAUTH_SECRET` — generate via `openssl rand -base64 32`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — optional, for Google sign-in
- `DATABASE_URL` — Postgres connection string for production
- `ADMIN_EMAIL` — the first user with this email becomes ADMIN automatically

Internal runtime credentials are documented privately for the team.

## Deploy

The `web/` folder is a stock Next.js app. Deploy to Vercel, Render, or any Node host.
For production, set `DATABASE_URL` to a Postgres URL.

## License

MIT for our code. Internal runtime components carry their own licenses; see the team docs.
