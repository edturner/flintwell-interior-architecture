import Link from "next/link";
import styles from "./Footer.module.css";

interface FooterProps {
    footerData?: {
        location: string;
        email: string;
        instagramUrl: string;
        copyrightText: string;
    }
}

export default function Footer({ footerData }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.left}>
                <div className={styles.contactInfo}>
                    <p>{footerData?.location || 'LONDON, UK'}</p>
                    <p>
                        <a href={`mailto:${footerData?.email || 'INFO@FLINTWELL.COM'}`}>
                            {footerData?.email || 'INFO@FLINTWELL.COM'}
                        </a>
                    </p>
                </div>
                <div className={styles.copyright}>
                    &copy; {currentYear} {footerData?.copyrightText || 'FLINTWELL INTERIOR ARCHITECTURE'}
                </div>
            </div>

            <div className={styles.right}>
                <Link href={footerData?.instagramUrl || "https://www.instagram.com/flintwell_/#"} target="_blank" className={styles.link}>
                    [ INSTAGRAM ]
                </Link>
                <Link href="/contact" className={styles.link}>
                    [ CONTACT ]
                </Link>
            </div>
        </footer>
    );
}
