"use client";

import { useState } from "react";
import styles from "./Testimonials.module.css";
import SectionLabel from "./SectionLabel";
import type { Testimonial } from "@/sanity/contentTypes";

type Props = {
    testimonials: Testimonial[];
};

const SWIPE_THRESHOLD = 50;
/** px per ms. Above this the gesture reads as a flick regardless of distance. */
const SWIPE_VELOCITY = 0.11;

/**
 * "our friends" — one blush screen, cycling through the quotes.
 *
 * Every quote is rendered into the same CSS grid cell, so the stage is
 * always as tall as the longest one and nothing reflows when the slide
 * changes. Inactive slides are faded out rather than unmounted; measuring
 * heights in JS or animating a container height would reintroduce exactly
 * the movement this avoids.
 */
export default function Testimonials({ testimonials }: Props) {
    const [index, setIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<{ x: number; time: number } | null>(null);

    if (!testimonials?.length) return null;

    const count = testimonials.length;

    const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        if (!touch) return;
        setTouchStart({ x: touch.clientX, time: Date.now() });
    };

    // Distance *or* velocity, not distance alone. A fast 40px flick is
    // unmistakably a swipe and used to do nothing, while a slow 60px drag
    // advanced — velocity is what separates intent from a stray touch.
    const handleTouchEnd = (e: React.TouchEvent) => {
        const touch = e.changedTouches[0];
        if (touchStart === null || !touch) return;
        const distance = touchStart.x - touch.clientX;
        const elapsed = Math.max(Date.now() - touchStart.time, 1);
        const velocity = Math.abs(distance) / elapsed;

        if (Math.abs(distance) > SWIPE_THRESHOLD || velocity > SWIPE_VELOCITY) {
            go(distance > 0 ? 1 : -1);
        }
        setTouchStart(null);
    };

    return (
        <section id="friends" className={styles.panel}>
            <div className={styles.header}>
                <SectionLabel>our friends</SectionLabel>
            </div>

            <div
                className={styles.carousel}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                role="group"
                aria-roledescription="carousel"
                aria-label="What our clients say"
            >
                {/* Polite live region: pressing "next testimonial" used to
                    produce silence for a screen-reader user — the counter
                    changed but nothing announced it, so the only way to find
                    the new quote was to navigate back into the region by
                    hand. Because inactive slides are `inert`, the only thing
                    exposed here is the active quote, which is exactly what
                    should be read out. */}
                <div className={styles.stage} aria-live="polite" aria-atomic="true">
                    {testimonials.map((testimonial, i) => {
                        const isActive = i === index;

                        return (
                            <figure
                                key={i}
                                className={`${styles.slide} ${isActive ? styles.slideActive : ""}`}
                                inert={!isActive}
                            >
                                {/* Marks sit tight against the words, and the
                                    stylesheet hangs the opening one into the
                                    margin so the text edge stays flush. */}
                                <blockquote className={styles.quote}>
                                    &ldquo;{testimonial.quote}&rdquo;
                                </blockquote>

                                <figcaption className={styles.attribution}>
                                    <span className={styles.author}>{testimonial.author}</span>
                                    {testimonial.role && (
                                        <span className={styles.roleGroup}>
                                            <span className={styles.divider} aria-hidden="true">
                                                |
                                            </span>
                                            <span className={styles.role}>{testimonial.role}</span>
                                        </span>
                                    )}
                                </figcaption>
                            </figure>
                        );
                    })}
                </div>

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
