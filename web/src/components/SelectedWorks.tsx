import Link from "next/link";
import Image from "next/image";
import styles from "./SelectedWorks.module.css";
import SectionLabel from "./SectionLabel";
import RevealGrid from "./RevealGrid";
import { croppedUrl, altText } from "@/sanity/lib/image";
import type { ProjectSummary } from "@/sanity/contentTypes";

interface SelectedWorksProps {
    projects: ProjectSummary[];
    /** Rendered once at the top of the run; omit where the page supplies its own. */
    showLabel?: boolean;
    /** Caps the run. Omit to show everything, as /projects does. */
    limit?: number;
    /** Renders the closing link when set. The page decides where it goes. */
    moreHref?: string;
    /**
     * Below 640px, lay the run out as a swipeable track rather than stacking
     * it. Worth it on the homepage, where the section is a taster competing
     * with everything below it, and wrong on /projects, where the visitor
     * came to browse the lot.
     */
    swipeOnMobile?: boolean;
    /**
     * Travels with each card so the project page knows where to send you
     * back to. Omitted on /projects, which is the default destination
     * anyway — that keeps the param off the URL in the common case.
     */
    cardOrigin?: "home";
    /**
     * Eager-loads the first row. Set on /projects, where the grid sits
     * directly under a short header and the first row is almost certainly
     * the LCP element — next/image lazy-loads by default, which meant the
     * LCP image couldn't start downloading until layout and the intersection
     * check had run. Left off on the homepage, where the section is well
     * below the fold and lazy is correct.
     */
    prioritiseFirstRow?: boolean;
}

/** Matches the `aspect-ratio: 4 / 5` the frames impose. Sanity does the crop
 *  so the hotspot is honoured; see croppedUrl. */
const NOMINAL_WIDTH = 900;
const CARD_ASPECT = 4 / 5;

/** The widest the grid ever goes: 3 columns above 1100px. */
const FIRST_ROW = 3;

/** Drawn rather than a glyph, so it keeps the hairline weight of the rules. */
function Arrow({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 26 10"
            fill="none"
            aria-hidden="true"
            focusable="false"
        >
            <path
                d="M0 5h24M19.5 1 24 5l-4.5 4"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}

export default function SelectedWorks({
    projects,
    showLabel = true,
    limit,
    moreHref,
    swipeOnMobile = false,
    cardOrigin,
    prioritiseFirstRow = false,
}: SelectedWorksProps) {
    if (!projects?.length) return null;

    const shown = typeof limit === "number" ? projects.slice(0, limit) : projects;

    // A swiped card is 78vw, not the full width a stacked one takes.
    const sizes = swipeOnMobile
        ? "(max-width: 640px) 78vw, (max-width: 1100px) 50vw, 30vw"
        : "(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 30vw";

    return (
        <section id="work" className={styles.section}>
            {showLabel && (
                <div className={styles.header}>
                    <SectionLabel>selected work</SectionLabel>
                </div>
            )}

            <RevealGrid
                className={
                    swipeOnMobile ? `${styles.grid} ${styles.gridSwipe}` : styles.grid
                }
            >
                {shown.map((project, i) => (
                    <Link
                        href={`/projects/${project.slug}${
                            cardOrigin ? `?from=${cardOrigin}` : ""
                        }`}
                        key={project._id}
                        className={styles.card}
                        style={{ "--i": i } as React.CSSProperties}
                    >
                        <div className={styles.frame}>
                            {project.mainImage && (
                                <Image
                                    src={croppedUrl(
                                        project.mainImage,
                                        NOMINAL_WIDTH,
                                        CARD_ASPECT
                                    )}
                                    // The card is a link whose accessible name
                                    // is the project title below it, so the
                                    // Studio's alt is the useful thing here and
                                    // the title is only a fallback.
                                    alt={altText(project.mainImage, project.title)}
                                    fill
                                    sizes={sizes}
                                    className={styles.image}
                                    priority={prioritiseFirstRow && i < FIRST_ROW}
                                />
                            )}
                        </div>

                        <div className={styles.caption}>
                            <span className={styles.captionText}>
                                {project.projectNumber && (
                                    <>
                                        <span className={styles.number}>
                                            project{project.projectNumber}
                                        </span>
                                        <span
                                            className={styles.divider}
                                            aria-hidden="true"
                                        >
                                            |
                                        </span>
                                    </>
                                )}
                                <span className={styles.name}>{project.title}</span>
                            </span>

                            <Arrow className={styles.arrow} />
                        </div>
                    </Link>
                ))}
            </RevealGrid>

            {moreHref && (
                <div className={styles.footer}>
                    <Link href={moreHref} className={styles.moreLink}>
                        <span>see all work</span>
                        <Arrow className={styles.moreArrow} />
                    </Link>
                </div>
            )}
        </section>
    );
}
