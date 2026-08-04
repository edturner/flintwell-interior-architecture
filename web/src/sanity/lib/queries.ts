import { groq } from "next-sanity";

export const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0]{
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
  "nextProject": coalesce(
    *[_type == "project" && _createdAt < ^._createdAt] | order(_createdAt desc)[0],
    *[_type == "project"] | order(_createdAt desc)[0]
  ){ "slug": slug.current }
}`;

export const PROJECTS_QUERY = groq`*[_type == "project"] | order(_createdAt desc){
  _id,
  title,
  projectNumber,
  "slug": slug.current,
  mainImage,
  // The grid renders each thumbnail at its own proportions rather than
  // cropping to a uniform box, so it needs the asset's aspect ratio.
  "aspect": mainImage.asset->metadata.dimensions.aspectRatio,
  location,
  year
}`;

export const HOME_QUERY = groq`*[_type == "home"][0]{
  title,
  subtitle,
  statement,
  description,
  heroImage
}`;

export const ABOUT_QUERY = groq`*[_type == "philosophy"][0]{
  aboutHeading,
  aboutText,
  aboutImage
}`;

export const CONTACT_QUERY = groq`*[_type == "contact"][0]{
  title,
  intro,
  buttonText
}`;

export const EMAIL_TEMPLATE_QUERY = groq`*[_type == "contact"][0]{
  "brochureUrl": brochure.asset->url,
  autoReplySubject,
  autoReplyGreeting,
  autoReplyBody,
  autoReplyClosing,
  autoReplyResponseTime,
  autoReplySignOffName,
  autoReplySignOffCompany
}`;

/** Drives both the closing footer and the terracotta menu overlay. */
export const SITE_DETAILS_QUERY = groq`*[_type == "footer"][0]{
  location,
  email,
  phone,
  instagramUrl,
  copyrightText,
  addressLines,
  menuSlogan
}`;

export const TESTIMONIALS_QUERY = groq`*[_type == "testimonial"]{
  quote,
  author,
  role,
  image
}`;
