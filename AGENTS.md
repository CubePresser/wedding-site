## Project overview

A static Astro site (no server adapter) for Rachel and Alex's wedding, with two routes: `/` and `/faqs`. The nav's Schedule and Details links are sections of the home page (`/#schedule`, `/#details`), not separate pages.

- `.astro` files are only `src/pages/*` and `src/layouts/BaseLayout.astro`. Everything else is React in `src/components/` (`sections/` for page sections, `ui/` for shared pieces).
- Site copy and details (date, venue, schedule, FAQs, contacts) live in `src/data/*.ts`.
- Styles: design tokens in `src/styles/tokens.css`, global helpers (`.container`, `.display`, `.script`, `.flow`, `.bg-*`) in `src/styles/global.css`, and a `.module.css` next to each component. CSS Modules only scope class names, so style with classes: a bare `h2 {}` in a module applies to the whole site.
- Fonts are set up in `astro.config.mjs`: The Seasons (local WOFF2), plus Pinyon Script and Montserrat from Google Fonts.
- Use bun: `bun install`, `bun run <script>`.

## Development

When starting the dev server, use background mode and host mode:

```
bun astro dev --background --host
```

Manage the background server with `bun astro dev stop`, `bun astro dev status`, and `bun astro dev logs`.

`astro` is installed in the project, not globally, so run it through bun (`bun astro …`); a bare `astro` command isn't found.

## React components and hydration

Components render to static HTML at build time; no component is hydrated, so the browser gets no React.

- In a component that isn't hydrated, `useState`, `useEffect` and event handlers silently do nothing: effects never run and handlers are dropped.
- When a component needs state or interaction in the browser (a form, a toggle, a countdown), hydrate it by adding a `client:*` directive where an `.astro` page uses it. Prefer `client:visible` for anything below the fold, and say so in your summary: it adds about 60 KB of React for visitors.
- Small page-wide DOM effects belong in `src/scripts/` instead (see Client scripts).

## Images

- Source images are in `src/assets/images/`. Images still waiting to be replaced are in `src/assets/placeholder/`.
- React can't use Astro's `<Image>`. Pages call `optimizeImage(image, imagePresets.<name>)` from `src/lib/images.ts` and pass the result down as a prop (`OptimizedImage`, or `Photo` with alt text).
- Components may only `import type` from `src/lib/images.ts`, because `astro:assets` works on the server only.
- Each preset in `imagePresets` matches the size an image is displayed at in CSS. Change both together.

## Client scripts

- Each behavior is a TypeScript file in `src/scripts/`, loaded by its own `<script>` tag at the end of `BaseLayout.astro`. Separate tags keep an error in one from stopping the others.
- The only inline script is the one-line `reveal-ready` flag in `<head>`, which must run before the first paint. Keep it that small.
- The site must work without JavaScript and with reduced motion: content stays visible and nothing animates.
- Elements opt in with data attributes:
  - `data-reveal`: fades up into place when scrolled into view. Use it on each section's foreground elements. `Button` and `FramedPhoto` pass extra attributes to their root element, so it works on them too.
  - `data-nav-link`: the header's text links. `nav-current.ts` keeps their `aria-current` in sync with the URL, including `#hash` sections.
  - `data-shy-header` and `data-state` (`rest`, `hidden`, `pinned`): the header, controlled by `shy-header.ts`.

## Verifying changes

- Run `bun run build` and `bun run check` (`astro check`; it needs TypeScript 5 or 6, so don't upgrade to 7).
- There are no automated tests yet. `docs/todo/tests.md` is the backlog of tests to write. When you build or change a feature, add the scenarios you checked, with their expected results.
- The site uses smooth scrolling. When checking scroll behavior in a browser, wait for each scroll to finish before the next action.

## Conventions

- Use American spelling everywhere: code, comments, docs and site copy.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
