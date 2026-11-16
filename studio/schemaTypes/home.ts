import { defineField, defineType } from 'sanity'

/**
 * One field, because one field is what the homepage reads.
 *
 * This document used to carry `title`, `subtitle`, `description` and
 * `heroImage` as well. `HOME_QUERY` asks for `statement` and nothing else, so
 * the other four were editable, saveable, publishable and inert — and three
 * of them held live values (" F L I N T W E L L" and two single spaces) that
 * made them look load-bearing. A field that accepts an edit and changes
 * nothing teaches an editor that the CMS cannot be trusted, which is the
 * expensive kind of untidiness.
 *
 * Removing a field from the schema does not delete what is stored on the
 * document, so the old values are still in the dataset if they are ever
 * wanted.
 *
 * `heroImage` is the one with a real future: the hero photograph is currently
 * the local `web/public/hero-desk.jpeg`, because the Sanity field holds a
 * leftover logo PNG ("F logo") that rendered full-bleed where the photograph
 * belongs. Giving Ian control of it is three steps, in this order — clear the
 * stale asset in the Studio, re-add the field here, then restore the
 * one-line binding marked in `web/src/components/Hero.tsx`. Re-adding the
 * field first would publish the logo to the homepage.
 */
export const home = defineType({
    name: 'home',
    title: 'Homepage',
    type: 'document',
    fields: [
        defineField({
            name: 'statement',
            title: 'Hero statement',
            type: 'string',
            description:
                'The large serif line at the very top of the homepage. Leave blank and the site falls back to "We build relationships and design around people".',
            initialValue: 'We build relationships and design around people',
        }),
    ],
})
