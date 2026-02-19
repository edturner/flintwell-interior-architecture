import { defineField, defineType } from 'sanity'

export const contact = defineType({
    name: 'contact',
    title: 'Contact',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            initialValue: "LET'S TALK",
        }),
        defineField({
            name: 'toolsText',
            title: 'Tools Side Text',
            type: 'string',
            initialValue: '[ TOOLS OF THE TRADE ]',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
            initialValue: '[ SEND INQUIRY ]',
        }),
        defineField({
            name: 'brochure',
            title: 'Brochure PDF',
            type: 'file',
            options: {
                accept: '.pdf'
            }
        }),
    ],
})
