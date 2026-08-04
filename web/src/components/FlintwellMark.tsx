/**
 * The hand-drawn "f." monogram.
 *
 * Traced from the studio's own artwork (the 1455x1081 PNG currently sitting
 * in Sanity as the home hero image), normalised to a 100x100 box. If Ian
 * ever supplies a proper vector original, swap the paths — the component
 * API does not need to change.
 *
 * Strokes inherit `currentColor` so the mark can recolour inside the
 * terracotta menu overlay without a second asset.
 */
export default function FlintwellMark({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Flintwell"
        >
            {/* Stem: hooks in at the top, then falls away almost straight */}
            <path
                d="M37.9 1.6C35.3 4.6 32.8 9.4 31.8 17L12.5 98.9"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
            />
            {/* Crossbar: long, barely bowed, lifting to the right */}
            <path
                d="M1.6 29.5C30 25.5 70 20 98.9 16.6"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
            />
            {/* Weighted pen-down blobs where each stroke starts */}
            <circle cx="37.6" cy="2.5" r="2.9" fill="currentColor" />
            <circle cx="2.2" cy="29.4" r="2.9" fill="currentColor" />
            {/* The full stop */}
            <circle cx="54.3" cy="59.3" r="2.5" fill="currentColor" />
        </svg>
    );
}
