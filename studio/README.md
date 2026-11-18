# Flintwell — Sanity Studio

The content editor behind [`../web`](../web). Sanity v5, project `vcnt7muc`,
dataset `production`.

**Writing a guide for the client? There is one:
[`../SANITY-GUIDE.md`](../SANITY-GUIDE.md).** This file is for whoever
maintains the schema.

## Run and deploy

```bash
npm install
npm run dev          # http://localhost:3333
npm run deploy       # publishes to the hosted Studio
npm run typegen      # regenerates ../web/src/sanity/types.ts — see below
```

There is one dataset. The Studio always edits live production content, in
development as much as anywhere else.

## Run typegen after every schema change

`npm run typegen` extracts `schema.json`, then generates
`../web/src/sanity/types.ts` from it *and* from the GROQ queries in
`../web/src/sanity/lib/queries.ts`. The site's types are projection-accurate
as a result: `ProjectSummary` has exactly the five fields the grid query asks
for, so adding a field to a component forces you to add it to the query too.

Skip it and the web build typechecks against a stale schema — which is worse
than a type error, because it passes.

## Singletons

Four documents are one-of-a-kind: `home`, `philosophy` (About), `contact` and
`footer` (Site details). The site reads each as `*[_type == "..."][0]`.

That projection is why the guards in `structure.ts` and `sanity.config.ts`
matter rather than being tidiness. A second copy of one of these documents is
silently destructive: GROQ picks one of the two with no defined order, so an
editor can change a document, publish it, reload the site and see nothing
happen — a failure that is impossible to diagnose from the editor's side.

So three things hold the line, and all three are needed:

1. `structure.ts` mounts them as **documents, not lists** — no "+" to press.
2. `newDocumentOptions` keeps them out of the global "create new" menu, which
   reaches every registered type regardless of the sidebar.
3. `document.actions` removes `duplicate`, `delete` and `unpublish` from them.

The document IDs in `structure.ts` are the existing UUIDs, pinned, and the
comment there explains why they are not tidy slugs: `documentId()` creates the
id it is given if it is absent, so a tidier id would have opened four blank
documents next to the real content.

**Adding a new singleton:** give it a fixed id, add it to `SINGLETON_IDS` in
`structure.ts`, mount it with `S.document()`, and add a `revalidatePath` case
or confirm the `else` branch in `web/src/app/api/revalidate/route.ts` covers
it. Also add its `_type` to the webhook filter — see the web README.

## Schema notes

- **Every image is `imageWithAlt`**, never a bare `image`. Alt text is
  validated as an error, not a warning, with a `decorative` tick as the
  escape hatch. The site is almost entirely photography, so a missing alt
  leaves a screen-reader user with nothing where the content is, and the
  Studio is the only place it can be written.
- **Field descriptions are the real documentation.** They sit next to the box
  at the moment the client is filling it in, which no handover document
  competes with. If you add a field, say in its description where it appears
  on the site.
- **`displayOrder` on `project` and `testimonial`** is how the studio chooses
  which six projects lead the homepage and which quote the carousel opens on.
  The structure file sets both lists to sort by it, so the list the client
  edits in matches the order the site renders.
- **Don't add a field the site does not read.** A field that accepts an edit
  and changes nothing teaches the client that the CMS cannot be trusted. Four
  such fields were removed at handover (`home.title`, `home.subtitle`,
  `home.description`, `footer.location`), along with the unused `service` type.
- **Removing a field is two jobs, not one.** Taking it out of the schema does
  not remove what is stored under it, and the Studio then renders the
  leftover as a yellow "Unknown field found" panel, complete with a
  "Developer info" disclosure and a "Remove field" button, on a document the
  client opens. So unset the value on every affected document too:

  ```bash
  # read a document in full and compare its keys against the schema
  npx sanity documents query '*[_id == "<id>"][0]'
  ```

  The unset itself goes through the mutation API — the CLI has no `unset`
  command. Take a `sanity dataset export` first and keep it somewhere durable:
  that export is the thing you can actually restore from, so don't rely on
  being able to recover the value any other way.

  This was done at handover for all five leftovers from the removals above.

## Backups

`sanity dataset export production` writes a point-in-time dump. Those belong
in backup storage, not the repo — `backup-*.tar.gz` is gitignored for that
reason. Worth taking one before any schema change that removes a field.
