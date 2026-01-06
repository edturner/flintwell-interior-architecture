import { groq } from "next-sanity";

export const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  tagline,
  mainImage,
  sliderPlan,
  sliderReality,
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
  "slug": slug.current,
  mainImage,
  location,
  year
}`;

export const HOME_QUERY = groq`*[_type == "home"][0]{
  title,
  subtitle,
  description,
  heroImage,
  "services": *[_type == "service"] | order(_createdAt asc){
    _id,
    title,
    description,
    items,
    price
  }
}`;

export const CONTACT_QUERY = groq`*[_type == "contact"][0]{
  title,
  toolsText,
  image,
  buttonText
}`;

export const FOOTER_QUERY = groq`*[_type == "footer"][0]{
  location,
  email,
  instagramUrl,
  copyrightText
}`;
