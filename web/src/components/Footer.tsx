import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.left}>
                <div className={styles.contactInfo}>
                    <p>LONDON, UK</p>
                    <p><a href="mailto:info@flintwell.com">INFO@FLINTWELL.COM</a></p>
                </div>
                <div className={styles.copyright}>
                    &copy; {currentYear} FLINTWELL INTERIOR ARCHITECTURE
                </div>
            </div>

            <div className={styles.right}>
                <Link href="https://www.instagram.com/flintwell_/#" target="_blank" className={styles.link}>
                    [ INSTAGRAM ]
                </Link>
                <Link href="/contact" className={styles.link}>
                    [ CONTACT ]
                </Link>
            </div>
        </footer>
    );
}
