import { defineField, defineType } from 'sanity'

/**
 * Site details — used by both the closing footer and the terracotta
 * menu overlay.
 */
export const footer = defineType({
    name: 'footer',
    title: 'Site Details',
    type: 'document',
    groups: [
        { name: 'footer', title: 'Footer' },
        { name: 'menu', title: 'Menu Overlay' },
    ],
    fields: [
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            initialValue: 'LONDON, UK',
            group: 'footer',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            initialValue: 'info@flintwell.com',
            group: 'footer',
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
            initialValue: '07891 818682',
            group: 'footer',
        }),
        defineField({
            name: 'instagramUrl',
            title: 'Instagram URL',
            type: 'url',
            initialValue: 'https://www.instagram.com/flintwell_/#',
            group: 'footer',
        }),
        defineField({
            name: 'copyrightText',
            title: 'Copyright Text',
            type: 'string',
            initialValue: 'All rights reserved',
            group: 'footer',
        }),
        defineField({
            name: 'addressLines',
            title: 'Registered Address',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'One line per entry. Shown in the menu overlay.',
            initialValue: [
                'Flintwell Developments Ltd',
                '12a Marlborough Place',
                'Brighton BN1 1WN',
            ],
            group: 'menu',
        }),
        defineField({
            name: 'menuSlogan',
            title: 'Menu Slogan',
            type: 'text',
            rows: 2,
            description: 'The serif line in the bottom left of the menu overlay.',
            initialValue: 'the most complicated thing is simplicity',
            group: 'menu',
        }),
    ],
})
