import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import styles from "./error.module.css";

export const metadata = {
    title: "Page not found",
};

/**
 * Reached by `notFound()` on an unknown project slug, and by any bad URL.
 * Offers the listing rather than only the homepage — someone who mistyped a
 * project URL is looking for a project.
 */
export default function NotFound() {
    return (
        <>
            <SiteHeader />
            <main className={styles.main}>
                <div className={styles.block}>
                    <h1 className={styles.title}>That page isn&rsquo;t here</h1>

                    <p className={styles.copy}>
                        The link may be out of date, or the project may have moved.
                        The work is all in one place.
                    </p>

                    <div className={styles.actions}>
                        <Link href="/projects" className={styles.action}>
                            see all work
                        </Link>
                        <Link href="/" className={styles.action}>
                            back to home
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
