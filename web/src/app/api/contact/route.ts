import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, number, location, message, brochureUrl } = await request.json();

        // 1. Send notification to Flintwell
        await resend.emails.send({
            from: 'Flintwell Website <onboarding@resend.dev>', // Update this with your verified domain
            to: 'inquiry@flintwell.com',
            subject: `New Inquiry from ${name}`,
            html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${number}</p>
        <p><strong>Location/Project:</strong> ${location}</p>
        <p><strong>Message:</strong></p>
        <p>${message || 'No message provided'}</p>
      `,
        });

        // 2. Send auto-reply with brochure to the user
        const attachments = [];

        if (brochureUrl) {
            // Fetch the brochure content
            try {
                const response = await fetch(brochureUrl);
                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                attachments.push({
                    filename: 'Flintwell_Brochure.pdf',
                    content: buffer,
                });
            } catch (error) {
                console.error('Error fetching brochure:', error);
                // Continue sending email even if brochure fails to attach
            }
        }

        await resend.emails.send({
            from: 'Flintwell <onboarding@resend.dev>', // Update this
            to: email,
            subject: 'Thank you for contacting Flintwell',
            html: `
        <h1>Thank you for your inquiry</h1>
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>
        <p>Please find our brochure attached.</p>
        <br>
        <p>Best regards,</p>
        <p>The Flintwell Team</p>
      `,
            attachments: attachments,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
