import createImageUrlBuilder from '@sanity/image-url'
import { type SanityImageSource } from '@sanity/image-url/lib/types/types';

import { dataset, projectId } from '../env'
import type { SanityImage } from '../contentTypes'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
}

/**
 * A source URL for a fixed-aspect box, cropped by Sanity rather than by CSS.
 *
 * This is what makes the hotspot mean something. Every image type in the
 * Studio sets `hotspot: true`, but the site used to crop with
 * `object-fit: cover` on a CSS-imposed aspect ratio — which always crops from
 * the centre, so dragging the hotspot in the Studio changed nothing. Asking
 * Sanity for the crop honours it, and `object-fit: cover` downstream becomes
 * a no-op safety net instead of the thing making the decision.
 *
 * `auto('format')` serves AVIF/WebP where the browser accepts it.
 */
export function croppedUrl(
    source: SanityImageSource,
    width: number,
    aspect: number,
) {
    return urlFor(source)
        .width(width)
        .height(Math.round(width / aspect))
        .fit('crop')
        .auto('format')
        .url()
}

/**
 * Alt text for an image, honouring the Studio's `decorative` flag.
 *
 * Returns `""` for decorative images so assistive tech skips them, which is
 * correct and is *not* the same as omitting alt. `fallback` covers documents
 * published before the alt field existed.
 */
export function altText(image: SanityImage | null | undefined, fallback = ''): string {
    if (!image || image.decorative) return ''
    return image.alt || fallback
}
