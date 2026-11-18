import { project } from './project'
import { home } from './home'
import { contact } from './contact'
import { footer } from './footer'
import { testimonial } from './testimonial'
import { philosophy } from './philosophy'
import { imageWithAlt } from './objects/imageWithAlt'

/**
 * A `service` type used to be registered here, carrying the Services /
 * "THE PROCESS" section and its pricing. That section came off the site at
 * the client's request, and the type was kept so any existing documents
 * stayed reachable in the Studio — but the production dataset holds none, so
 * it was an empty collection in Ian's sidebar advertising a feature the site
 * does not have. Removed.
 */
export const schemaTypes = [
    // Objects first — documents reference them by name.
    imageWithAlt,
    project,
    home,
    contact,
    footer,
    testimonial,
    philosophy,
]
