# Usagi Art — Art Shop

Handmade acrylic paintings and small goods from Usagi Art. This is the stall website: shop, collections, custom orders, and studio notes.

Live site: https://usagi0000.github.io/usagi-shop/

## Run locally

Need Node.js 20+ and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build
pnpm start
```

runs the production Next.js server on port 3000.

## GitHub Pages

The live site is a static export (GitHub Pages has no Node server). Each push to `main` builds and deploys via GitHub Actions.

Local `pnpm dev` still uses the Next.js server, so custom orders, the cart, and writing studio notes work on your machine. On GitHub Pages, custom orders still send by email. New studio notes only show after they are added under `content/blog/` and the site is rebuilt.
