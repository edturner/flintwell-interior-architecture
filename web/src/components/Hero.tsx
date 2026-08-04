import Image from "next/image";
import styles from "./Hero.module.css";
import Wordmark from "./Wordmark";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface HeroProps {
    homeData?: {
        statement?: string;
        description?: string;
        heroImage?: SanityImageSource;
    };
}

export default function Hero({ homeData }: HeroProps) {
    const statement =
        homeData?.statement || "We build relationships and design around people";

    return (
        <section id="hero-section" className={styles.hero}>
            <h1 className={styles.statement}>{statement}</h1>

            <div className={styles.lower}>
                <Wordmark />

                <div className={styles.imageFrame}>
                    <Image
                        src={
                            homeData?.heroImage
                                ? urlFor(homeData.heroImage).width(1100).url()
                                : "/hero-main.jpeg"
                        }
                        alt="Flintwell on site"
                        fill
                        sizes="(max-width: 900px) 100vw, 45vw"
                        className={styles.image}
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
