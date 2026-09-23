import FlintwellWordmark from "./FlintwellWordmark";
import styles from "./Wordmark.module.css";

/**
 * The FLINTWELL wordmark. Appears at hero scale on the homepage and again,
 * centred, on the closing footer screen.
 *
 * The short rule and the "interior architecture / est2023" descriptor that
 * used to sit beneath it were removed at the client's request, so this is
 * now the artwork alone — hence `centred` only needing to change alignment.
 */
export default function Wordmark({ centred = false }: { centred?: boolean }) {
    return (
        <div className={`${styles.lockup} ${centred ? styles.centred : ""}`}>
            <FlintwellWordmark className={styles.name} />
        </div>
    );
}
