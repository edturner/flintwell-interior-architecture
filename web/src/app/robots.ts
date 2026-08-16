import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            // Nothing under /api is useful to a crawler, and the contact
            // endpoint is a POST target that should not be probed.
            disallow: "/api/",
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
