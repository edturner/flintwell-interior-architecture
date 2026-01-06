import Link from "next/link";
import styles from "./SelectedWorks.module.css";

// Mock Data
const projects = [
    { id: "barbican", title: "The Barbican Flat", location: "London", size: "1200 Sq Ft", year: "2024" },
    { id: "highgate", title: "Highgate House", location: "Highgate", size: "2500 Sq Ft", year: "2023" },
    { id: "hackney", title: "Hackney Loft", location: "London", size: "900 Sq Ft", year: "2025" },
];

export default function SelectedWorks() {
    return (
        <section id="projects" className={styles.section}>
            <header className={styles.header}>
                <h2 className={styles.sectionTitle}>Selected Works (2023–2026)</h2>
            </header>

            <div className={styles.grid}>
                {projects.map((project) => (
                    <Link href={`/projects/${project.id}`} key={project.id} className={styles.card}>
                        <div className={styles.imagePlaceholder}>
                            {/* Image would go here */}
                        </div>
                        <div className={styles.info}>
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                            <div className={styles.meta}>
                                <span>{project.location}</span>
                                <span>|</span>
                                <span>{project.size}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
