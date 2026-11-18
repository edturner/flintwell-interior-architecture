import styles from "./SectionLabel.module.css";

/**
 * The tracked lowercase section heading that sits flush right under the
 * menu on every screen: "about us + what we do", "selected work",
 * "our friends", "lets chat".
 *
 * `as` exists because on /contact this label *is* the page title — that page
 * had no h1 at all, so its heading outline started at h2. Everywhere else the
 * default h2 is correct.
 */
export default function SectionLabel({
    children,
    as: Tag = "h2",
}: {
    children: React.ReactNode;
    as?: "h1" | "h2";
}) {
    return <Tag className={styles.label}>{children}</Tag>;
}
