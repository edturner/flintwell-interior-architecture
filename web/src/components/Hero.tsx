"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";
import { urlFor } from "@/sanity/lib/image";

interface HeroProps {
    homeData: any;
}

export default function Hero({ homeData }: HeroProps) {
    const handleScrollToBottom = (e: React.MouseEvent) => {
        e.preventDefault();
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    return (
        <section id="hero-section" className={styles.heroSection}>
            <div className={styles.centerContent}>
                <div className={styles.textHeader}>
                    <h1 className={styles.title}>{homeData?.title || "FLINTWELL"}</h1>
                    <p className={styles.subtitle}>{homeData?.subtitle || ":Architecturally led interior design"}</p>
                </div>
                <p className={styles.description}>
                    {homeData?.description ||
                        "Driven by creativity, we design with purpose—crafting spaces that are both ergonomically refined and visually striking. We work closely with developers and architects to collaboratively achieve beautiful standards of living."}
                </p>

                <div className={styles.floatingImageContainer}>
                    {homeData?.heroImage ? (
                        <Image
                            src={urlFor(homeData.heroImage).width(800).url()}
                            alt="Flintwell Architecture"
                            width={800}
                            height={600}
                            className={styles.floatingImage}
                            priority
                        />
                    ) : (
                        <Image
                            src="/hero-main.jpeg"
                            alt="Flintwell Architecture"
                            width={800}
                            height={600}
                            className={styles.floatingImage}
                            priority
                        />
                    )}
                </div>
            </div>

            <div className={styles.footerAction}>
                <Link href="#contact" className={styles.startProject} onClick={handleScrollToBottom}>
                    [ START YOUR PROJECT -&gt; ]
                </Link>
            </div>
        </section>
    );
}
