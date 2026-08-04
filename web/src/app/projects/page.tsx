import SiteHeader from "@/components/SiteHeader";
import SelectedWorks from "@/components/SelectedWorks";
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 30;

export const metadata = {
    title: "Selected Work — Flintwell Interior Architecture",
};

export default async function Projects() {
    const projects = await client.fetch(PROJECTS_QUERY);

    return (
        <>
            <SiteHeader />
            <main>
                <SelectedWorks projects={projects} />
            </main>
        </>
    );
}
