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

    if (!testimonials || testimonials.length === 0) return null;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const current = testimonials[currentIndex];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>KIND WORDS FROM CLIENTS</h2>

                <div className={styles.carousel}>
                    <button onClick={prevSlide} className={styles.navButton} aria-label="Previous testimonial">
                        ←
                    </button>

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
