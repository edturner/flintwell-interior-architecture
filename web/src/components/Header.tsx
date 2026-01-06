"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import NavigationMenu from "./NavigationMenu";

export default function Header() {
    const [showLogo, setShowLogo] = useState(false);

    useEffect(() => {
        // Use IntersectionObserver to watch the Hero section
        const heroSection = document.getElementById("hero-section");

        if (!heroSection) {
            // Fallback if hero not found immediately
            setShowLogo(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Show logo when Hero is NOT intersecting (i.e. scrolled past)
                setShowLogo(!entry.isIntersecting);
            },
            {
                threshold: 0, // Trigger as soon as one pixel is visible
                rootMargin: "0px" // Exact viewport match
            }
        );

        observer.observe(heroSection);

        return () => observer.disconnect();
    }, []);

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        const hero = document.getElementById('hero-section');
        if (hero) {
            hero.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <header className={`${styles.header} ${showLogo ? styles.scrolled : ''}`}>
            <div className={`${styles.logoContainer} ${showLogo ? styles.logoVisible : ''}`}>
                <Link href="/" onClick={scrollToTop} className={styles.logoLink}>
                    {/* Using standard img tag for SVG to ensure immediate visibility without optimization delays */}
                    <img
                        src="/logo.svg"
                        alt="Flintwell Logo"
                        className={styles.logo}
                    />
                </Link>
            </div>
            <div className={styles.navContainer}>
                <NavigationMenu />
            </div>
        </header>
    );
}
