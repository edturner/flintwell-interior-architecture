import FlintwellWordmark from "./FlintwellWordmark";
import styles from "./Wordmark.module.css";

/**
 * The FLINTWELL lockup: tracked-out wordmark, short rule, then the
 * descriptor pair. Appears at hero scale on the homepage and again,
 * centred, on the closing footer screen.
 */
export default function Wordmark({ centred = false }: { centred?: boolean }) {
    return (
        <div className={`${styles.lockup} ${centred ? styles.centred : ""}`}>
            <FlintwellWordmark className={styles.name} />
            <span className={styles.rule} aria-hidden="true" />
            <span className={styles.descriptor}>
                interior architecture
                <span className={styles.est}>est2023</span>
            </span>
        </div>
    );
}
