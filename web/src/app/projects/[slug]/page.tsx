import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import styles from "./page.module.css";
import SiteHeader from "@/components/SiteHeader";
import { client } from "@/sanity/lib/client";
import { PROJECT_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

type Props = {
    params: Promise<{ slug: string }>;
};

type GalleryImage = SanityImageSource & { _key?: string };

export const revalidate = 30;

export default async function ProjectPage({ params }: Props) {
    const resolvedParams = await params;
    const project = await client.fetch(PROJECT_QUERY, { slug: resolvedParams.slug });

    if (!project) {
        notFound();
    }

    return (
        <>
            <SiteHeader />
            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.titleRow}>
                        {project.projectNumber && (
                            <>
                                <span className={styles.number}>project{project.projectNumber}</span>
                                <span className={styles.divider} aria-hidden="true">
                                    |
                                </span>
                            </>
                        )}
                        <h1 className={styles.title}>{project.title}</h1>
                    </div>

                    <Link href="/projects" className={styles.backLink}>
                        back to work
                    </Link>
                </header>

                {project.mainImage && (
                    <div className={styles.heroImage}>
                        <Image
                            src={urlFor(project.mainImage).width(1800).url()}
                            alt={project.title}
                            fill
                            priority
                            sizes="100vw"
                            className={styles.cover}
                        />
                    </div>
                )}

                <div className={styles.contentGrid}>
                    <aside className={styles.meta}>
                        {project.location && (
                            <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>location</span>
                                {project.location}
                            </div>
                        )}
                        {project.year && (
                            <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>year</span>
                                {project.year}
                            </div>
                        )}
                    </aside>

                    <article className={styles.narrative}>
                        {project.description ? (
                            <PortableText value={project.description} />
                        ) : (
                            project.tagline && <p>{project.tagline}</p>
                        )}
                    </article>
                </div>

                {project.gallery?.length > 0 && (
                    <section className={styles.gallery}>
                        {project.gallery.map((image: GalleryImage, index: number) => (
                            <div key={image._key || index} className={styles.galleryItem}>
                                <Image
                                    src={urlFor(image).width(1200).url()}
                                    alt={`${project.title} — image ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className={styles.cover}
                                />
                            </div>
                        ))}
                    </section>
                )}

                {project.nextProject && (
                    <nav className={styles.nextNav}>
                        <Link href={`/projects/${project.nextProject.slug}`} className={styles.nextLink}>
                            next project
                        </Link>
                    </nav>
                )}
            </main>
        </>
    );
}
