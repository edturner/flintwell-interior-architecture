import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { client } from '@/sanity/lib/client';
import { EMAIL_TEMPLATE_QUERY } from '@/sanity/lib/queries';

const DESTINATION_EMAIL = 'inquiry@flintwell.com';

const FROM_EMAIL = 'Flintwell <inquiry@flintwell.com>';

// ── Default fallback values (used if Sanity fields are empty) ──
const DEFAULTS = {
    autoReplySubject: 'Inquiry Received // Flintwell Interior Architecture',
    autoReplyGreeting: 'Thank you for reaching out to Flintwell. We have received your project details for {location}.',
    autoReplyBody: 'Our approach centers on "Technical Luxury"—ensuring that every architectural plan translates seamlessly into a finished reality. Ian is currently reviewing your inquiry and the specific requirements of your build.',
    autoReplyClosing: 'You can expect a direct response within {responseTime} to discuss the next phase of your project. In the meantime, please find our Studio Profile & Process Brochure attached.',
    autoReplyResponseTime: '48 hours',
    autoReplySignOffName: 'The Studio',
    autoReplySignOffCompany: 'Flintwell Interior Architecture',
};

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

        const { name, email, number, location, message } = await request.json();

        console.log('Received contact submission:', { name, email });

        // ── Fetch email template + brochure URL from Sanity ──
        const template = await client.fetch(EMAIL_TEMPLATE_QUERY);
        console.log('Fetched email template from Sanity:', template ? 'OK' : 'NULL');

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

        // 1. Send notification to Flintwell (or Dev)
        const { error: notificationError } = await resend.emails.send({
            from: FROM_EMAIL,
            to: DESTINATION_EMAIL,
            replyTo: email, // CRITICAL: Allows Ian to hit 'reply' and email the client directly
            subject: `New Inquiry: ${name} - ${location}`,
            html: `
                <div style="font-family: monospace; padding: 20px;">
                    <h2 style="font-family: serif; border-bottom: 1px solid #000; padding-bottom: 10px;">New Project Inquiry</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${number}</p>
                    <p><strong>Location/Project:</strong> ${location}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #f4f4f4; padding: 15px; border-left: 3px solid #000;">
                        <p>${message || 'No additional message provided.'}</p>
                    </div>
                </div>
            `,
        });

        if (notificationError) {
            console.error('Failed to send notification to studio:', notificationError);
            return NextResponse.json({ error: 'Failed to notify studio' }, { status: 500 });
        }

        // 2. Prepare the Brochure Attachment
        const attachments: { filename: string; content: string }[] = [];
        if (brochureUrl) {
            console.log('Fetching brochure from URL:', brochureUrl);
            try {
                const response = await fetch(brochureUrl);
                if (!response.ok) {
                    console.error(`Brochure fetch failed with status ${response.status}: ${response.statusText}`);
                } else {
                    const arrayBuffer = await response.arrayBuffer();
                    const base64Content = Buffer.from(arrayBuffer).toString('base64');
                    console.log(`Brochure fetched successfully. Size: ${arrayBuffer.byteLength} bytes`);

                    attachments.push({
                        filename: 'Flintwell_Process_Brochure.pdf',
                        content: base64Content,
                    });
                }
            } catch (error) {
                console.error('Error fetching brochure:', error);
            }
        } else {
            console.log('No brochureUrl found in Sanity — skipping PDF attachment');
        }

        // 3. Send Auto-Reply to the Client (content from Sanity)
        const { error: autoReplyError } = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: subject,
            html: `
                <div style="font-family: sans-serif; color: #333; max-width: 600px; line-height: 1.6;">
                    <h2 style="font-family: serif; font-weight: normal;">Inquiry Received</h2>
                    <p>Dear ${name},</p>
                    <p>${greeting}</p>
                    <p>${body}</p>
                    <p>${closing}</p>
                    <br>
                    <p>Best regards,</p>
                    <p><strong>${signOffName}</strong><br>
                    ${signOffCompany}</p>
                </div>
            `,
            attachments: attachments,
        });

        if (autoReplyError) {
            console.error('Failed to send auto-reply to client:', autoReplyError);
            // We still return success because the studio received the lead
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Contact form server error:', error);
        return NextResponse.json(
            { error: 'Internal server error processing the form' },
            { status: 500 }
        );
    }
}