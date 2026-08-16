"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * Where a project page sends you back to, decided by the `from` the card
 * carried in. Client-side on purpose: reading searchParams on the server
 * would opt these pages out of static rendering, and the value only affects
 * one link. `useSearchParams` needs a Suspense boundary above it — the page
 * supplies one whose fallback is this same link at its default.
 */
const ORIGINS = {
    home: { href: "/", label: "back to home" },
    work: { href: "/projects", label: "back to work" },
} as const;

/** Deep links, shares and search hits have no origin — the listing is the
 *  honest parent to offer them. */
export const DEFAULT_ORIGIN = ORIGINS.work;

export default function ProjectBackLink({ className }: { className?: string }) {
    const from = useSearchParams().get("from");
    const target = from === "home" ? ORIGINS.home : DEFAULT_ORIGIN;

    return (
        <Link href={target.href} className={className}>
            {target.label}
        </Link>
    );
}
