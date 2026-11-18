"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./error.module.css";

/**
 * Every route on this site awaits a Sanity fetch before it can render, and
 * /projects/[slug] does it on the live request path rather than at build
 * time. Without this boundary a network blip or a malformed document served
 * Next's default error page — a stack-trace-shaped box sitting above the
 * Flintwell footer, since the root layout still renders around it.
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Route error:", error);
    }, [error]);

    return (
        <main className={styles.main}>
            <div className={styles.block}>
                <h1 className={styles.title}>Something went wrong</h1>

                <p className={styles.copy}>
                    This page didn&rsquo;t load. It&rsquo;s usually temporary — try
                    again, and if it keeps happening do get in touch.
                </p>

                <div className={styles.actions}>
                    <button type="button" onClick={reset} className={styles.action}>
                        try again
                    </button>
                    <Link href="/" className={styles.action}>
                        back to home
                    </Link>
                </div>

                {/* The digest is the only handle on a production error — it's
                    what ties this page to a line in the Vercel logs. */}
                {error.digest && (
                    <p className={styles.digest}>reference {error.digest}</p>
                )}
            </div>
        </main>
    );
}
