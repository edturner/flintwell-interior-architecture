import Image from "next/image";
import styles from "./About.module.css";
import SectionLabel from "./SectionLabel";
import { croppedUrl, altText } from "@/sanity/lib/image";
import type { AboutData } from "@/sanity/contentTypes";

interface AboutProps {
    data?: AboutData | null;
}

const FALLBACK_TEXT =
    "We are continually building relationships with great people in the industry who, like us, love what they do. Passion, pride, and attention to detail are what we look for.\n\nArchitecturally led interior design, project management and procurement are amongst the services we offer, often acting as the centre point that brings it all together.";

/** Used when the Studio has no image and no alt to go with it. */
const FALLBACK_IMAGE = "/philosophy_process.png";
const FALLBACK_ALT = "Flintwell at work";

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
                        // Square, matching the frame — Sanity crops to the
                        // hotspot rather than CSS cropping from the centre.
                        src={
                            data?.aboutImage
                                ? croppedUrl(data.aboutImage, 900, 1)
                                : FALLBACK_IMAGE
                        }
                        alt={
                            data?.aboutImage
                                ? altText(data.aboutImage, FALLBACK_ALT)
                                : FALLBACK_ALT
                        }
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
