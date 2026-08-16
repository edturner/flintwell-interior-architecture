import Image from "next/image";
import styles from "./About.module.css";
import SectionLabel from "./SectionLabel";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface AboutProps {
    data?: {
        aboutHeading?: string;
        aboutText?: string;
        aboutImage?: SanityImageSource;
    };
}

const FALLBACK_TEXT =
    "We are continually building relationships with great people in the industry who, like us, love what they do. Passion, pride, and attention to detail are what we look for.\n\nArchitecturally led interior design, project management and procurement are amoungst the services we offer, often acting as the centre point that brings it all together.";

export default function About({ data }: AboutProps) {
    const heading = data?.aboutHeading || "about us + what we do";
    const paragraphs = (data?.aboutText || FALLBACK_TEXT)
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean);

    return (
        <section id="about" className={styles.section}>
            <div className={styles.imageColumn}>
                <div className={styles.imageFrame}>
                    <Image
                        src={
                            data?.aboutImage
                                ? urlFor(data.aboutImage).width(900).url()
                                : "/philosophy_process.png"
                        }
                        alt="Flintwell at work"
                        fill
                        sizes="(max-width: 900px) 100vw, 40vw"
                        className={styles.image}
                    />
                </div>
            </div>

            <div className={styles.textColumn}>
                <SectionLabel>{heading}</SectionLabel>

                <div className={styles.copy}>
                    {paragraphs.map((paragraph, i) => (
                        <p key={i} className={styles.paragraph}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
}
