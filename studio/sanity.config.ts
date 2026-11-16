import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure, SINGLETON_TYPES} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Flintwell',

  projectId: 'vcnt7muc',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    /**
     * Keeps the four one-off documents out of the global "create new" menu.
     * The sidebar no longer offers a way to duplicate them (see
     * `structure.ts`), but the menu behind the pencil icon reaches every
     * registered type and would put the duplicate back.
     */
    newDocumentOptions: (prev) =>
      prev.filter((template) => !SINGLETON_TYPES.has(template.templateId)),

    /**
     * And removes the actions that would break them from the inside.
     *
     * `duplicate` creates the second copy the structure is designed to
     * prevent; `delete` and `unpublish` take the homepage's or the footer's
     * content off the site with no obvious way back. None of the three is
     * ever the right thing to do to a one-off document, so they are not
     * offered. Projects and testimonials keep the full set — those are
     * genuinely Ian's to add and remove.
     */
    actions: (prev, {schemaType}) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(
            ({action}) => !action || !['duplicate', 'delete', 'unpublish'].includes(action),
          )
        : prev,
  },
})
