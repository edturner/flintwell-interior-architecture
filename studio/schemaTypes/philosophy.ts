import { defineField, defineType } from 'sanity'

/**
 * The "about us + what we do" section.
 *
 * Previously this drove a two-block Vision/Approach layout. Ian's mockups
 * condense that into a single section, and the slogan has moved to the
 * menu overlay (see the `footer` / Site Details document). The old
 * philosophyVision* / philosophyApproach* field values still exist on the
 * document in Sanity and can be copied across.
 */
export const philosophy = defineType({
    name: 'philosophy',
    title: 'About',
    type: 'document',
    fields: [
        defineField({
            name: 'title', // Internal title for the document
            title: 'Internal Title',
            type: 'string',
            initialValue: 'About Section',
            hidden: true,
        }),
        defineField({
            name: 'aboutHeading',
            title: 'Section Heading',
            type: 'string',
            initialValue: 'about us + what we do',
        }),
        defineField({
            name: 'aboutText',
            title: 'Body Copy',
            type: 'text',
            rows: 10,
            description: 'Separate paragraphs with a blank line.',
            initialValue:
                'We are continually building relationships with great people in the industry who, like us, love what they do. Passion, pride, and attention to detail are what we look for.\n\nArchitecturally led interior design, project management and procurement are amongst the services we offer, often acting as the centre point that brings it all together.',
        }),
        defineField({
            name: 'aboutImage',
            title: 'Image',
            type: 'imageWithAlt',
        }),
    ],
})
