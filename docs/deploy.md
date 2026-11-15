# Deploying

The site is served by Cloudflare Workers as static files, at **https://gossjones2027.com**. Every
push to `main` on GitHub (`CubePresser/wedding-site`) builds and deploys it. There's no GitHub
Actions workflow; Cloudflare runs the build itself.

How this was set up, and why, is in `docs/plans/deploy-cloudflare.md`.

## Where things live

| What | Where |
|---|---|
| Site | Worker `wedding-site` in Cloudflare (Workers & Pages). Also at https://wedding-site.cubepresser.workers.dev |
| Domain registration | Squarespace Domains, with auto-renew on |
| DNS | Cloudflare (the `gossjones2027.com` zone). Squarespace only holds the nameservers and the DNSSEC DS record |
| Code | GitHub, `CubePresser/wedding-site` |

## How a push deploys

On every push to `main`, Workers Builds:
1. Installs dependencies with bun. The bun version comes from `packageManager` in `package.json`,
   and Node's from `.node-version`.
2. Runs the build command, `bun run check && bun run build`. A type error fails the build, and
   the live site stays as it was.
3. Runs the deploy command, `bunx wrangler deploy`, which uploads `dist/` as set in
   `wrangler.jsonc`.

Each build's status shows as a check on the commit in GitHub. In Cloudflare,
open the Worker → Deployments → View build history for each build's log (kept for 90 days).

## Preview URLs

When preview builds are on (the Worker's Settings → Build → Branch control → Enable Preview
Builds), a push to any other branch builds it and runs the preview command instead of deploying.
The result gets its own address, `<preview-name>-wedding-site.cubepresser.workers.dev`. It appears
in a comment on the branch's pull request and in the Worker's Previews section. Later pushes to the
same branch update the same address.

Previews are public to anyone with the link. Like the live site, they send `noindex`.

## Rolling back

- **Quickest:** Cloudflare → the Worker → Deployments → the `⋯` menu on an earlier version →
  Rollback. Cloudflare keeps the last 100 versions.
- **Then fix `main`:** a rollback doesn't change the code, and the next push to `main` deploys
  whatever is there. Revert the bad commit (`git revert <commit>`) and push it, so `main` matches
  what's live.

## Settings that live outside the repo

These are in the Cloudflare dashboard only. Changing them doesn't need a deploy, but nothing in git
records them.

| Setting | Where in Cloudflare |
|---|---|
| Build command, deploy command, production branch (`main`), preview builds | Worker → Settings → Build |
| Custom domain `gossjones2027.com` | Worker → Settings → Domains & Routes |
| `www` → bare domain redirect (301, keeps path and query) | `gossjones2027.com` zone → Rules → Redirect Rules |
| `www` DNS record (`A` `192.0.2.0`, proxied; a placeholder the redirect needs) | Zone → DNS → Records |
| Always Use HTTPS (`http://` → `https://`) | Zone → SSL/TLS → Edge Certificates |
| DNSSEC | Zone → DNS → Settings, with its DS record at Squarespace (Domains → DNS → DNSSEC) |

The zone's only other DNS record is `TXT v=spf1 -all`, which says the domain sends no email. Add
`MX` records there if the domain ever needs email.

## Settings in the repo

- `wrangler.jsonc`: serve `dist/` as static files, with `404.html` for unknown URLs.
- `public/_headers`: response headers Cloudflare adds to every file (currently `X-Robots-Tag:
  noindex`).
- `astro.config.mjs`: `build.format: 'file'`, so Cloudflare serves `/faqs` without a trailing
  slash.
- `.node-version` and `packageManager` in `package.json`: tool versions, read by both Cloudflare
  and mise.

## Checking before you push

```
bun run check && bun run build
bunx wrangler dev
```

`wrangler dev` serves `dist/` the way Cloudflare does, including `_headers`, redirects and the 404
page. Restart it after each build. The scenarios to check are in `docs/todo/tests.md`.
