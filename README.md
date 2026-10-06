# The Principles of MESLO

Official repository for [principlesofmeslo.com](https://principlesofmeslo.com), the digital home of **The Principles of MESLO** by David Molina.

MESLO is an estimating and operational framework built around a simple principle: **Know your number.**

The framework helps contractors, estimators, entrepreneurs, and organizations understand the complete economics of a job, service, or project, from direct costs through overhead, profit, and taxes.

## About MESLO

The MESLO framework organizes estimating and pricing around:

- **M** — Materials
- **E** — Equipment
- **S** — Subcontractors
- **L** — Labor
- **O** — Other costs

The complete estimating methodology also accounts for insurance and bonding, overhead, profit, and taxes.

This repository powers the public MESLO platform, including:

- Book and educational resources
- Library distribution
- Institutional adoption
- MESLO tools and resources
- Future educational and digital products

## Links

- Website: https://principlesofmeslo.com
- Library requests: https://principlesofmeslo.com/library
- Institutional adoption: https://principlesofmeslo.com/institutions
- Author: https://davidcmolina.com

## Technology

Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Rights and Content

Website source code may be open; *The Principles of MESLO*, MESLO content, book excerpts, graphics, trademarks/branding, educational materials, and other proprietary content remain © David Molina / applicable rights holder, all rights reserved.

---

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
