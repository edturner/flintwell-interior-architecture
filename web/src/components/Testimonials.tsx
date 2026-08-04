"use client";

import { useState } from "react";
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

const SWIPE_THRESHOLD = 50;

/**
 * "our friends" — one blush screen, cycling through the quotes.
 *
 * The mockups draw each testimonial as its own panel; running them as a
 * carousel keeps that composition while collapsing a very long scroll into
 * a single screen.
 */
export default function Testimonials({ testimonials }: Props) {
    const [index, setIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);

    if (!testimonials?.length) return null;

    const count = testimonials.length;
    const current = testimonials[index];

    const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

    const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStart === null) return;
        const distance = touchStart - e.changedTouches[0].clientX;
        if (Math.abs(distance) > SWIPE_THRESHOLD) go(distance > 0 ? 1 : -1);
        setTouchStart(null);
    };

    return (
        <section id="friends" className={styles.panel}>
            <div className={styles.header}>
                <SectionLabel>our friends</SectionLabel>
            </div>

            <div
                className={styles.stage}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Keyed so each quote re-runs the fade as it comes in. */}
                <figure key={index} className={styles.figure}>
                    <blockquote className={styles.quote}>&ldquo; {current.quote} &rdquo;</blockquote>

                    <figcaption className={styles.attribution}>
                        <span className={styles.author}>{current.author}</span>
                        {current.role && (
                            <span className={styles.roleGroup}>
                                <span className={styles.divider} aria-hidden="true">
                                    |
                                </span>
                                <span className={styles.role}>{current.role}</span>
                            </span>
                        )}
                    </figcaption>
                </figure>

                {count > 1 && (
                    <div className={styles.controls}>
                        <button
                            type="button"
                            onClick={() => go(-1)}
                            className={styles.arrow}
                            aria-label="Previous testimonial"
                        >
                            <Arrow direction="left" />
                        </button>

                        <span className={styles.counter}>
                            {String(index + 1).padStart(2, "0")}
                            <span className={styles.counterRule} aria-hidden="true" />
                            {String(count).padStart(2, "0")}
                        </span>

                        <button
                            type="button"
                            onClick={() => go(1)}
                            className={styles.arrow}
                            aria-label="Next testimonial"
                        >
                            <Arrow direction="right" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

/** Drawn rather than typed, so it can't fall back to a mismatched glyph. */
function Arrow({ direction }: { direction: "left" | "right" }) {
    return (
        <svg
            viewBox="0 0 28 10"
            className={styles.arrowGlyph}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            aria-hidden="true"
            style={direction === "left" ? { transform: "scaleX(-1)" } : undefined}
        >
            <path d="M0 5h27M22.5 1L27 5l-4.5 4" />
        </svg>
    );
}
