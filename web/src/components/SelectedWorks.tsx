import Link from "next/link";
import Image from "next/image";
import styles from "./SelectedWorks.module.css";
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export default async function SelectedWorks() {
    const projects = await client.fetch(PROJECTS_QUERY);
    const selectedProjects = projects.slice(0, 3);

    return (
        <section id="projects" className={styles.section}>
            <header className={styles.header}>
                <h2 className={styles.sectionTitle}>Selected Works (2023–2026)</h2>
            </header>

            <div className={styles.grid}>
                {selectedProjects.map((project: any) => (
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
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                            <div className={styles.meta}>
                                {project.location && <span>{project.location}</span>}
                                {project.location && project.year && <span>|</span>}
                                {project.year && <span>{project.year}</span>}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
