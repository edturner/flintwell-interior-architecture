import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

/**
 * Sanity webhook target: pushes an edit through immediately instead of
 * waiting for the ISR window.
 *
 * This is what lets `revalidate` sit at an hour rather than 30 seconds. The
 * old setup regenerated every page every 30s forever — burning ISR
 * regenerations continuously — and *still* made Ian wait after an edit,
 * because the Sanity CDN held its own cache on top.
 *
 * Setup (once, in the Sanity management console → API → Webhooks):
 *   URL:      https://flintwell.com/api/revalidate
 *   Dataset:  production
 *   Trigger:  Create, Update, Delete
 *   Filter:   _type in ["project", "home", "philosophy", "contact", "footer", "testimonial"]
 *   Secret:   the same value as SANITY_REVALIDATE_SECRET in Vercel
 *
 * The signature check is not optional. An unauthenticated revalidation
 * endpoint is a free way for anyone to force-regenerate every page on the
 * site as fast as they can send requests.
 */

type WebhookBody = {
    _type: string;
    slug?: { current?: string };
};

export async function POST(request: NextRequest) {
    try {
        const secret = process.env.SANITY_REVALIDATE_SECRET;
        if (!secret) {
            console.error('SANITY_REVALIDATE_SECRET is not set — refusing to revalidate');
            return NextResponse.json(
                { error: 'Revalidation is not configured' },
                { status: 500 }
            );
        }

        const { isValidSignature, body } = await parseBody<WebhookBody>(request, secret);

        if (!isValidSignature) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        if (!body?._type) {
            return NextResponse.json({ error: 'Missing document type' }, { status: 400 });
        }

        // Site Details and the contact document feed the layout and every
        // page's chrome, so those regenerate the whole tree. A project only
        // needs its own page plus the two listings it appears in.
        if (body._type === 'project') {
            revalidatePath('/');
            revalidatePath('/projects');
            if (body.slug?.current) {
                revalidatePath(`/projects/${body.slug.current}`);
            }
            revalidatePath('/sitemap.xml');
        } else {
            revalidatePath('/', 'layout');
        }

        return NextResponse.json({ revalidated: true, type: body._type });
    } catch (error) {
        console.error('Revalidation webhook error:', error);
        return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
    }
}
