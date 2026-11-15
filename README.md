# Rachel & Alex's Wedding

The website for Rachel and Alex's wedding on September 12, 2027, live at
**https://gossjones2027.com**.

It's a static site built with [Astro](https://astro.build) and React, with two pages (Home and
FAQs) and a 404 page. Visitors get plain HTML and CSS plus a few small scripts; no React runs in
the browser. It's hosted on Cloudflare, and every push to `main` deploys it.

## Getting started

You'll need [mise](https://mise.jdx.dev), which installs the right versions of Node and bun (set in
`.node-version` and `packageManager` in `package.json`).

```sh
mise install
bun install
bun run dev
```

The dev server runs at http://localhost:4321.

## Commands

| Command | What it does |
|---|---|
| `bun run dev` | Start the dev server at `localhost:4321` |
| `bun run check` | Type-check the project (`astro check`) |
| `bun run build` | Build the site to `dist/` |
| `bunx wrangler dev` | Serve `dist/` the way Cloudflare does, after a build |
| `bun astro …` | Run other Astro CLI commands |

Use `bun run build`, not `bun build`: the latter is bun's own bundler, not the project's build
script.

## Where things are

| Path | What's there |
|---|---|
| `src/data/` | Site details and copy: date, venue, schedule, FAQs, contact email |
| `src/pages/` | The pages: `index.astro`, `faqs.astro`, `404.astro` |
| `src/layouts/BaseLayout.astro` | The shared page shell: head, header, footer, scripts |
| `src/components/` | React components: page sections in `sections/`, shared pieces in `ui/` |
| `src/styles/` | Design tokens (`tokens.css`) and global styles |
| `src/scripts/` | Small browser scripts: scroll reveal, nav underline, shy header |
| `src/assets/` | Images and fonts. `placeholder/` holds images still to be replaced |
| `public/` | Files served as-is, including `_headers` for Cloudflare |
| `docs/` | Deploy notes, plans and the test backlog (see below) |

Most copy changes only touch `src/data/`.

## Deploying

Merge to `main` and Cloudflare builds and deploys the site. Changes that only touch docs don't
trigger a deploy. Details, previews and rollbacks are in [docs/deploy.md](docs/deploy.md).

## Docs

- [docs/deploy.md](docs/deploy.md): how hosting and deploys work, and which settings live in the
  Cloudflare dashboard.
- [docs/todo/tests.md](docs/todo/tests.md): the backlog of tests to write.
- [docs/plans/](docs/plans/): finished plans, kept as a record.
- [AGENTS.md](AGENTS.md): conventions and project notes for AI coding agents, also useful for
  people.
