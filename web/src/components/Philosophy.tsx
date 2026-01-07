import Image from 'next/image';
import styles from './Philosophy.module.css';
import { urlFor } from '@/sanity/lib/image';

interface PhilosophyProps {
    data?: {
        philosophySlogan?: string;
        philosophyVisionTitle?: string;
        philosophyVisionText?: string;
        philosophyVisionImage?: any;
        philosophyApproachTitle?: string;
        philosophyApproachText?: string;
        philosophyApproachImage?: any;
    }
}

export default function Philosophy({ data }: PhilosophyProps) {
    if (!data) return null;

    const {
        philosophySlogan = 'The most complicated thing is simplicity',
        philosophyVisionTitle = 'Our Vision',
        philosophyVisionText = 'We are driven by a creative design vision, with a clear objective: to achieve exceptional ergonomic and aesthetic outcomes for every project. Working closely with architects, investors, and developers, we deliver refined and enduring standards of living.',
        philosophyVisionImage,
        philosophyApproachTitle = 'Our Approach',
        philosophyApproachText = 'Exceptional service is at the core of our practice. Over the years, we have developed a structured and considered process that brings all disciplines together, ensuring each trade is aligned with the overall design intent.',
        philosophyApproachImage
    } = data;

    // Helper to render text with newlines as paragraphs
    const renderText = (text: string) => {
        return text.split('\n\n').map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
                {paragraph}
            </p>
        ));
    };

    return (
        <section className={styles.philosophySection}>
            {/* Quote Banner */}
            <div className={styles.quoteBanner}>
                <h2 className={styles.slogan}>
                    {philosophySlogan}
                </h2>
            </div>

            <div className={styles.contentContainer}>
                {/* Block 1: Vision */}
                <div className={styles.block}>
                    <div className={styles.imageWrapper}>
                        {philosophyVisionImage ? (
                            <Image
                                src={urlFor(philosophyVisionImage).url()}
                                alt={philosophyVisionTitle}
                                fill
                                className={styles.image}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        ) : (
                            <Image
                                src="/philosophy_interior.png"
                                alt="Interior Design Vision"
                                fill
                                className={styles.image}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        )}
                    </div>
                    <div className={styles.textWrapper}>
                        <h3 className={styles.blockTitle}>{philosophyVisionTitle}</h3>
                        {renderText(philosophyVisionText)}
                    </div>
                </div>

                {/* Block 2: Approach */}
                <div className={styles.block}>
                    <div className={styles.imageWrapper}>
                        {philosophyApproachImage ? (
                            <Image
                                src={urlFor(philosophyApproachImage).url()}
                                alt={philosophyApproachTitle}
                                fill
                                className={styles.image}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        ) : (
                            <Image
                                src="/philosophy_process.png"
                                alt="Design Process"
                                fill
                                className={styles.image}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        )}
                    </div>
                    <div className={styles.textWrapper}>
                        <h3 className={styles.blockTitle}>{philosophyApproachTitle}</h3>
                        {renderText(philosophyApproachText)}
                    </div>
                </div>
            </div>
        </section>
    );
}
