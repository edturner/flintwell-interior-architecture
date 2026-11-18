/**
 * Readable names for the generated query result types.
 *
 * `./types.ts` is produced by `npm run typegen` in `studio/` and is
 * overwritten wholesale each time — never edit it, and never import from it
 * directly outside this file. Its exports are named after the query
 * variables (`PROJECTS_QUERY_RESULT`), which reads badly in a component
 * signature and would churn every component if a query were renamed.
 *
 * This module is the seam: components import from here, and regenerating
 * types changes at most this one file.
 *
 * Note the generated types are *projection-accurate* — `ProjectSummary` has
 * only the five fields the grid query actually asks for, so adding a field
 * to a component now forces you to add it to the query too. That is the
 * point of them.
 */
import type {
    ImageWithAlt,
    PROJECT_QUERY_RESULT,
    PROJECTS_QUERY_RESULT,
    HOME_QUERY_RESULT,
    ABOUT_QUERY_RESULT,
    CONTACT_QUERY_RESULT,
    EMAIL_TEMPLATE_QUERY_RESULT,
    SITE_DETAILS_QUERY_RESULT,
    TESTIMONIALS_QUERY_RESULT,
} from "./types";

/** An image plus the `alt` / `decorative` fields the Studio attaches. */
export type SanityImage = ImageWithAlt;

/** One card in the work grid. */
export type ProjectSummary = PROJECTS_QUERY_RESULT[number];

/** A full project page. Non-null: the page calls `notFound()` first. */
export type Project = NonNullable<PROJECT_QUERY_RESULT>;

export type HomeData = NonNullable<HOME_QUERY_RESULT>;
export type AboutData = NonNullable<ABOUT_QUERY_RESULT>;
export type ContactData = NonNullable<CONTACT_QUERY_RESULT>;
export type EmailTemplate = NonNullable<EMAIL_TEMPLATE_QUERY_RESULT>;

/** Drives the footer, the menu overlay, and the contact section's direct
 *  email and phone. */
export type SiteDetails = NonNullable<SITE_DETAILS_QUERY_RESULT>;

export type Testimonial = TESTIMONIALS_QUERY_RESULT[number];
