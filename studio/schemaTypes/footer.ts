import { defineField, defineType } from 'sanity'

/**
 * Site details — used by the closing footer, the terracotta menu overlay,
 * the contact section's direct email and phone, and (via `email`) the
 * address every enquiry from the form is delivered to.
 *
 * A `location` field used to sit at the top of this document holding
 * "SUSSEX, UK". Nothing queried it and nothing rendered it, so it had been
 * edited — London to Sussex — in the expectation that it appeared somewhere.
 * Removed rather than wired up: the footer's three columns are full, and the
 * menu overlay already carries the registered address.
 */
export const footer = defineType({
    name: 'footer',
    title: 'Site details',
    type: 'document',
    groups: [
        { name: 'footer', title: 'Footer' },
        { name: 'menu', title: 'Menu Overlay' },
    ],
    fields: [
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            description:
                'Shown in the footer and the menu, and this is where every enquiry from the contact form is sent. Change it here and the form follows.',
            initialValue: 'info@flintwell.com',
            group: 'footer',
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
            description: 'Shown in the footer and the menu, as a tap-to-call link on a phone.',
            initialValue: '07891 818682',
            group: 'footer',
        }),
        defineField({
            name: 'instagramUrl',
            title: 'Instagram URL',
            type: 'url',
            description: 'The full address, starting with https://',
            initialValue: 'https://www.instagram.com/flintwell_/',
            group: 'footer',
        }),
        defineField({
            name: 'copyrightText',
            title: 'Copyright name',
            type: 'string',
            description:
                'The legal entity, not the trading name. The year is added automatically, so write "Flintwell Developments Ltd", not "© 2026 Flintwell Developments Ltd".',
            initialValue: 'Flintwell Developments Ltd',
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
