import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { client } from '@/sanity/lib/client';
import { EMAIL_TEMPLATE_QUERY, SITE_DETAILS_QUERY } from '@/sanity/lib/queries';
import type { EmailTemplate, SiteDetails } from '@/sanity/contentTypes';

/** Fallback only. The live address comes from Site Details in the Studio, so
 *  changing it there actually reroutes leads. */
const FALLBACK_DESTINATION = 'inquiry@flintwell.com';

/** Not editable from the Studio, and must not be: it has to match a domain
 *  verified in Resend, and a wrong value fails silently at send time. */
const FROM_EMAIL = 'Flintwell <inquiry@flintwell.com>';

// ── Default fallback values (used if Sanity fields are empty) ──
const DEFAULTS = {
    autoReplySubject: 'Inquiry Received // Flintwell Interior Architecture',
    autoReplyGreeting: 'Thank you for reaching out to Flintwell. We have received your project details for {location}.',
    autoReplyBody: 'Our approach centers on "Technical Luxury"—ensuring that every architectural plan translates seamlessly into a finished reality. Ian is currently reviewing your inquiry and the specific requirements of your build.',
    autoReplyClosing: 'You can expect a direct response within {responseTime} to discuss the next phase of your project.',
    autoReplyResponseTime: '48 hours',
    autoReplySignOffName: 'The Studio',
    autoReplySignOffCompany: 'Flintwell Interior Architecture',
};

/**
 * Escapes text before it is interpolated into email HTML.
 *
 * Without this, anything submitted through the form lands unescaped inside a
 * document Ian opens in his mail client — so a submission containing an
 * anchor tag produces a Flintwell-branded email with a working
 * attacker-controlled link. That is a phishing vector aimed at the client,
 * and because it is not browser XSS it does not show up in a web security
 * scan.
 */
function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/** Strips CR/LF so a submitted value can't inject structure into a subject line. */
function singleLine(value: string) {
    return value.replace(/[\r\n]+/g, ' ').trim();
}

/**
 * Deliberately permissive — this rejects obvious junk and typos, not exotic
 * but valid addresses. The real proof that an address exists is that the
 * auto-reply arrives.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Trimmed non-empty string within `max`, or null. */
function text(value: unknown, max: number): string | null {
    if (typeof value !== 'string') return null;
    const trimmed = value.trim();
    if (!trimmed || trimmed.length > max) return null;
    return trimmed;
}

