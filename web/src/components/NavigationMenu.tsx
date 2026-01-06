"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./NavigationMenu.module.css";

export default function NavigationMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <button onClick={toggleMenu} className={styles.menuButton}>
                {isOpen ? "[ CLOSE ]" : "[ MENU ]"}
            </button>

            {isOpen && (
                <div className={styles.overlay}>
                    <nav className={styles.nav}>
                        <ul className={styles.navList}>
                            <li className={styles.navItem}>
                                <Link href="/" onClick={toggleMenu}>HOME</Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link href="#services" onClick={toggleMenu}>SERVICES</Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link href="#projects" onClick={toggleMenu}>SELECTED WORKS</Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link href="#contact" onClick={toggleMenu}>LET'S TALK</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </>
    );
}
