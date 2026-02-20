import Image from "next/image";
import styles from "./ComingSoon.module.css";

export default function ComingSoon() {
    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <Image
                    src="/logo.svg"
                    alt="Flintwell Interior Architecture"
                    width={160}
                    height={60}
                    className={styles.logo}
                    priority
                />

                <div className={styles.divider} />

                <h1 className={styles.heading}>Something beautiful<br />is on its way.</h1>

                <p className={styles.tagline}>Architecturally led interior design</p>

                <div className={styles.accentBar} />

                <div className={styles.contact}>
                    <span className={styles.contactLabel}>Enquiries</span>
                    <a href="mailto:inquiry@flintwell.com" className={styles.contactLink}>
                        inquiry@flintwell.com
                    </a>
                </div>
            </div>
        </div>
    );
}
