"use client";

import { useState } from "react";
import styles from "./Testimonials.module.css";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type Testimonial = {
    quote: string;
    author: string;
    role?: string;
    image?: any;
};

type Props = {
    testimonials: Testimonial[];
};

export default function Testimonials({ testimonials }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    if (!testimonials || testimonials.length === 0) return null;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            nextSlide();
        }
        if (isRightSwipe) {
            prevSlide();
        }

        // Reset
        setTouchEnd(0);
        setTouchStart(0);
    };

    const current = testimonials[currentIndex];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>KIND WORDS FROM CLIENTS</h2>

                <div
                    className={styles.carousel}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className={styles.slideContainer}>
                        <div className={styles.content}>
                            <p className={styles.quote}>"{current.quote}"</p>
                            <div className={styles.authorContainer}>
                                {current.image && (
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={urlFor(current.image).width(100).height(100).url()}
                                            alt={current.author}
                                            width={50}
                                            height={50}
                                            className={styles.avatar}
                                        />
                                    </div>
                                )}
                                <div className={styles.meta}>
                                    <p className={styles.name}>{current.author}</p>
                                    {current.role && <p className={styles.role}>{current.role}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.controls}>
                    <button onClick={prevSlide} className={styles.navButton} aria-label="Previous testimonial">
                        ←
                    </button>
                    <button onClick={nextSlide} className={styles.navButton} aria-label="Next testimonial">
                        →
                    </button>
                </div>

                <div className={styles.dots}>
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
