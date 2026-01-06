import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

// Mock Data
const projects = [
    { id: "barbican", title: "The Barbican Flat", location: "London", size: "1200 Sq Ft", year: "2024" },
    { id: "highgate", title: "Highgate House", location: "Highgate", size: "2500 Sq Ft", year: "2023" },
    { id: "hackney", title: "Hackney Loft", location: "London", size: "900 Sq Ft", year: "2025" },
];

export default function Projects() {
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
                {projects.map((project) => (
                    <Link href={`/projects/${project.id}`} key={project.id} className={styles.card}>
                        <div className={styles.imagePlaceholder}>
                            {/* Image would go here */}
                        </div>
                        <div className={styles.info}>
                            <h2 className={styles.projectTitle}>{project.title}</h2>
                            <div className={styles.meta}>
                                <span>{project.location}</span>
                                <span>|</span>
                                <span>{project.size}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
