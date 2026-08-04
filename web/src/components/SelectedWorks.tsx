import Link from "next/link";
import Image from "next/image";
import styles from "./SelectedWorks.module.css";
import SectionLabel from "./SectionLabel";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface ProjectSummary {
    _id: string;
    title: string;
    projectNumber?: string;
    slug: string;
    mainImage?: SanityImageSource;
    aspect?: number;
}

interface SelectedWorksProps {
    projects: ProjectSummary[];
    /** Rendered once at the top of the run; omit where the page supplies its own. */
    showLabel?: boolean;
}

const NOMINAL_WIDTH = 800;

export default function SelectedWorks({ projects, showLabel = true }: SelectedWorksProps) {
    if (!projects?.length) return null;

    return (
        <section id="work" className={styles.section}>
            {showLabel && (
                <div className={styles.header}>
                    <SectionLabel>selected work</SectionLabel>
                </div>
            )}

            <div className={styles.grid}>
                {projects.map((project) => {
                    // Fall back to 4:3 when Sanity has no dimension metadata,
                    // so a missing asset can't collapse the row.
                    const aspect = project.aspect && project.aspect > 0 ? project.aspect : 4 / 3;

                    return (
                        <Link
                            href={`/projects/${project.slug}`}
                            key={project._id}
                            className={styles.card}
                        >
                            <div className={styles.frame}>
                                {project.mainImage && (
                                    <Image
                                        src={urlFor(project.mainImage).width(NOMINAL_WIDTH).url()}
                                        alt={project.title}
                                        width={NOMINAL_WIDTH}
                                        height={Math.round(NOMINAL_WIDTH / aspect)}
                                        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 30vw"
                                        className={styles.image}
                                    />
                                )}
                            </div>

                            <div className={styles.caption}>
                                {project.projectNumber && (
                                    <>
                                        <span className={styles.number}>
                                            project{project.projectNumber}
                                        </span>
                                        <span className={styles.divider} aria-hidden="true">
                                            |
                                        </span>
                                    </>
                                )}
                                <span className={styles.name}>{project.title}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
