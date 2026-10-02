# Principles of MESLO (Next.js)

Next.js 16 app for The Principles of MESLO.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- pnpm

## Local Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Production Build

```bash
pnpm build
pnpm start
```

## Content and Assets

Markdown content lives in:

- `content/pages`
- `content/services`
- `content/team`

Static assets are served from:

- `public/`
- `public/images/`

## Netlify Deployment

This repo is configured for Netlify + Next.js via [`netlify.toml`](./netlify.toml).

### Build Settings

- Build command: `pnpm build`
- Publish directory: auto-managed by `@netlify/plugin-nextjs` (do not set manually)
- Node version: `20`

### Deterministic Deploy Workflow (No GitHub Required)

Deploy target mapping:
- Test (draft): `https://incandescent-marshmallow-ed1d61.netlify.app/`
- Live (production): `https://principlesofmeslo.com`

1. Draft/test deploy:

```bash
pnpm run deploy:test
```

2. Production deploy to live domain:

```bash
pnpm run deploy:prod
```

Equivalent raw CLI commands:

```bash
pnpm exec netlify deploy --build --site a8f5c70a-e58b-42d7-9b73-b4cf2bdac105
pnpm exec netlify deploy --build --prod --site a8f5c70a-e58b-42d7-9b73-b4cf2bdac105
```

### One-Time Setup

```bash
pnpm install
pnpm exec netlify login
```

### Recommended Environment Variables

Set these in Netlify Site Settings -> Environment Variables:

- `NEXT_PUBLIC_SITE_URL=https://principlesofmeslo.com` (required for correct absolute metadata URLs)

### Notes

- Do not set a static publish folder for this Next.js app; the Netlify Next runtime handles output.
- If build caching causes stale output, clear cache and redeploy from Netlify.
