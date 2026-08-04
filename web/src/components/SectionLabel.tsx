import styles from "./SectionLabel.module.css";

/**
 * The tracked lowercase section heading that sits flush right under the
 * menu on every screen: "about us + what we do", "selected work",
 * "our friends", "lets chat".
 */
export default function SectionLabel({ children }: { children: React.ReactNode }) {
    return <h2 className={styles.label}>{children}</h2>;
}
