# JUN RUI LO

Next.js portfolio site with TypeScript, Tailwind CSS, and Zustand. Deployed on Netlify.

## Setup

```bash
npm install
```

Copy `.env` with Cloudinary credentials:

```
CLOUDINARY_NAME=...
CLOUDINARY_KEY=...
CLOUDINARY_SECRET=...
ABOUT=about_1,about_2,about_3
INSTAGRAM=instagram
EMAIL=email
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start local server
- `npm run build` — production build
- `npm start` — serve production build

## Deploy (Netlify)

Build settings are in `netlify.toml` (`npm run build`, publish `.next`, Node 20).

### One-time cleanup in the Netlify UI

Old CRA settings will break this site. In **Site configuration**:

1. **Build & deploy → Build settings** — clear any override that still uses publish directory `build` or a Functions directory of `functions`. Prefer letting `netlify.toml` win (or set publish to `.next`).
2. **Redirects** — remove any `/* → /index.html` SPA fallback.
3. **Environment variables** — add the same keys as in `.env` above (server-only; no `REACT_APP_` / `NEXT_PUBLIC_` needed for Cloudinary).
4. Trigger a new deploy after pushing `netlify.toml`.

Your custom domain DNS can stay as-is; only the app build/runtime changed.
