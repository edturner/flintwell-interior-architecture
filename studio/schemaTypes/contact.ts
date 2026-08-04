import { defineField, defineType } from 'sanity'

export const contact = defineType({
    name: 'contact',
    title: 'Contact',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Heading',
            type: 'string',
            initialValue: 'lets chat',
        }),
        defineField({
            name: 'intro',
            title: 'Intro Copy',
            type: 'text',
            rows: 5,
            description: 'Separate paragraphs with a blank line.',
            initialValue:
                'The starting point is never fixed, we find that almost all of our work starts with a friendly conversation!\n\nthe door is always open…',
        }),
        defineField({
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
            initialValue: 'send',
        }),
        defineField({
            name: 'brochure',
            title: 'Brochure PDF',
            type: 'file',
            options: {
                accept: '.pdf'
            }
        }),
        // ── Email Template Fields ──
        defineField({
            name: 'autoReplySubject',
            title: 'Auto-Reply Subject Line',
            type: 'string',
            initialValue: 'Inquiry Received // Flintwell Interior Architecture',
            group: 'emailTemplate',
        }),
        defineField({
            name: 'autoReplyGreeting',
            title: 'Auto-Reply Greeting',
            type: 'text',
            description: 'The opening paragraph after "Dear {name},". Use {location} to insert the client\'s project location.',
            initialValue: 'Thank you for reaching out to Flintwell. We have received your project details for {location}.',
            group: 'emailTemplate',
        }),
        defineField({
            name: 'autoReplyBody',
            title: 'Auto-Reply Body',
            type: 'text',
            description: 'The main body paragraph of the auto-reply email.',
            initialValue: 'Our approach centers on "Technical Luxury"—ensuring that every architectural plan translates seamlessly into a finished reality. Ian is currently reviewing your inquiry and the specific requirements of your build.',
            group: 'emailTemplate',
        }),
        defineField({
            name: 'autoReplyClosing',
            title: 'Auto-Reply Closing',
            type: 'text',
            description: 'The closing paragraph before the sign-off. Use {responseTime} to insert the response time.',
            initialValue: 'You can expect a direct response within {responseTime} to discuss the next phase of your project. In the meantime, please find our Studio Profile & Process Brochure attached.',
            group: 'emailTemplate',
        }),
        defineField({
            name: 'autoReplyResponseTime',
            title: 'Response Time',
            type: 'string',
            description: 'e.g. "48 hours", "2 business days"',
            initialValue: '48 hours',
            group: 'emailTemplate',
        }),
        defineField({
            name: 'autoReplySignOffName',
            title: 'Sign-Off Name',
            type: 'string',
            initialValue: 'The Studio',
            group: 'emailTemplate',
        }),
        defineField({
            name: 'autoReplySignOffCompany',
            title: 'Sign-Off Company',
            type: 'string',
            initialValue: 'Flintwell Interior Architecture',
            group: 'emailTemplate',
        }),
    ],
    groups: [
        {
            name: 'emailTemplate',
            title: 'Email Template',
        },
    ],
})
