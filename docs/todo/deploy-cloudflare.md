# Deploy to Cloudflare

Plan for putting the site on Cloudflare at `gossjones2027.com`. The domain is registered with
Squarespace Domains, and the code is on GitHub (`CubePresser/wedding-site`). Steps marked **You**
happen in a dashboard and need your accounts; steps marked **Agent** are repo changes or checks a
coding session can do.

When it's done, replace this file with a short `docs/deploy.md` describing how deploys work, and
add a Deploying section to `AGENTS.md`.

## Decisions

Settled on 2026-11-14: recommended options for 1–3, hide from search (4), and add a 404 page (6).
Decision 5 is still open.

1. **Workers, not Pages.** Cloudflare now tells new projects to start on Workers (with static
   assets); Pages still runs but is no longer where new features go. For a static site like this
   the two behave the same: free, unlimited requests for static files, automatic HTTPS, preview
   URLs. Workers just avoids a later migration.
2. **Cloudflare builds from GitHub, no GitHub Actions.** Cloudflare's Git integration (Workers
   Builds) watches the repo: every push to `main` builds and deploys, and other branches get
   preview URLs. Setting the build command to run `bun run check` first means a type error fails
   the build and nothing is deployed, which gives most of the safety of CI with no workflow files
   or API tokens. Switch to GitHub Actions later if the test suite in `docs/todo/tests.md` needs
   more than a build command can run.
3. **`gossjones2027.com` is the main address; `www` redirects to it.**
4. **Search engines: hide the site or let it be found?** Wedding sites are often kept out of
   search results (a `noindex` tag and `robots.txt`), since the page lists your names, the date,
   the venue and your email address. Your call.
5. **When to switch the domain on.** The RSVP link and hotels are still placeholders. Steps 1–3
   can happen now (the site goes live only at a `*.workers.dev` address); attach the domain
   (steps 4–5) when you're happy for guests to see it.
6. **A 404 page.** Unknown URLs currently get Cloudflare's plain error. An optional
   `src/pages/404.astro` in the site's style, plus one line of config, fixes that.

## Steps

### 1. Prepare the repo — Agent ✅
- [x] Add `wrangler` as a dev dependency (`bun add -d wrangler`).
- [x] Add `wrangler.jsonc` at the repo root: static assets from `./dist`, with
      `"not_found_handling": "404-page"`. No Astro Cloudflare adapter is needed: the site is fully
      static.
- [x] Add `src/pages/404.astro` (a `NotFound` section on the FAQ page's panel).
- [x] Pin the build tools: `"packageManager": "bun@1.4.4"` in `package.json`, and a
      `.node-version` file with `26.13.0`. Cloudflare's builds read both, so no `NODE_VERSION`
      setting is needed in the dashboard. `mise.toml` reads its versions from these same two files
      instead of listing its own, so local and Cloudflare builds can't drift apart.
- [x] Hide from search: `<meta name="robots" content="noindex">` in `BaseLayout.astro`, and
      `public/_headers` sends `X-Robots-Tag: noindex` for every file, including images and fonts.
      There is no `robots.txt` that disallows crawling. Blocking crawlers would stop them seeing
      the `noindex`, and Google can then still list the bare URL if it finds a link to it.
- [x] Build pages as files (`build.format: 'file'`). Otherwise Cloudflare redirects `/faqs` to
      `/faqs/` on every visit. `SiteHeader` strips the `.html` that this puts in the build-time path.
- [x] Check locally: `bun run check && bun run build`, then `bunx wrangler dev` (restart it after
      each build). The checks are listed under "Served by Wrangler" in `docs/todo/tests.md`.

### 2. Cloudflare account — You
- [ ] Sign up for a free Cloudflare account (or use an existing one).

### 3. Connect GitHub and first deploy — You
- [ ] In the Cloudflare dashboard: Workers & Pages → Create application → Import a repository.
      Authorize Cloudflare's GitHub app for `CubePresser/wedding-site` only.
- [ ] Build command: `bun run check && bun run build`. Deploy command: `bunx wrangler deploy`.
      Production branch: `main`. Node and bun versions come from the repo (step 1).
- [ ] Save and deploy, then open the `*.workers.dev` address it gives you.
- [ ] Agent: check that address: every page, image and font loads, there are no console errors,
      and the scroll reveal, nav underline and shy header work.

### 4. Move the domain's DNS to Cloudflare — You
Cloudflare can only serve the bare domain (`gossjones2027.com`, not just a subdomain) if it runs
the domain's DNS. The domain stays registered and paid for at Squarespace; only its nameservers
change.
- [ ] At Squarespace, screenshot the current DNS records. Look for anything still in use: email
      (MX records), verification records (TXT), or a Squarespace site attached to the domain.
- [ ] Turn off DNSSEC at Squarespace if it's on. Leaving it on while the nameservers change can
      take the domain offline. It can be re-enabled through Cloudflare afterwards.
- [ ] In Cloudflare: Add a domain → `gossjones2027.com` → Free plan. Compare the records it finds
      with the screenshot, and remove anything pointing at Squarespace's website hosting.
- [ ] At Squarespace: Domains → `gossjones2027.com` → DNS → Nameservers → use custom
      nameservers, and enter the two Cloudflare gives you.
- [ ] Wait for Cloudflare to show the domain as Active. Usually minutes to hours, up to 24 hours.
- [ ] Confirm auto-renew is on at Squarespace and the domain won't expire before the wedding
      (and a while after).

### 5. Attach the domain — You, then Agent to verify
- [ ] On the Worker: Settings → Domains & Routes → Add → Custom domain → `gossjones2027.com`.
      Cloudflare creates the DNS record and HTTPS certificate itself.
- [ ] Redirect `www`: add a proxied DNS record for `www` (type `A`, value `192.0.2.0`), then a
      Redirect Rule sending `www.gossjones2027.com/*` to `https://gossjones2027.com/${1}`
      with a 301.
- [ ] Agent: check that `https://gossjones2027.com` serves the site with a valid certificate, that
      `http://` and `www` redirect to it, and that `/faqs` and the `/#schedule` and `/#details`
      links work.

### 6. Afterwards — Agent
- [ ] Replace this file with `docs/deploy.md`: where it's hosted, how a push deploys, where
      preview URLs appear, and how to roll back (Cloudflare keeps previous versions).
- [ ] Add a short Deploying section to `AGENTS.md`.
- [ ] Add deploy checks to `docs/todo/tests.md`, e.g. the domain answers over HTTPS and `www`
      redirects.

## References
- Astro: [Deploy to Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/)
- Cloudflare: [Astro on Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/),
  [Custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/),
  [Build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/),
  [Full DNS setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/),
  [Update nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers)
