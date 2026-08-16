"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import FlintwellMark from "./FlintwellMark";
import type { SiteDetails } from "@/sanity/contentTypes";

/**
 * Fixed chrome present on every screen of the mockups: the "f." mark top
 * left, the "menu" control top right, and the full-screen terracotta
 * overlay it opens.
 *
 * Header and overlay share one component because the "menu" control sits
 * *above* the overlay and inverts with it.
 */
export type MenuDetails = Pick<
    SiteDetails,
    "email" | "phone" | "addressLines" | "menuSlogan"
>;

/**
 * How far down the page the bar appears. Small, so it settles in as soon as
 * the hero starts moving rather than waiting for a section boundary.
 */
const BAR_THRESHOLD = 24;

export default function Header({ details }: { details?: MenuDetails | null }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const email = details?.email || "info@flintwell.com";
    const phone = details?.phone || "07891 818682";
    const addressLines = details?.addressLines?.length
        ? details.addressLines
        : ["Flintwell Developments Ltd", "12a Marlborough Place", "Brighton BN1 1WN"];
    const slogan = details?.menuSlogan || "the most complicated thing is simplicity";

    // Lock the page behind the overlay, allow Escape to dismiss it, and keep
    // focus inside it while it is open.
    //
    // The overlay is `inert` when closed, so the page behind it is reachable
    // and the overlay is not. Open, that reverses — but only for the overlay:
    // the page content underneath stayed focusable, so tabbing past the last
    // nav link walked into links that are covered by the terracotta panel and
    // invisible. And closing while focus sat inside the overlay applied
    // `inert` to the focused element's ancestor, dropping focus to <body> so
    // the next Tab restarted from the top of the document.
    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        // Captured now rather than read in cleanup. The button is never
        // unmounted so the node is the same either way, but reading a ref
        // during cleanup is the pattern that bites when that stops being true.
        const opener = menuButtonRef.current;

        // Everything that isn't the header or the overlay gets hidden from
        // both the tab order and assistive tech for as long as the overlay is
        // up. Collected from the live DOM rather than hard-coded, so it keeps
        // working if the page structure changes.
        //
        // The header has to be excluded explicitly. It is a *sibling* of the
        // overlay, not an ancestor, so a "does it contain the overlay?" test
        // does not spare it — and marking it inert disables the close button
        // and the home mark, which sit above the overlay by design. Escape
        // still worked (a window listener, which inert does not affect), so
        // this is easy to miss unless you actually click close.
        const keep = [overlayRef.current, headerRef.current];
        const siblings = Array.from(document.body.children).filter(
            (el) =>
                !keep.some((k) => k && (el === k || el.contains(k)))
        ) as HTMLElement[];
        const previouslyInert = siblings.map((el) => el.inert);
        siblings.forEach((el) => {
            el.inert = true;
        });

        // Move focus into the overlay so a keyboard user lands on the nav
        // rather than staying on a button that is now behind a panel.
        overlayRef.current?.querySelector<HTMLElement>("a")?.focus();

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            siblings.forEach((el, i) => {
                el.inert = previouslyInert[i] ?? false;
            });
            window.removeEventListener("keydown", onKeyDown);
            // Hand focus back to the control that opened it.
            opener?.focus();
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
                ref={headerRef}
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

                {/* The label swaps with the state. It read "menu" in both,
                    which left sighted users with no close affordance at all:
                    the overlay covers the viewport, there is no X, and the
                    only exits were Escape or guessing that the unchanged word
                    now closed it. */}
                <button
                    ref={menuButtonRef}
                    type="button"
                    onClick={() => setIsOpen((open) => !open)}
                    className={styles.menuButton}
                    aria-expanded={isOpen}
                    aria-controls="menu-overlay"
                >
                    {isOpen ? "close" : "menu"}
                </button>
            </header>

            <div
                ref={overlayRef}
                id="menu-overlay"
                className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
                inert={!isOpen}
            >
                <nav className={styles.nav} aria-label="Main">
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
