import { defineField, defineType } from 'sanity'

export const home = defineType({
    name: 'home',
    title: 'Home',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'services',
            title: 'Services',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'service' } }],
        }),

        // Philosophy Section - MOVED TO SEPARATE SCHEMA
    ],
})
