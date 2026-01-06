import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import styles from "./page.module.css";

export default async function Projects() {
    const projects = await client.fetch(PROJECTS_QUERY);

    return (
        <main className={`grid-technical ${styles.main}`}>
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>SELECTED WORKS (2023–2026)</h1>
                <Link href="/" className={styles.homeLink}>
                    <Image
                        src="/logo.jpeg"
                        alt="Home"
                        width={80}
                        height={30}
                        className={styles.logo}
                        style={{ objectFit: 'contain' }}
                    />
                </Link>
            </header>

            <div className={styles.grid}>
                {projects.map((project: any) => (
                    <Link href={`/projects/${project.slug}`} key={project._id} className={styles.card}>
                        <div className={styles.imagePlaceholder} style={{ position: 'relative' }}>
                            {project.mainImage && (
                                <Image
                                    src={urlFor(project.mainImage).width(800).height(600).url()}
                                    alt={project.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            )}
                        </div>
                        <div className={styles.info}>
                            <h2 className={styles.projectTitle}>{project.title}</h2>
                            <div className={styles.meta}>
                                {project.location && <span>{project.location}</span>}
                                {project.location && project.year && <span>|</span>}
                                {project.year && <span>{project.year}</span>}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
