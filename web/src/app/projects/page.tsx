import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SelectedWorks from "@/components/SelectedWorks";
import styles from "./page.module.css";
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import type { ProjectSummary } from "@/sanity/contentTypes";

export const revalidate = 3600;

export const metadata = {
    title: "All Work",
    description:
        "Every project by Flintwell Interior Architecture — architecturally led interior design.",
};

export default async function Projects() {
    const projects = await client.fetch<ProjectSummary[]>(PROJECTS_QUERY);

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

                {/* SelectedWorks returns null on an empty run, which is right
                    on the homepage — a section that isn't ready shouldn't
                    appear. Here it is the entire point of the page, so an
                    absent grid left a heading, a rule and blank space to the
                    footer, reading as broken rather than empty. */}
                {projects.length > 0 ? (
                    <SelectedWorks projects={projects} showLabel={false} prioritiseFirstRow />
                ) : (
                    <div className={styles.empty}>
                        <p className={styles.emptyCopy}>
                            New work is being photographed. In the meantime, do get
                            in touch — we&rsquo;re happy to talk through recent
                            projects directly.
                        </p>
                        <Link href="/contact" className={styles.emptyLink}>
                            start a conversation
                        </Link>
                    </div>
                )}
            </main>
        </>
    );
}
