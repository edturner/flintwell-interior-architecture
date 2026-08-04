import { defineField, defineType } from 'sanity'

export const project = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
        },
    },
    groups: [
        {
            name: 'comparison',
            title: 'Comparison Slider',
        }
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
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
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
        }),
        defineField({
            name: 'sliderPlan',
            title: 'Slider Plan (CAD)',
            type: 'image',
            options: { hotspot: true },
            group: 'comparison',
        }),
        defineField({
            name: 'sliderReality',
            title: 'Slider Reality (Photo)',
            type: 'image',
            options: { hotspot: true },
            group: 'comparison',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
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
            of: [{ type: 'image' }],
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
})
