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
 * Their stored values have been unset from the document as well. Dropping a
 * field from the schema does not remove what is stored under it, and the
 * Studio then shows the leftover as a yellow "Unknown field found" panel with
 * a "Developer info" disclosure — which is exactly the sort of thing Ian
 * should never be shown. Removing a field is therefore two jobs: take it out
 * here, and unset the value on every document that carries it.
 *
 * `heroImage` is the one with a real future: the hero photograph is currently
 * the local `web/public/hero-desk.jpeg`, because the Sanity field used to
 * hold a leftover logo PNG ("F logo") that rendered full-bleed where the
 * photograph belongs. That asset reference is now unset, so giving Ian
 * control of it is two steps: re-add the field here, then restore the
 * one-line binding marked in `web/src/components/Hero.tsx`.
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
