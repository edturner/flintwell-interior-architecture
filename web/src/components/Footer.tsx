import styles from "./Footer.module.css";
import Wordmark from "./Wordmark";
import type { SiteDetails } from "@/sanity/contentTypes";

interface FooterProps {
    footerData?: SiteDetails | null;
}

const INSTAGRAM_FALLBACK = "https://www.instagram.com/flintwell_/";

export default function Footer({ footerData }: FooterProps) {
    // Computed, not hard-coded. This was pinned to 2026 with a comment about
    // server/client hydration mismatch — but Footer is a server component, so
    // there is no client render to mismatch. Under ISR the value is resolved
    // at revalidation and the client hydrates the same HTML. Left as it was,
    // the site would have said "copyright 2026" from January 2027 onward.
    const currentYear = new Date().getFullYear();

    const email = footerData?.email || "info@flintwell.com";
    const phone = footerData?.phone || "07891 818682";

    return (
        <footer className={styles.footer}>
            <div className={styles.centre}>
                <Wordmark centred />
            </div>

            <div className={styles.smallPrint}>
                <div className={styles.column}>
                    <span>copyright {currentYear}</span>
                    <span>{footerData?.copyrightText || "All rights reserved"}</span>
                </div>

                <div className={styles.column}>
                    <a href={`mailto:${email}`} className={styles.link}>
                        {email}
                    </a>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className={styles.link}>
                        {phone}
                    </a>
                </div>

                <div className={styles.column}>
                    {/* A plain anchor, not next/link: this leaves the site, so
                        prefetching and client-side navigation do nothing. */}
                    <a
                        href={footerData?.instagramUrl || INSTAGRAM_FALLBACK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        instagram
                        <span className={styles.srOnly}> (opens in a new tab)</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
