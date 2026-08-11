import styles from "./ComingSoon.module.css";

const INSTAGRAM_URL = "https://www.instagram.com/flintwell_/";
const EMAIL = "info@flintwell.com";

export default function ComingSoon() {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.inner}>
                    <svg
                        className={styles.mark}
                        viewBox="0 0 1600 1600"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="Flintwell"
                    >
                        <g stroke="#141414" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M 712 258 C 690 400 636 700 434 1332" />
                            <path d="M 312 566 C 700 512 1050 470 1388 420" />
                        </g>
                        <circle cx="900" cy="886" r="32" fill="#141414" />
                    </svg>

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
