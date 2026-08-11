import Image from "next/image";
import styles from "./ComingSoon.module.css";

const INSTAGRAM_URL = "https://www.instagram.com/flintwell_/";
const EMAIL = "info@flintwell.com";

export default function ComingSoon() {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.inner}>
                    {/* Ian's mark. Source artwork is public/flintwell-mark.svg —
                        a raster wrapped in SVG, so this cropped PNG is the
                        lighter, better-centred asset to actually render. */}
                    <Image
                        className={styles.mark}
                        src="/flintwell-mark.png"
                        alt="Flintwell"
                        width={512}
                        height={512}
                        priority
                        // served straight from /public — keeps the holding page
                        // fully static, with no image-optimizer round trip
                        unoptimized
                    />

                    <h1 className={styles.wordmark}>FLINTWELL</h1>

                    <div className={styles.rule} role="presentation" />

                    <p className={styles.descriptor}>interior architecture</p>
                    <p className={styles.est}>est2023</p>

                    <p className={styles.message}>
                        A new site is in progress.
                        <br />
                        <span className={styles.soft}>
                            Recent work and projects are posted on Instagram.
                        </span>
                    </p>

                    <nav className={styles.links} aria-label="Contact">
                        <a
                            className={styles.link}
                            href={INSTAGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>
                        <span className={styles.sep} role="presentation" />
                        <a className={styles.link} href={`mailto:${EMAIL}`}>
                            {EMAIL}
                        </a>
                    </nav>
                </div>
            </main>

            <footer className={styles.footer}>Sussex, UK</footer>
        </>
    );
}
