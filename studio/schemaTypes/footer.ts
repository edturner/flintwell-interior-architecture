import { defineField, defineType } from 'sanity'

export const footer = defineType({
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            initialValue: 'LONDON, UK',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            initialValue: 'INFO@FLINTWELL.COM',
        }),
        defineField({
            name: 'instagramUrl',
            title: 'Instagram URL',
            type: 'url',
            initialValue: 'https://www.instagram.com/flintwell_/#',
        }),
        defineField({
            name: 'copyrightText',
            title: 'Copyright Text',
            type: 'string',
            initialValue: 'FLINTWELL INTERIOR ARCHITECTURE',
        }),
    ],
})
