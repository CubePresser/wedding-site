# Tests to write

Nothing here is automated yet. Every scenario below was checked by hand in headless Chrome while the
feature was built, so the expected results are known. This is the backlog for turning those checks
into tests that run in CI.

Tick items off as they're written. When this file is empty, delete it.

## Suggested setup

| Layer | Tool | Runs against |
|---|---|---|
| Unit | [Vitest](https://vitest.dev), configured with `getViteConfig` from `astro/config` so `astro:*` imports resolve | Source |
| Component | Vitest + `react-dom/server` (`renderToStaticMarkup`) for React components; `experimental_AstroContainer` from `astro/container` for `.astro` files | Source |
| Build output | Vitest (or plain Node) reading files in `dist/` | `astro build` output |
| Browser | [Playwright](https://playwright.dev), using its `webServer` option to start `astro preview` | Built site |

Suggested CI order: `astro check` → `vitest` → `astro build` → build-output tests → Playwright.

## Unit tests

### `src/data/site.ts`
- [ ] `site.dateShort` is `September 12, 2027` and `site.dateLong` is `Sunday, September 12, 2027`.
      Run this with the test process in UTC (`TZ=UTC`), since CI usually is: the formatter pins
      `America/Los_Angeles`, and this test proves the date doesn't shift a day.

### `src/data/faqs.ts`
- [ ] The "When is the wedding?" answer contains `site.dateLong` and the venue answer contains
      `site.venue.name`, so changing `site.ts` updates the FAQs.

### `src/lib/images.ts` — `optimizeImage`
Mock `getImage` from `astro:assets`.
- [ ] Returns `width`/`height` from `getImage`'s `attributes` (the output size after cropping),
      not the source image's size.
- [ ] Falls back to the source `width`/`height` when `attributes` has none.
- [ ] Returns `srcSet: undefined` when `getImage` returns an empty `srcSet.attribute`, so React
      leaves the attribute out.
- [ ] Coerces string `attributes.width`/`height` to numbers.
- [ ] Passes preset options (e.g. `fit: 'cover'`, `densities`) through to `getImage` unchanged.

### `src/scripts/reveal.ts`
Needs a small refactor first: export the delay calculation (currently inside `reveal()`).
- [ ] Stagger delay is `index × 120ms`: 0 → `0ms`, 2 → `240ms`, 7 → `840ms`.
- [ ] Delay is capped at 8 steps: index 8 and index 31 both give `960ms`.

### `src/scripts/nav-current.ts`
Needs a small refactor first: export a pure function such as
`currentValue(href, pathname, hash)` that returns `'page' | 'location' | undefined`.
- [ ] `/` at `/` → `page`; `/#schedule` at `/` → `undefined`.
- [ ] `/#schedule` at `/#schedule` → `location`; `/` at `/#schedule` → `undefined`.
- [ ] Trailing slashes are ignored: `/faqs` at `/faqs/` → `page`.

### `src/scripts/shy-header.ts`
Needs a small refactor first: pull the decision in `update()` out into a pure function, e.g.
`nextState({ state, y, lastY, height, maxY, holdHidden })` returning the new state (or none).
- [ ] `y <= 0` (including iOS's negative overscroll) → `rest`.
- [ ] `y` past the end of the page (iOS bottom bounce) → no change.
- [ ] A move under 6px in either direction → no change (trackpad jitter).
- [ ] At `rest` with `y` within the header's height → no change (the header just scrolls with the page).
- [ ] Scrolling down past the header → `hidden`; scrolling up → `pinned`.
- [ ] Scrolling up while `holdHidden` is set → stays `hidden`.
- [ ] At `rest`, scrolling up while already past the header (e.g. the page loaded at `/#details`) → `pinned`.

## Component tests

### `SiteHeader`
- [ ] With `currentPath="/"`, Home has `aria-current="page"` and no other link does.
- [ ] With `currentPath="/faqs"` and `"/faqs/"`, FAQs has `aria-current="page"`.
- [ ] Every text link has `data-nav-link`; the logo link doesn't.
- [ ] The `<header>` renders with `data-shy-header` and `data-state="rest"`.
- [ ] The logo `<img>` has `alt=""` and the link has `aria-label="Rachel & Alex, home"`.

### `ui/Button` and `ui/FramedPhoto`
- [ ] Extra attributes (e.g. `data-reveal`) reach the root element.
- [ ] A passed `className` is merged with the component's own classes, not replacing them.
- [ ] `FramedPhoto` applies the `double` or `polaroid` class from `variant` (default `polaroid`).

### `ui/Section`, `ui/Backdrop` and `sections/Hero`
- [ ] `tone="stripes"` adds `bg-stripes-olive`; `tone="photo"` without an image adds
      `bg-photo-placeholder`; `tone="photo"` with an image renders a `Backdrop` and no placeholder.
- [ ] `id` is rendered on the `<section>` (the nav links depend on `#schedule` and `#details`).
- [ ] `Backdrop` sets `object-position` from `position` (default `center`) and
      `sizes="max(100vw, 1280px)"`.
- [ ] `Hero` passes `position="left center"` to its `Backdrop`, and uses the placeholder class
      when no image is given.

### `SiteFooter`
- [ ] Phone links strip formatting: `[redacted]` → `tel:[redacted]`.

### Foreground elements are marked for reveal
- [ ] Each section's foreground elements carry `data-reveal`: hero names and tagline, engagement
      photo and date block, Our Special Day panel, The Day heading/intro/each item, RSVP
      heading/text/button, Other Details heading/each item, Where to Stay heading/each card,
      Registry card, each polaroid, footer heading/each contact, FAQ heading/each question.

## Build output tests

Run after `astro build`, reading `dist/`.
- [ ] Only `/` and `/faqs` are built; `/schedule` and `/details` don't exist.
- [ ] Each page has exactly one classic script, in `<head>`, under 200 characters (the
      `reveal-ready` flag). All other scripts are `type="module"` and inline in `<body>`.
- [ ] No page references a React client runtime (no `client:*` hydration): nothing loads a file
      from `dist/_astro/*.js`.
- [ ] No source comments ship: e.g. no `Client behaviour` or `Scroll reveal` text in the HTML.
- [ ] Every `<img>` has `width`, `height` and an `alt` attribute (empty is fine for decoration).
- [ ] Every image in `dist/_astro` is `.webp`; the largest is under 500 KB.
- [ ] Fonts ship as `.woff2` only (no `.ttf`).

## Browser tests (Playwright)

Use a 1366×900 desktop and a 390×844 phone unless noted.

**Pitfalls found while checking these by hand:**
- The site uses smooth scrolling, so wait for the scroll to finish (e.g. the `scrollend` event)
  before acting again. Otherwise taps land while the page is still moving and miss.
- Navigating from `/` to `/#details` in the same tab is a same-document hash change, not a page
  load. Go to `about:blank` first when a test needs a fresh load.
- A viewport tall enough for a full-page screenshot reveals everything at once. Take full-page
  screenshots only after reveal has finished.
- React leaves `<!-- -->` markers between pieces of text, so don't compare HTML strings for equality.

### Scroll reveal
- [ ] On load, the hero names are mid-animation at about 150ms (opacity between 0 and 1, moved
      down) and fully in place after about 1s.
- [ ] Below-the-fold elements (e.g. `#details h2`) start at opacity 0.
- [ ] After scrolling to the bottom, no `[data-reveal]` elements remain and nothing in `main` or
      `footer` has opacity under 1, on desktop, phone and `/faqs`.
- [ ] Scrolling to `#schedule` staggers the six timeline items at 240–840ms (the heading and
      intro take the first two steps).
- [ ] With a 1366×7000 viewport, the longest delay is 960ms and everything finishes.
- [ ] Nothing stays hidden at the end of the page on tall screens: `/faqs` at 1900 and 2600px
      tall, `/` at 7000px.
- [ ] After the RSVP button reveals, its `transition-property` is `filter` again (its hover
      transition is back).
- [ ] With `prefers-reduced-motion: reduce`, below-the-fold elements are visible and untransformed
      without scrolling.
- [ ] With JavaScript disabled, everything is visible.
- [ ] With `IntersectionObserver` deleted before load, `reveal-ready` isn't added and everything
      is visible.

### Nav underline
- [ ] At `/`, only Home is underlined.
- [ ] Clicking Schedule underlines only Schedule (`aria-current="location"`); clicking Details
      underlines only Details.
- [ ] Back from `#details` to `#schedule` underlines Schedule.
- [ ] Loading `/#details` directly underlines Details.
- [ ] At `/faqs`, FAQs is underlined; hovering Schedule with a mouse underlines it too.
- [ ] On a touch device (`hasTouch`, `(hover: hover)` false), tapping Schedule leaves only
      Schedule underlined (no stuck hover), and tapping Home goes to `/` with Home underlined.

### Shy header
- [ ] At the top: `data-state="rest"`, `position: absolute`, transparent background.
- [ ] Scrolling down 50px: still `rest`, scrolled partly off screen.
- [ ] Crossing the header's height: from the moment the state leaves `rest`, the header is never
      visible (its bottom edge stays at 0 or above the viewport on every frame).
- [ ] Scrolling down further: `hidden`, `position: fixed`, olive background, above the viewport.
- [ ] Scrolling up: `pinned`, at the top of the viewport, olive background.
- [ ] A 4px scroll up while hidden doesn't pin it.
- [ ] Scrolling back to the very top returns to `rest` with a transparent background.
- [ ] Loading `/#details` fresh, then scrolling up, pins the header.
- [ ] While pinned, clicking Schedule (above the current position) keeps the header hidden for
      the whole scroll; afterwards the Schedule heading is visible below where the bar would be.
- [ ] After that scroll ends, scrolling up (by wheel, or `scrollTo` with no input events) pins it again.
- [ ] Focusing a header link while hidden pins it.
- [ ] With `prefers-reduced-motion: reduce`, the header's `transition-duration` is `0s`.
- [ ] With JavaScript disabled, the header stays `rest` and scrolls away with the page.
- [ ] On `/faqs`, scrolling to the bottom and back up 120px pins it.

### Images
- [ ] Every image finishes loading (`complete` and `naturalWidth > 0`).
- [ ] At 500px wide, background images load the 1280px version or larger (not the 768px one,
      which would look blurry when stretched to fill tall sections).
- [ ] The engagement photo renders at the portrait 380×533 crop and the polaroids at 290×316.

### Navigation
- [ ] Loading `/#details` scrolls `#details` to the top of the viewport.

### Visual regression
- [ ] Full-page screenshots of `/` and `/faqs` at 1366, 800 and 500px wide, compared with stored
      baselines (Playwright's `toHaveScreenshot`). Take them after reveal has finished, with
      reduced motion on to keep them stable.
- [ ] Hero at 375px wide: the hotel stays in view (check the baseline by eye once, then let the
      screenshot comparison guard it).
