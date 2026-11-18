import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import styles from "./page.module.css";
import SiteHeader from "@/components/SiteHeader";
import ProjectBackLink from "@/components/ProjectBackLink";
import { DEFAULT_ORIGIN } from "@/lib/projectOrigins";
import { client } from "@/sanity/lib/client";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries";
import { croppedUrl, altText } from "@/sanity/lib/image";
import type { Project } from "@/sanity/contentTypes";

type Props = {
    params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

/**
 * Prebuilds every project page. Without this the segment was the only
 * content route Next rendered on demand (`ƒ` in the build output), so the
 * first visitor to each project — typically someone following a shared link
 * — waited on a live Sanity round-trip before receiving any HTML.
 */
export async function generateStaticParams() {
    const slugs = await client.fetch<string[]>(PROJECT_SLUGS_QUERY);
    return slugs.map((slug) => ({ slug }));
}

/**
 * Project pages used to inherit the root title and description, so every one
 * of them was identical in search results and in every link preview — on the
 * pages that are the actual portfolio, for a practice whose product is
 * images.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = await client.fetch<Project | null>(PROJECT_QUERY, { slug });

    if (!project) return { title: "Project not found" };

    const description =
        project.tagline ||
        `${project.title}${project.location ? `, ${project.location}` : ""} — a project by Flintwell Interior Architecture.`;

    return {
        title: project.title,
        description,
        openGraph: {
            title: project.title,
            description,
            type: "article",
            images: project.mainImage
                ? [
                      {
                          url: croppedUrl(project.mainImage, 1200, 1200 / 630),
                          width: 1200,
                          height: 630,
                          alt: altText(project.mainImage, project.title),
                      },
                  ]
                : undefined,
        },
    };
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = await client.fetch<Project | null>(PROJECT_QUERY, { slug });

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

                    <Suspense
                        fallback={
                            <Link
                                href={DEFAULT_ORIGIN.href}
                                className={styles.backLink}
                            >
                                {DEFAULT_ORIGIN.label}
                            </Link>
                        }
                    >
                        <ProjectBackLink className={styles.backLink} />
                    </Suspense>
                </header>

                {project.mainImage && (
                    <div className={styles.heroImage}>
                        <Image
                            src={croppedUrl(project.mainImage, 1800, 16 / 9)}
                            alt={altText(project.mainImage, project.title)}
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

                {project.gallery && project.gallery.length > 0 && (
                    <section className={styles.gallery}>
                        {project.gallery.map((image, index) => (
                            <div key={image._key || index} className={styles.galleryItem}>
                                <Image
                                    src={croppedUrl(image, 1200, 4 / 3)}
                                    // Real alt text from the Studio. The old
                                    // `${title} — image ${n}` described nothing,
                                    // which on a site that is almost entirely
                                    // photography left a screen-reader user with a
                                    // list of numbered nothings where the content is.
                                    alt={altText(image)}
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
