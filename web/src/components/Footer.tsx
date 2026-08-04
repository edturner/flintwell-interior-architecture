import Link from "next/link";
import styles from "./Footer.module.css";
import Wordmark from "./Wordmark";

interface FooterProps {
    footerData?: {
        email?: string;
        phone?: string;
        instagramUrl?: string;
        copyrightText?: string;
    };
}

export default function Footer({ footerData }: FooterProps) {
    // Fixed rather than derived from Date, so the server and client render
    // the same markup.
    const currentYear = 2026;

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
                    <Link
                        href={footerData?.instagramUrl || "https://www.instagram.com/flintwell_/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        instagram
                    </Link>
                </div>
            </div>
        </footer>
    );
}
