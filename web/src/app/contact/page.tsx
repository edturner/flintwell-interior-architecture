import SiteHeader from "@/components/SiteHeader";
import Contact from "@/components/Contact";
import { client } from "@/sanity/lib/client";
import { CONTACT_QUERY, SITE_DETAILS_QUERY } from "@/sanity/lib/queries";
import type { ContactData, SiteDetails } from "@/sanity/contentTypes";

export const revalidate = 3600;

export const metadata = {
    // Matches the heading the page actually renders from Sanity ("LET'S TALK",
    // lowercased by the label's CSS), rather than the older "lets chat" label.
    title: "Let's Talk",
    description:
        "Start a conversation with Flintwell Interior Architecture about your project.",
};

export default async function ContactPage() {
    // Site Details carries the email and phone. Without it the "or reach us
    // directly" block silently disappears — which left the one page built for
    // people trying to get in touch as the only page not showing the phone
    // number.
    const [contactData, siteDetails] = await Promise.all([
        client.fetch<ContactData | null>(CONTACT_QUERY),
        client.fetch<SiteDetails | null>(SITE_DETAILS_QUERY),
    ]);

    return (
        <>
            <SiteHeader />
            <main>
                {/* This section is the whole page here, so its label carries
                    the h1 rather than opening the outline at h2. */}
                <Contact
                    contactData={contactData}
                    details={siteDetails}
                    headingLevel="h1"
                />
            </main>
        </>
    );
}
