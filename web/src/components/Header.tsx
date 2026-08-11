"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import FlintwellMark from "./FlintwellMark";

/**
 * Fixed chrome present on every screen of the mockups: the "f." mark top
 * left, the "menu" control top right, and the full-screen terracotta
 * overlay it opens.
 *
 * Header and overlay share one component because the "menu" control sits
 * *above* the overlay and inverts with it.
 */
export interface MenuDetails {
    email?: string;
    phone?: string;
    addressLines?: string[];
    menuSlogan?: string;
}

/**
 * How far down the page the bar appears. Small, so it settles in as soon as
 * the hero starts moving rather than waiting for a section boundary.
 */
const BAR_THRESHOLD = 24;

export default function Header({ details }: { details?: MenuDetails }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const email = details?.email || "info@flintwell.com";
    const phone = details?.phone || "07891 818682";
    const addressLines = details?.addressLines?.length
        ? details.addressLines
        : ["Flintwell Developments Ltd", "12a Marlborough Place", "Brighton BN1 1WN"];
    const slogan = details?.menuSlogan || "the most complicated thing is simplicity";

    // Lock the page behind the overlay, and allow Escape to dismiss it.
    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen]);

    // The chrome stays put the whole way down; once you're off the top it
    // settles onto a translucent bar so the mark and "menu" stay legible
    // over whatever is scrolling underneath.
    useEffect(() => {
        let frame = 0;

        const update = () => {
            frame = 0;
            setIsScrolled(window.scrollY > BAR_THRESHOLD);
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        // Run once on mount: a reload partway down the page should already
        // show the bar rather than waiting for the first scroll event.
        update();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    const close = () => setIsOpen(false);

    // "home = send to top of page" — from the homepage itself, scroll rather
    // than navigate so it doesn't flash a reload.
    const goHome = (e: React.MouseEvent) => {
        if (window.location.pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        close();
    };

    return (
        <>
            <header
                className={[
                    styles.header,
                    isOpen ? styles.headerOpen : "",
                    isScrolled ? styles.headerScrolled : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                <Link href="/" onClick={goHome} className={styles.markLink} aria-label="Flintwell — home">
                    <FlintwellMark className={styles.mark} />
                </Link>

                <button
                    type="button"
                    onClick={() => setIsOpen((open) => !open)}
                    className={styles.menuButton}
                    aria-expanded={isOpen}
                    aria-controls="menu-overlay"
                >
                    menu
                </button>
            </header>

            <div
                id="menu-overlay"
                className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
                inert={!isOpen}
            >
                <nav className={styles.nav}>
                    <Link href="/" onClick={goHome} className={styles.navItem}>
                        home
                    </Link>
                    <Link href="/projects" onClick={close} className={styles.navItem}>
                        work
                    </Link>
                    <Link href="/contact" onClick={close} className={styles.navItem}>
                        contact
                    </Link>
                </nav>

                <div className={styles.details}>
                    <a href={`mailto:${email}`} className={styles.detailLink}>
                        {email}
                    </a>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className={styles.detailLink}>
                        {phone}
                    </a>

                    <address className={styles.address}>
                        {addressLines.map((line) => (
                            <span key={line} className={styles.addressLine}>
                                {line}
                            </span>
                        ))}
                    </address>
                </div>

                <p className={styles.slogan}>{slogan}</p>
            </div>
        </>
    );
}
