import Image from "next/image";
import styles from "./Hero.module.css";
import Wordmark from "./Wordmark";
import type { HomeData } from "@/sanity/contentTypes";

interface HeroProps {
    homeData?: HomeData | null;
}

/**
 * The hero photograph is deliberately a local asset rather than
 * `home.heroImage` from Sanity: that field still holds the logo PNG left
 * over from the previous build, which is what was rendering here at full
 * size. Once Ian uploads a photograph in the Studio, swap this back to
 * `urlFor(homeData.heroImage)` — it's a one-line change.
 */
const HERO_IMAGE = "/hero-desk.jpeg";

export default function Hero({ homeData }: HeroProps) {
    const statement =
        homeData?.statement || "We build relationships and design around people";

    return (
        <section id="hero-section" className={styles.hero}>
            <div className={styles.frame}>
                <div className={styles.column}>
                    <h1 className={styles.statement}>{statement}</h1>
                    <Wordmark />
                </div>

                <div className={styles.imageFrame}>
                    <Image
                        src={HERO_IMAGE}
                        alt="Ian at work in the Flintwell studio"
                        fill
                        sizes="(max-width: 900px) 100vw, 38vw"
                        className={styles.image}
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
