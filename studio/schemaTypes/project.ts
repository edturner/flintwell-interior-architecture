import { defineField, defineType } from 'sanity'

/**
 * Field descriptions here are the documentation Ian actually reads — they sit
 * next to the box at the moment he is filling it in, which no handover
 * document can compete with. Each one says where the value appears on the
 * site, because every field on this document surfaces in a different place
 * and at a different crop.
 */
export const project = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    preview: {
        select: {
            title: 'title',
            subtitle: 'projectNumber',
            media: 'mainImage',
        },
        prepare({ title, subtitle, media }) {
            return {
                title: title || 'Untitled project',
                subtitle: subtitle ? `project${subtitle}` : undefined,
                media,
            }
        },
    },
    // Lowest number first. The site orders on this, so the studio decides
    // which six projects represent it on the homepage rather than upload
    // date deciding by accident.
    orderings: [
        {
            title: 'Display order',
            name: 'displayOrderAsc',
            by: [{ field: 'displayOrder', direction: 'asc' }],
        },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'The project name, as it appears under the photo and at the top of its page.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'projectNumber',
            title: 'Project Number',
            type: 'string',
            description:
                'The studio job number, digits only — e.g. "23". Shown in the selected work grid as "PROJECT23 | Dingle". Leave blank to show the name alone.',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description:
                'The project\'s web address — "the-long-barn" becomes flintwell.com/projects/the-long-barn. Press Generate to take it from the title. Once the project has been shared or linked anywhere, leave it alone: changing it breaks every existing link to the page.',
            options: {
                source: 'title',
                maxLength: 96,
            },
            // Without a slug the project has no URL: it renders a card that
            // links to /projects/null. Required rather than optional.
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            description:
                'Lower numbers come first, on the homepage and on the work page. 1 leads. The homepage shows the first six. Leave blank and the project falls to the end.',
            validation: (Rule) => Rule.integer().min(0),
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
            description:
                'One line — "A Victorian semi opened up to the garden". Not shown on the page itself: it is the description that appears in Google results and when the project is shared on WhatsApp or Instagram, so it is worth writing.',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'imageWithAlt',
            description:
                'The lead photograph: the card in the work grid and the wide banner at the top of the project page. It is cropped to both of those shapes automatically — click the crop icon and drag the circle onto whatever must stay in frame.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'string',
            description: 'Shown beside the project copy, e.g. "2025".',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            description: 'Town or area, shown beside the project copy — e.g. "Sussex". Not the full address.',
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'imageWithAlt' }],
            description:
                'The photographs below the project copy, two per row. Drag to reorder. Every one needs alt text.',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
            description:
                'The project copy. Press Enter for a new paragraph. Plain paragraphs read best here — the headings and lists in the toolbar are styled for the page but rarely suit it.',
        }),
    ],
})
