import { defineField, defineType } from 'sanity'

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
                'Lower numbers come first, on the homepage and on /projects. Leave blank and the project falls to the end.',
            validation: (Rule) => Rule.integer().min(0),
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'imageWithAlt',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'imageWithAlt' }],
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
})