export async function POST(request: Request) {
    try {
        // Constructed per request rather than at module scope. `new Resend()`
        // throws when the key is missing, and at module scope that throw
        // happens while Next collects page data during `next build` — so the
        // whole site failed to build on any machine without the key, even
        // though nothing was sending mail.
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error('RESEND_API_KEY is not set — cannot send contact emails');
            return NextResponse.json(
                { error: 'Email service is not configured' },
                { status: 500 }
            );
        }
        const resend = new Resend(apiKey);

        const raw: unknown = await request.json().catch(() => null);
        if (!raw || typeof raw !== 'object') {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }
        const payload = raw as Record<string, unknown>;

        // Honeypot. A real person never sees this field, so anything in it is
        // a bot. Answer 200 rather than 400 — a bot that learns it was
        // rejected adapts, one that thinks it succeeded does not.
        //
        // NOTE: this is the only abuse control here. There is still no
        // per-IP rate limit, so a determined caller can drive the endpoint as
        // fast as it will go. Adding one needs a shared store (@upstash/
        // ratelimit + Vercel KV, ~3 lines here plus provisioning) and was
        // deliberately left out of this pass.
        if (text(payload.company, 200)) {
            console.warn('Contact submission rejected: honeypot filled');
            return NextResponse.json({ success: true });
        }

        // Everything below this line used to be trusted verbatim. A POST of
        // `{}` produced a studio email full of "undefined" and an auto-reply
        // addressed to `undefined`; the form's `required` attributes were the
        // only validation on the whole path, and any client that is not the
        // form skips them.
        const name = text(payload.name, 100);
        const email = text(payload.email, 254);
        const number = text(payload.number, 40);
        const location = text(payload.location, 200);
        const message =
            typeof payload.message === 'string' ? payload.message.trim().slice(0, 5000) : '';

        if (!name || !email || !number || !location || !EMAIL_PATTERN.test(email)) {
            return NextResponse.json(
                { error: 'Please check the form and try again.' },
                { status: 400 }
            );
        }

        // No PII in the logs. Names and email addresses used to be written to
        // Vercel's log store on every submission, with no stated purpose or
        // retention — personal data under UK GDPR for no diagnostic benefit.
        console.log('Contact submission received');

        const [template, siteDetails] = await Promise.all([
            client.fetch<EmailTemplate | null>(EMAIL_TEMPLATE_QUERY),
            client.fetch<SiteDetails | null>(SITE_DETAILS_QUERY),
        ]);

        const destination = siteDetails?.email?.trim() || FALLBACK_DESTINATION;

        const subject = template?.autoReplySubject || DEFAULTS.autoReplySubject;
        const greeting = (template?.autoReplyGreeting || DEFAULTS.autoReplyGreeting)
            .replace(/{location}/g, location);
        const body = template?.autoReplyBody || DEFAULTS.autoReplyBody;
        const responseTime = template?.autoReplyResponseTime || DEFAULTS.autoReplyResponseTime;
        const closing = (template?.autoReplyClosing || DEFAULTS.autoReplyClosing)
            .replace(/{responseTime}/g, responseTime);
        const signOffName = template?.autoReplySignOffName || DEFAULTS.autoReplySignOffName;
        const signOffCompany = template?.autoReplySignOffCompany || DEFAULTS.autoReplySignOffCompany;
        const brochureUrl = template?.brochureUrl;

        // 1. Send notification to Flintwell
        const { error: notificationError } = await resend.emails.send({
            from: FROM_EMAIL,
            to: destination,
            replyTo: email, // CRITICAL: Allows Ian to hit 'reply' and email the client directly
            subject: `New Inquiry: ${singleLine(name)} - ${singleLine(location)}`,
            html: `
                <div style="font-family: monospace; padding: 20px;">
                    <h2 style="font-family: serif; border-bottom: 1px solid #000; padding-bottom: 10px;">New Project Inquiry</h2>
                    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                    <p><strong>Phone:</strong> ${escapeHtml(number)}</p>
                    <p><strong>Location/Project:</strong> ${escapeHtml(location)}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #f4f4f4; padding: 15px; border-left: 3px solid #000;">
                        <p>${message ? escapeHtml(message).replace(/\n/g, '<br>') : 'No additional message provided.'}</p>
                    </div>
                </div>
            `,
        });

        if (notificationError) {
            console.error('Failed to send notification to studio:', notificationError);
            return NextResponse.json({ error: 'Failed to notify studio' }, { status: 500 });
        }

        // 2. Send Auto-Reply to the Client (content from Sanity)
        //
        // The brochure is linked rather than attached. Attaching meant
        // re-fetching the PDF from Sanity and base64-encoding it on every
        // single submission — latency the visitor waits through, and the
        // amplification factor that made this endpoint worth abusing. A link
        // is also more deliverable: attachments push messages toward spam
        // filters and Resend caps total message size.
        const brochureLine = brochureUrl
            ? `<p><a href="${escapeHtml(brochureUrl)}" style="color: #9c4a22;">Download our Studio Profile &amp; Process Brochure</a></p>`
            : '';

        const { error: autoReplyError } = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: singleLine(subject),
            html: `
                <div style="font-family: sans-serif; color: #333; max-width: 600px; line-height: 1.6;">
                    <h2 style="font-family: serif; font-weight: normal;">Inquiry Received</h2>
                    <p>Dear ${escapeHtml(name)},</p>
                    <p>${escapeHtml(greeting)}</p>
                    <p>${escapeHtml(body)}</p>
                    <p>${escapeHtml(closing)}</p>
                    ${brochureLine}
                    <br>
                    <p>Best regards,</p>
                    <p><strong>${escapeHtml(signOffName)}</strong><br>
                    ${escapeHtml(signOffCompany)}</p>
                </div>
            `,
        });

        if (autoReplyError) {
            console.error('Failed to send auto-reply to client:', autoReplyError);
            // The studio has the lead either way, so this is still a success
            // for the visitor's purposes — but say so honestly rather than
            // letting the UI claim a confirmation email was sent.
        }

        return NextResponse.json({
            success: true,
            autoReplySent: !autoReplyError,
        });

    } catch (error) {
        console.error('Contact form server error:', error);
        return NextResponse.json(
            { error: 'Internal server error processing the form' },
            { status: 500 }
        );
    }
}
