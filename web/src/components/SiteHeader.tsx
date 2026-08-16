import Header from "./Header";
import { client } from "@/sanity/lib/client";
import { SITE_DETAILS_QUERY } from "@/sanity/lib/queries";
import type { SiteDetails } from "@/sanity/contentTypes";

/**
 * Server wrapper so every page can drop in the fixed chrome without
 * repeating the Site Details fetch that the menu overlay needs.
 */
export default async function SiteHeader() {
    const details = await client.fetch<SiteDetails | null>(SITE_DETAILS_QUERY);
    return <Header details={details} />;
}
