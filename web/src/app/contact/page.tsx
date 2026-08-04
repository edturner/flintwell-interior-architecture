import SiteHeader from "@/components/SiteHeader";
import Contact from "@/components/Contact";
import { client } from "@/sanity/lib/client";
import { CONTACT_QUERY } from "@/sanity/lib/queries";

export const revalidate = 30;

export const metadata = {
    title: "Lets Chat — Flintwell Interior Architecture",
};

export default async function ContactPage() {
    const contactData = await client.fetch(CONTACT_QUERY);

    return (
        <>
            <SiteHeader />
            <main>
                <Contact contactData={contactData} />
            </main>
        </>
    );
}
