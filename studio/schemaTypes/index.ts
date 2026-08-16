import { project } from './project'
import { home } from './home'
import { service } from './service'
import { contact } from './contact'
import { footer } from './footer'
import { testimonial } from './testimonial'
import { philosophy } from './philosophy'
import { imageWithAlt } from './objects/imageWithAlt'

export const schemaTypes = [
    // Objects first — documents reference them by name.
    imageWithAlt,
    project,
    home,
    service,
    contact,
    footer,
    testimonial,
    philosophy,
]
