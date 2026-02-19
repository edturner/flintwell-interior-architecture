import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
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
            <header className={styles.header}>
                <Link href="/#projects" className={styles.backLink}>[ CLOSE ]</Link>
                <h1 className={styles.title}>{project.title}</h1>
            </header>

            {project.mainImage && (
                <section className={styles.heroImage}>
                    <Image
                        src={urlFor(project.mainImage).width(1600).height(900).url()}
                        alt={project.title}
                        fill
                        priority
                        sizes="100vw"
                        style={{ objectFit: 'cover' }}
                    />
                </section>
            )}

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

            {project.gallery && project.gallery.length > 0 && (
                <section className={styles.gallery}>
                    {project.gallery.map((image: any, index: number) => (
                        <div key={image._key || index} className={styles.galleryItem}>
                            <Image
                                src={urlFor(image).width(800).height(600).url()}
                                alt={`${project.title} — image ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    ))}
                </section>
            )}

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
