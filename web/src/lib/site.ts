/**
 * Canonical origin, used by `metadataBase`, the sitemap and robots.txt.
 *
 * `www`, because that is the host that actually serves the site: the apex
 * `flintwell.com` answers every request with a 308 to `https://www.flintwell.com/`.
 * Pointed at the apex, this constant made `sitemap.xml` a list of URLs that
 * all redirect, pointed `robots.txt` at a redirecting sitemap, and — the one
 * that shows — resolved the relative OpenGraph image on every project page to
 * a redirecting URL. Link-preview scrapers are the least forgiving consumers
 * of a redirect, and a shared project link losing its photograph is the whole
 * point of the tag.
 *
 * If the apex is ever made canonical instead, change it here and nowhere
 * else, and make sure Vercel's domain redirect is flipped to match.
 *
 * Its own module rather than an export from `layout.tsx`: importing a value
 * from the layout drags the layout's whole module graph — `next/font`
 * included — into every route that wants the constant.
 */
export const SITE_URL = "https://www.flintwell.com";
