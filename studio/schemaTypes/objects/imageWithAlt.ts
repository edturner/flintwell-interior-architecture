import { defineField, defineType } from 'sanity'

/**
 * Every image on the site goes through this type so alt text is part of
 * publishing rather than an afterthought.
 *
 * The site is almost entirely photography, so a missing alt leaves a
 * screen-reader user with nothing where the content is. `alt` is required
 * as an error, not a warning — a published image without it is a real
 * accessibility gap, and Sanity is the only place it can be written.
 *
 * `decorative` is the escape hatch: tick it for images that carry no
 * information the surrounding copy doesn't already give, and the site
 * renders `alt=""` so assistive tech skips them.
 */
export const imageWithAlt = defineType({
    name: 'imageWithAlt',
    title: 'Image',
    type: 'image',
    options: { hotspot: true },
    fields: [
        defineField({
            name: 'alt',
            title: 'Alt text',
            type: 'string',
            description:
                'What the image shows, for screen readers and image search. Describe the room, the detail, the material — not "photo of a kitchen".',
            validation: (Rule) =>
                Rule.custom((alt, context) => {
                    const parent = context.parent as { decorative?: boolean } | undefined
                    if (parent?.decorative) return true
                    return alt ? true : 'Add alt text, or tick "Decorative" if the image carries no information.'
                }),
        }),
        defineField({
            name: 'decorative',
            title: 'Decorative',
            type: 'boolean',
            description: 'Tick if this image adds no information beyond the surrounding copy.',
            initialValue: false,
        }),
    ],
})
