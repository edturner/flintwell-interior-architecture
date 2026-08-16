"use client";

import { useEffect, useRef, useState } from "react";

interface RevealGridProps {
    className?: string;
    children: React.ReactNode;
}

/**
 * Wraps the work grid and drives its entrance through a `data-reveal`
 * attribute the stylesheet keys off.
 *
 * The three states matter: it renders `idle`, which is the plain visible
 * grid, and only arms itself once this effect runs. A failed or blocked
 * script therefore leaves the work on screen rather than hiding it.
 *
 * Arming and revealing have to land in separate frames, or the browser
 * coalesces them into one style change and no transition runs — which is
 * exactly what happens on /projects, where the grid is already in view on
 * first paint.
 */
export default function RevealGrid({ className, children }: RevealGridProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<"idle" | "armed" | "in">("idle");

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        setState("armed");

        let observer: IntersectionObserver | null = null;
        const frame = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                observer = new IntersectionObserver(
                    (entries) => {
                        if (entries.some((entry) => entry.isIntersecting)) {
                            setState("in");
                            observer?.disconnect();
                        }
                    },
                    // Holds off until the grid is properly on screen rather
                    // than firing on the first pixel of it.
                    { rootMargin: "0px 0px -12% 0px" }
                );
                observer.observe(el);
            });
        });

        return () => {
            cancelAnimationFrame(frame);
            observer?.disconnect();
        };
    }, []);

    return (
        <div ref={ref} className={className} data-reveal={state}>
            {children}
        </div>
    );
}
