# Deploy to Cloudflare

Plan for putting the site on Cloudflare at `gossjones2027.com`. The domain is registered with
Squarespace Domains, and the code is on GitHub (`CubePresser/wedding-site`). Steps marked **You**
happen in a dashboard and need your accounts; steps marked **Agent** are repo changes or checks a
coding session can do.

**Done on 2026-11-14.** This plan is kept as a record of how the deploy was set up and why. For
how deploys work now, see `docs/deploy.md`.

## Decisions

Settled on 2026-11-14: recommended options for 1–3, hide from search (4), and add a 404 page (6).
The domain was attached the same day (5).

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
   search results, since the page lists your names, the date, the venue and your email address.
   Chosen: hide it (see step 1 for how, and why there's no `robots.txt`).
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
- [X] Sign up for a free Cloudflare account (or use an existing one).

### 3. Connect GitHub and first deploy — You ✅
Live at https://wedding-site.cubepresser.workers.dev.
- [X] In the Cloudflare dashboard: Workers & Pages → Create application → Import a repository.
      Authorize Cloudflare's GitHub app for `CubePresser/wedding-site` only.
- [X] Build command: `bun run check && bun run build`. Deploy command: `bunx wrangler deploy`.
      Production branch: `main`. Node and bun versions come from the repo (step 1).
- [X] Save and deploy, then open the `*.workers.dev` address it gives you.
- [X] Agent: check that address: every page, image and font loads, there are no console errors,
      and the scroll reveal, nav underline and shy header work. Checked on 2026-11-14, at desktop
      and phone sizes, with the "Served by Wrangler" and browser scenarios in `docs/todo/tests.md`.

### 4. Move the domain's DNS to Cloudflare — You
Cloudflare can only serve the bare domain (`gossjones2027.com`, not just a subdomain) if it runs
the domain's DNS. The domain stays registered and paid for at Squarespace; only its nameservers
change.
- [ ] At Squarespace, screenshot the current DNS records. Look for anything still in use: email
      (MX records), verification records (TXT), or a Squarespace site attached to the domain.
- [X] DNSSEC is on (Squarespace enables it by default). There's no separate switch to turn it off:
      switching to custom nameservers prompts you to disable it, and that removes the record at the
      `.com` registry. DNS servers may keep the old record for up to 24 hours, so the domain can be
      unreachable for some visitors in that window. That's fine before launch.
      Records found on 2026-11-14: four Squarespace hosting `A` records on the bare domain and a
      `www` `CNAME` to `ext-sq.squarespace.com` (delete these, and anything else pointing at
      Squarespace, in Cloudflare), `TXT v=spf1 -all` (keep it: it says the domain sends no email),
      and no `MX`.
- [X] In Cloudflare: Add a domain → `gossjones2027.com` → Free plan. Compare the records it finds
      with the screenshot, and remove anything pointing at Squarespace's website hosting.
- [X] At Squarespace: Domains → `gossjones2027.com` → DNS → Nameservers → use custom
      nameservers, and enter the two Cloudflare gives you.
- [X] Wait for Cloudflare to show the domain as Active. Usually minutes to hours, up to 24 hours.
- [X] Agent: check that the registry no longer has a DS record (`dig DS gossjones2027.com`) and
      that Cloudflare's nameservers answer. Checked on 2026-11-14: no DS record, the registry and
      public resolvers list Cloudflare's nameservers, and the zone holds only the SPF `TXT` record.
- [X] Optional: turn DNSSEC back on. In Cloudflare: DNS → Settings → Enable DNSSEC, then copy the
      DS values into Squarespace: Domains → `gossjones2027.com` → DNS → DNSSEC → Add record.
      Checked on 2026-11-14: Google, Quad9, OpenDNS and Comcast validate it. Cloudflare's 1.1.1.1
      returned SERVFAIL for a few minutes while its caches caught up, then validated too.
- [X] Confirm auto-renew is on at Squarespace and the domain won't expire before the wedding
      (and a while after).

### 5. Attach the domain — You, then Agent to verify ✅
Live at https://gossjones2027.com.
- [X] On the Worker: Settings → Domains & Routes → Add → Custom domain → `gossjones2027.com`.
      Cloudflare creates the DNS record and HTTPS certificate itself.
- [X] Redirect `www`, in the `gossjones2027.com` zone:
      1. DNS → Records → Add record: type `A`, name `www`, IPv4 `192.0.2.0` (a placeholder that
         never gets traffic), Proxied on. A redirect only runs on proxied hostnames.
      2. Rules → Overview → Create rule → Redirect Rule (or the "Redirect from WWW to root"
         template). Wildcard pattern, request URL `https://www.gossjones2027.com/*`, target URL
         `https://gossjones2027.com/${1}`, status `301`, Preserve query string on. Deploy.
- [X] SSL/TLS → Edge Certificates → Always Use HTTPS: on, so `http://` redirects to `https://`.
- [X] Agent: check that `https://gossjones2027.com` serves the site with a valid certificate, that
      `http://` and `www` redirect to it, and that `/faqs` and the `/#schedule` and `/#details`
      links work. Checked on 2026-11-14: the certificate (Google Trust Services, covering the bare
      domain and `*.gossjones2027.com`) is valid; `http://`, `www` and `http://www` all end at
      `https://gossjones2027.com` with the path and query kept; and the browser checks from
      step 3 pass on the domain too.

### 6. Afterwards — Agent ✅
- [X] Write `docs/deploy.md`: where it's hosted, how a push deploys, where preview URLs appear,
      and how to roll back (Cloudflare keeps previous versions). Move this plan from `docs/todo/`
      to `docs/plans/` as a record.
- [X] Add a short Deploying section to `AGENTS.md`.
- [X] Add deploy checks to `docs/todo/tests.md`, e.g. the domain answers over HTTPS and `www`
      redirects.

## References
- Astro: [Deploy to Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/)
- Cloudflare: [Astro on Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/),
  [Custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/),
  [Build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/),
  [Full DNS setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/),
  [Update nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers)
