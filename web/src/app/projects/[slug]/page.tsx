import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import ComparisonSlider from "@/components/ComparisonSlider";
import styles from "./page.module.css";
import { client } from "@/sanity/lib/client";
import { PROJECT_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

type Props = {
    params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
    const resolvedParams = await params;
    const project = await client.fetch(PROJECT_QUERY, { slug: resolvedParams.slug });

    if (!project) {
        notFound();
    }

    return (
        <main className={styles.main}>
            {/* Debugging Image URL */}
            {/* {project.mainImage && <img src={urlFor(project.mainImage).width(800).url()} />} */}

            <header className={styles.header}>
                <Link href="/#projects" className={styles.backLink}>[ CLOSE ]</Link>
                <h1 className={styles.title}>{project.title}</h1>
            </header>

            <section className={styles.heroSlider}>
                <ComparisonSlider
                    planImage={project.sliderPlan ? urlFor(project.sliderPlan).url() : undefined}
                    photoImage={project.sliderReality ? urlFor(project.sliderReality).url() : undefined}
                />
            </section>

            <div className={styles.contentGrid}>
                <aside className={styles.meta}>
                    <div className={styles.metaItem}>
                        <strong>Location</strong><br />{project.location}
                    </div>
                    <div className={styles.metaItem}>
                        <strong>Year</strong><br />{project.year}
                    </div>
                </aside>

                <article className={styles.narrative}>
                    {project.description ? (
                        <div className="prose">
                            <PortableText value={project.description} />
                        </div>
                    ) : (
                        <p>{project.tagline}</p>
                    )}
                </article>
            </div>

            <nav className={styles.nextNav}>
                {project.nextProject && (
                    <Link href={`/projects/${project.nextProject.slug}`} className={styles.nextLink}>
                        [ NEXT PROJECT -&gt; ]
                    </Link>
                )}
            </nav>
        </main>
    );
}
