import Image from "next/image";

/**
 * The hand-drawn "f." monogram — Ian's own artwork.
 *
 * The file he supplied (public/flintwell-mark.svg, kept verbatim as the
 * source) is not vector: it is a 638px raster plus a luminance mask wrapped
 * in an SVG shell. public/flintwell-mark.png is that mask composed against
 * the ink colour, cropped to the artwork and re-centred, which is what
 * renders here.
 *
 * Note this no longer inherits `currentColor` the way the earlier traced
 * paths did. Nothing currently needs it to — the header pins the mark to
 * --foreground on both white and terracotta, as drawn. If it ever has to
 * recolour, either use the PNG as a CSS mask-image with
 * `background-color: currentColor`, or swap in true vector artwork once Ian
 * outlines the mark the way he did the wordmark.
 */
export default function FlintwellMark({ className }: { className?: string }) {
    return (
        <Image
            className={className}
            src="/flintwell-mark.png"
            alt="Flintwell"
            width={512}
            height={512}
            priority
        />
    );
}
