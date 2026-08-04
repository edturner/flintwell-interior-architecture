import styles from "./Testimonials.module.css";
import SectionLabel from "./SectionLabel";

type Testimonial = {
    quote: string;
    author: string;
    role?: string;
};

type Props = {
    testimonials: Testimonial[];
};

/**
 * "our friends" — one blush screen per quote, as drawn. No carousel:
 * the mockups give each testimonial its own full-height panel.
 */
export default function Testimonials({ testimonials }: Props) {
    if (!testimonials?.length) return null;

    return (
        <div id="friends" className={styles.run}>
            {testimonials.map((testimonial, i) => (
                <section key={i} className={styles.panel}>
                    <div className={styles.header}>
                        <SectionLabel>our friends</SectionLabel>
                    </div>

                    <figure className={styles.figure}>
                        <blockquote className={styles.quote}>
                            &ldquo; {testimonial.quote} &rdquo;
                        </blockquote>

                        <figcaption className={styles.attribution}>
                            <span className={styles.author}>{testimonial.author}</span>
                            {testimonial.role && (
                                <>
                                    <span className={styles.divider} aria-hidden="true">
                                        |
                                    </span>
                                    <span className={styles.role}>{testimonial.role}</span>
                                </>
                            )}
                        </figcaption>
                    </figure>
                </section>
            ))}
        </div>
    );
}
