import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

/**
 * Nothing previously told a crawler the project pages existed beyond
 * following links from /projects.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const slugs = await client.fetch<string[]>(PROJECT_SLUGS_QUERY);
    const now = new Date();

    return [
        { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
        { url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
        ...slugs.map((slug) => ({
            url: `${SITE_URL}/projects/${slug}`,
            lastModified: now,
            changeFrequency: "yearly" as const,
            priority: 0.7,
        })),
    ];
}
