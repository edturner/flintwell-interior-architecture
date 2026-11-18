import type { StructureResolver } from 'sanity/structure'

/**
 * The Studio sidebar Ian actually sees.
 *
 * Without this, `structureTool()` lists every registered document type as a
 * collection with a "+" on it — including the four that the site reads as
 * `*[_type == "..."][0]`. A second "Home" or "Site Details" document is
 * therefore not just untidy, it is silently destructive: GROQ picks one of
 * the two with no defined order, so Ian edits a document, publishes it,
 * reloads the site and sees nothing change. That failure mode is impossible
 * to diagnose from the editor's side, which makes it the single worst thing
 * to leave in a studio handed to a non-technical client.
 *
 * So the four one-off documents are mounted as documents, not lists. There is
 * no "+", no second copy to create, and no list to get lost in — clicking
 * "Homepage" opens the homepage.
 */

/**
 * The live document IDs, pinned.
 *
 * Deliberately the existing UUIDs rather than tidy slugs like `home`.
 * `S.document().documentId(...)` opens *that* id and creates it if absent, so
 * a tidier id would have opened four blank documents next to Ian's real
 * content, which still holds every word on the site. Renaming them properly
 * means create-then-delete against the live dataset; not worth the risk for
 * cosmetics in a file no editor reads.
 */
const SINGLETON_IDS = {
    home: 'b40b1396-b0d3-403b-a7b1-98d11497beb2',
    philosophy: '52c37d11-9471-43ab-9e59-d2d011fe44e1',
    contact: 'd30bbf0a-706f-457a-a1d6-1b6bc4732704',
    footer: '813c64d3-2187-4ae9-b8fd-c08e20ccc9ab',
} as const

/** Mounted as single documents; kept out of the "create new" menu. */
export const SINGLETON_TYPES = new Set(Object.keys(SINGLETON_IDS))

export const structure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            // The two things Ian adds to, in the order he thinks about them.
            // Both default to `displayOrder` so the list he edits in matches
            // the order the site renders — sorting by "last edited" (the
            // Studio default) meant the list and the site disagreed, and the
            // display-order field looked broken as a result.
            S.documentTypeListItem('project')
                .title('Projects')
                .child(
                    S.documentTypeList('project')
                        .title('Projects')
                        .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }]),
                ),

            S.documentTypeListItem('testimonial')
                .title('Testimonials')
                .child(
                    S.documentTypeList('testimonial')
                        .title('Testimonials')
                        .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }]),
                ),

            S.divider(),

            // The one-off pages. One document each, opened directly.
            S.listItem()
                .title('Homepage')
                .id('home')
                .child(
                    S.document()
                        .schemaType('home')
                        .documentId(SINGLETON_IDS.home)
                        .title('Homepage'),
                ),

            S.listItem()
                .title('About section')
                .id('philosophy')
                .child(
                    S.document()
                        .schemaType('philosophy')
                        .documentId(SINGLETON_IDS.philosophy)
                        .title('About section'),
                ),

            S.listItem()
                .title('Contact + enquiry email')
                .id('contact')
                .child(
                    S.document()
                        .schemaType('contact')
                        .documentId(SINGLETON_IDS.contact)
                        .title('Contact + enquiry email'),
                ),

            S.listItem()
                .title('Site details')
                .id('footer')
                .child(
                    S.document()
                        .schemaType('footer')
                        .documentId(SINGLETON_IDS.footer)
                        .title('Site details'),
                ),
        ])
