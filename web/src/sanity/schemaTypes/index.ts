import { type SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { home } from './home'
import { service } from './service'
import { contact } from './contact'
import { footer } from './footer'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [project, home, service, contact, footer],
}
