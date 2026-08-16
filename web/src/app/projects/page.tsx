import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SelectedWorks from "@/components/SelectedWorks";
import styles from "./page.module.css";
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 30;

export const metadata = {
    title: "All Work — Flintwell Interior Architecture",
};

export default async function Projects() {
    const projects = await client.fetch(PROJECTS_QUERY);

    return (
        <>
            <SiteHeader />
            <main className={styles.main}>
                <header className={styles.header}>
                    {/* "all work" rather than the homepage's "selected work":
                        the home page shows a capped run, this shows every
                        project, and the difference is what tells you the page
                        changed. */}
                    <h1 className={styles.title}>all work</h1>

                    <Link href="/" className={styles.backLink}>
                        back to home
                    </Link>
                </header>

                <SelectedWorks projects={projects} showLabel={false} />
            </main>
        </>
    );
}
