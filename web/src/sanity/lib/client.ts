import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    /**
     * `false` on purpose. Every route uses ISR (`export const revalidate`),
     * and the Sanity CDN caches its own responses for up to ~60s — so with
     * `useCdn: true` the two caches stack and a regeneration can pick up
     * content that is already stale. The symptom is the confusing one: Ian
     * edits in the Studio, refreshes, sees nothing, and edits again.
     *
     * The cost is small because ISR means this fetch runs once per
     * revalidation window rather than once per visitor.
     */
    useCdn: false,
})
