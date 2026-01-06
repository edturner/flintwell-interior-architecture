"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ComparisonSlider.module.css";

interface ComparisonSliderProps {
    planImage?: string; // URL for the floor plan
    photoImage?: string; // URL for the finished photo
}

export default function ComparisonSlider({ planImage, photoImage }: ComparisonSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderPosition(Number(e.target.value));
    };

    return (
        <div className={styles.container} ref={containerRef}>
            {/* Background Layer: Finished Photo */}
            <div className={styles.imageLayer}>
                {photoImage ? (
                    <img src={photoImage} alt="Finished Reality" className={styles.image} />
                ) : (
                    /* Placeholder for Photo if no src provided */
                    <div className={`${styles.placeholder} ${styles.photoPlaceholder}`}>
                        <span>FINISHED REALITY</span>
                    </div>
                )}
            </div>

            {/* Foreground Layer: Floor Plan (Clipped) */}
            <div
                className={styles.imageLayer}
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                {planImage ? (
                    <img src={planImage} alt="CAD Plan" className={styles.image} />
                ) : (
                    /* Placeholder for Plan */
                    <div className={`${styles.placeholder} ${styles.planPlaceholder}`}>
                        <span>CAD PLAN</span>
                    </div>
                )}
            </div>

            {/* Slider Handle */}
            <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleDrag}
                className={styles.sliderInput}
            />

            <div
                className={styles.sliderLine}
                style={{ left: `${sliderPosition}%` }}
            >
                <div className={styles.sliderButton}>
                    &lt;&gt;
                </div>
            </div>
        </div>
    );
}
