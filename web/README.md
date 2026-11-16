# Flintwell — website

The public site: Next.js 16 (App Router, Turbopack), deployed on Vercel,
content from Sanity. The Studio that edits that content is a separate app in
[`../studio`](../studio).

- **Design authority:** [`DESIGN.md`](DESIGN.md) — type, colour, spacing,
  motion, and what each component is for. Read it before changing anything
  visual; it records the rejected alternatives too.
- **Content guide for the client:** [`../SANITY-GUIDE.md`](../SANITY-GUIDE.md)

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

`npm run build` for the production build, `npm run lint` for eslint. Both
should be clean before anything is merged.

The site reads **live production content** in development — there is no
separate dev dataset. Editing in the Studio changes what you see locally, and
anything you publish while testing is public.

## Environment variables

Set in Vercel (Project → Settings → Environment Variables) and in a local
`.env.local` for development. `.env*` is gitignored.

| Variable | Required | What breaks without it |
|---|---|---|
| `RESEND_API_KEY` | **Yes** | The contact form returns a 500. Nothing else is affected — the key is read per request, deliberately, so a missing key can't fail the build. |
| `SANITY_REVALIDATE_SECRET` | **Yes** | The revalidation webhook refuses every request, and edits take up to an hour to appear. See below. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | No | Falls back to `vcnt7muc`. |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Falls back to `production`. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | Falls back to `2024-01-01`. |

Mail sends as `Flintwell <inquiry@flintwell.com>`, which is hard-coded in
`src/app/api/contact/route.ts` because it has to match a domain verified in
Resend — a wrong value there fails silently at send time. Where enquiries are
*delivered* is editable: it comes from the Email field on Site Details in the
Studio.

## The revalidation webhook

This is the piece that makes the Studio feel instant, and it is easy to miss
because nothing errors without it — edits just take up to an hour to appear,
which the client will report as "the website is broken".

Every route sets `revalidate = 3600`. That hour is the safety net; the real
mechanism is a Sanity webhook calling `/api/revalidate` on publish.

Set up once, in [sanity.io/manage](https://sanity.io/manage) → API → Webhooks:

| Field | Value |
|---|---|
| URL | `https://www.flintwell.com/api/revalidate` |
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| Filter | `_type in ["project", "home", "philosophy", "contact", "footer", "testimonial"]` |
| Secret | the same value as `SANITY_REVALIDATE_SECRET` in Vercel |

To check it is alive: publish a change in the Studio, then look at the
webhook's delivery log in sanity.io/manage. A 401 means the secret does not
match; a 500 means it is not set in Vercel at all.

## Deploys and domains

`www.flintwell.com` is canonical. The apex `flintwell.com` 308-redirects to
it, and `src/lib/site.ts` must agree with that — it is the single source for
`metadataBase`, `sitemap.xml` and `robots.txt`, so pointing it at the wrong
host silently fills the sitemap with redirecting URLs and breaks the
OpenGraph image on shared project links.

Branches, as of the handover:

| Branch | What it is |
|---|---|
| `client-feedback` | The current site. Everything in Ian's June 2026 mockups, signed off. |
| `coming-soon` | The holding page. **This is what production served before the cutover.** |
| `main` | Stale — behind `client-feedback`. |

So going live is a cutover, not just a deploy: merge `client-feedback` into
`main`, confirm Vercel's production branch is `main`, and check the deployed
page is the real site rather than "A new site is in progress".

## Things worth knowing before you change something

- **`src/sanity/types.ts` is generated — never edit it.** Run
  `npm run typegen` in `../studio` after any schema or query change. The
  readable aliases live in `src/sanity/contentTypes.ts`, which is the only
  module that should import from `types.ts`.
- **Projections are deliberately tight.** Every field a query asks for is a
  field something renders. If you add a field to a component, add it to the
  query — an unused field in a projection is one someone later assumes is
  rendered.
- **`useCdn: false` is deliberate.** With ISR on every route, the Sanity CDN's
  own cache stacks on top of Next's and a regeneration can serve content that
  is already stale. The comment in `src/sanity/lib/client.ts` has the detail.
- **Images are cropped by Sanity, not CSS.** `croppedUrl()` asks Sanity for
  the exact box, which is what makes the Studio's hotspot mean anything.
  `object-fit: cover` downstream is a safety net, not the mechanism.
- **The contact endpoint has no rate limit.** The honeypot is the only abuse
  control. Adding one needs a shared store (`@upstash/ratelimit` + Vercel KV);
  it is the one known gap, noted in the route.
