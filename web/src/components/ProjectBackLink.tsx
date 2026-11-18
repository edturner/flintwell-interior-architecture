"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ORIGINS, DEFAULT_ORIGIN } from "@/lib/projectOrigins";

/**
 * Where a project page sends you back to, decided by the `from` the card
 * carried in. Client-side on purpose: reading searchParams on the server
 * would opt these pages out of static rendering, and the value only affects
 * one link. `useSearchParams` needs a Suspense boundary above it — the page
 * supplies one whose fallback is this same link at its default.
 *
 * The origin table itself lives in `@/lib/projectOrigins` so the server page
 * can read it for that fallback; see the note there.
 */
export default function ProjectBackLink({ className }: { className?: string }) {
    const from = useSearchParams().get("from");
    const target = from === "home" ? ORIGINS.home : DEFAULT_ORIGIN;

    return (
        <Link href={target.href} className={className}>
            {target.label}
        </Link>
    );
}
