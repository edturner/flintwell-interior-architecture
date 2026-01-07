import { defineField, defineType } from 'sanity'

export const philosophy = defineType({
    name: 'philosophy',
    title: 'Philosophy',
    type: 'document',
    fields: [
        defineField({
            name: 'title', // Internal title for the document
            title: 'Internal Title',
            type: 'string',
            initialValue: 'Philosophy Section',
            hidden: true
        }),
        defineField({
            name: 'philosophySlogan',
            title: 'Slogan',
            type: 'string',
            initialValue: 'The most complicated thing is simplicity'
        }),
        defineField({
            name: 'philosophyVisionTitle',
            title: 'Vision Title',
            type: 'string',
            initialValue: 'Our Vision'
        }),
        defineField({
            name: 'philosophyVisionText',
            title: 'Vision Text',
            type: 'text',
            rows: 4,
            initialValue: 'We are driven by a creative design vision, with a clear objective: to achieve exceptional ergonomic and aesthetic outcomes for every project. Working closely with architects, investors, and developers, we deliver refined and enduring standards of living.'
        }),
        defineField({
            name: 'philosophyVisionImage',
            title: 'Vision Image',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'philosophyApproachTitle',
            title: 'Approach Title',
            type: 'string',
            initialValue: 'Our Approach'
        }),
        defineField({
            name: 'philosophyApproachText',
            title: 'Approach Text',
            type: 'text',
            rows: 6,
            initialValue: 'Exceptional service is at the core of our practice. Over the years, we have developed a structured and considered process that brings all disciplines together, ensuring each trade is aligned with the overall design intent.\n\nWith a meticulous eye for detail and a depth of industry knowledge, we simplify decision-making and ensure nothing is overlooked. We understand that in construction, timing and sequence are critical — and that precision at every stage is essential to achieving the best possible outcome.'
        }),
        defineField({
            name: 'philosophyApproachImage',
            title: 'Approach Image',
            type: 'image',
            options: { hotspot: true }
        }),
    ],
})
