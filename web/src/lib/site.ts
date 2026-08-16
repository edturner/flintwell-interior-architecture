/**
 * Canonical origin, used by `metadataBase`, the sitemap and robots.txt.
 *
 * Its own module rather than an export from `layout.tsx`: importing a value
 * from the layout drags the layout's whole module graph — `next/font`
 * included — into every route that wants the constant.
 */
export const SITE_URL = "https://flintwell.com";
