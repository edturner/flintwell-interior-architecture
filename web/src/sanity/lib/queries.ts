import { defineQuery } from "next-sanity";

/**
 * Every projection here lists exactly the fields its consumer reads. Several
 * used to over-fetch — `HOME_QUERY` pulled four unused fields, `PROJECTS_QUERY`
 * pulled an `aspect` the grid stopped using when it moved to a fixed 4:5 crop.
 * Keep them tight: an unused field in a projection is a field someone will
 * later assume is rendered.
 *
 * Result types live in `../types.ts`. Pass them at the call site —
 * `client.fetch<Project | null>(PROJECT_QUERY, …)` — because `client.fetch`
 * returns `any` without one, which silently disables `strict` on exactly the
 * data that arrives unshaped.
 */

export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  projectNumber,
  "slug": slug.current,
  tagline,
  mainImage,
  year,
  location,
  gallery,
  description,
  // Walks back through the run and wraps around to the newest from the
  // oldest. The _id != ^._id guard on the fallback matters when only one
  // project is published: without it the wrap-around resolves to the current
  // project and "next project" links to the page you are already on.
  "nextProject": coalesce(
    *[_type == "project" && defined(slug.current) && _createdAt < ^._createdAt] | order(_createdAt desc)[0],
    *[_type == "project" && defined(slug.current) && _id != ^._id] | order(_createdAt desc)[0]
  ){ "slug": slug.current }
}`);

/**
 * Ordered by the studio's own `displayOrder`, so which six projects represent
 * the practice on the homepage is an editorial decision rather than a
 * side effect of upload date. Blank orders coalesce to the end of the run.
 *
 * `defined(slug.current)` filters out drafts saved without a slug — they
 * would otherwise render a card linking to /projects/null.
 */
export const PROJECTS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)]
  | order(coalesce(displayOrder, 9999) asc, _createdAt desc){
  _id,
  title,
  projectNumber,
  "slug": slug.current,
  mainImage
}`);

/** Every slug with a published project, for `generateStaticParams`. */
export const PROJECT_SLUGS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)].slug.current`);

export const HOME_QUERY = defineQuery(`*[_type == "home"][0]{
  statement
}`);

export const ABOUT_QUERY = defineQuery(`*[_type == "philosophy"][0]{
  aboutHeading,
  aboutText,
  aboutImage
}`);

export const CONTACT_QUERY = defineQuery(`*[_type == "contact"][0]{
  title,
  intro,
  buttonText
}`);

export const EMAIL_TEMPLATE_QUERY = defineQuery(`*[_type == "contact"][0]{
  "brochureUrl": brochure.asset->url,
  autoReplySubject,
  autoReplyGreeting,
  autoReplyBody,
  autoReplyClosing,
  autoReplyResponseTime,
  autoReplySignOffName,
  autoReplySignOffCompany
}`);

/** Drives the closing footer, the terracotta menu overlay, and the contact
 *  section's direct email and phone. */
export const SITE_DETAILS_QUERY = defineQuery(`*[_type == "footer"][0]{
  email,
  phone,
  instagramUrl,
  copyrightText,
  addressLines,
  menuSlogan
}`);

/** Ordered so the studio decides which quote the carousel opens on. */
export const TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonial"]
  | order(coalesce(displayOrder, 9999) asc, _createdAt asc){
  quote,
  author,
  role
}`);
