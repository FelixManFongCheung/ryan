# JUN RUI LO

Next.js portfolio site with TypeScript, Tailwind CSS, and Zustand. Deploy on Vercel.

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

## Deploy (Vercel)

1. Import the Git repo in the [Vercel dashboard](https://vercel.com/new).
2. Framework preset: **Next.js** (auto-detected).
3. Add the same environment variables listed above.
4. Deploy.

Or from the CLI:

```bash
npx vercel
```
