/**
 * Where a project page's back link points, and what it says.
 *
 * These live in a plain module rather than alongside the client component
 * that consumes them, because the *server* page reads `DEFAULT_ORIGIN` for
 * its Suspense fallback. Exports of a `"use client"` module are not real
 * values on the server — the RSC graph replaces them with opaque client
 * references — so reading `.href` off one during a server render throws.
 *
 * That was a live bug: it never showed up because the route was rendered on
 * demand and the failure surfaced as an unreadable minified error deep in
 * the framework. It only became visible once the page started prerendering
 * at build time.
 */
export const ORIGINS = {
    home: { href: "/", label: "back to home" },
    work: { href: "/projects", label: "back to work" },
} as const;

/** Deep links, shares and search hits have no origin — the listing is the
 *  honest parent to offer them. */
export const DEFAULT_ORIGIN = ORIGINS.work;
