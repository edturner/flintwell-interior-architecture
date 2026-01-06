import Link from "next/link";
import { notFound } from "next/navigation";
import ComparisonSlider from "@/components/ComparisonSlider";
import styles from "./page.module.css";

// Mock Data logic (simplified)
const getProject = (slug: string) => {
    const projects: Record<string, { title: string; desc: string; location: string }> = {
        barbican: {
            title: "The Barbican Flat",
            location: "London, UK",
            desc: "A meticulous restoration of a Grade II listed apartment. The challenge was to respect the brutalist concrete while injecting warmth and modern functionality. We utilized a palette of oak and raw steel to bridge the gap."
        },
        // fallback
    };
    return projects[slug] || projects["barbican"]; // Default to Barbican for demo
};

type Props = {
    params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
    const resolvedParams = await params;
    const project = getProject(resolvedParams.slug);

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <Link href="/#projects" className={styles.backLink}>[ CLOSE ]</Link>
                <h1 className={styles.title}>{project.title}</h1>
            </header>

            <section className={styles.heroSlider}>
                <ComparisonSlider />
            </section>

            <div className={styles.contentGrid}>
                <aside className={styles.meta}>
                    <div className={styles.metaItem}>
                        <strong>Location</strong><br />{project.location}
                    </div>
                    <div className={styles.metaItem}>
                        <strong>Year</strong><br />2024
                    </div>
                </aside>

                <article className={styles.narrative}>
                    <p>{project.desc}</p>
                    <p>
                        The approach was subtractive rather than additive. By stripping back layers of previous renovation, we revealed the honest structure of the building.
                    </p>
                </article>
            </div>

            <nav className={styles.nextNav}>
                <Link href="/projects/highgate" className={styles.nextLink}>[ NEXT PROJECT -&gt; ]</Link>
            </nav>
        </main>
    );
}
