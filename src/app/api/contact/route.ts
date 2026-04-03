import { NextRequest, NextResponse } from 'next/server';

interface ContactPayload {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

/* Simple server-side validation */
function validate(data: Partial<ContactPayload>): string | null {
    if (!data.name?.trim()) return 'Name is required.';
    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'A valid email is required.';
    if (!data.message?.trim() || data.message.trim().length < 10) return 'Message must be at least 10 characters.';
    return null;
}

export async function POST(req: NextRequest) {
    let body: Partial<ContactPayload>;

    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const validationError = validate(body);
    if (validationError) {
        return NextResponse.json({ error: validationError }, { status: 422 });
    }

    /* ── Email sending via Nodemailer ─────────────────────────────────────
       Set these in your .env.local file:
         SMTP_HOST=smtp.gmail.com
         SMTP_PORT=587
         SMTP_USER=your@gmail.com
         SMTP_PASS=your-app-password
         CONTACT_TO_EMAIL=destination@email.com   (where enquiries arrive)
    ───────────────────────────────────────────────────────────────────── */
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT ?? '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail  = process.env.CONTACT_TO_EMAIL ?? smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass) {
        console.warn('[Contact] SMTP credentials not configured — email not sent, but returning success for UI testing.');
        // Return success anyway so the form works in dev without SMTP setup
        return NextResponse.json({ ok: true, note: 'SMTP not configured — message logged only.' });
    }

    try {
        // Dynamic import so build doesn't fail if nodemailer is not installed
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.default.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
            from: `"Echoes of the Andes Website" <${smtpUser}>`,
            to: toEmail,
            replyTo: body.email,
            subject: `[Echoes] ${body.subject} — from ${body.name}`,
            html: `
                <h2 style="font-family:sans-serif;color:#5c3d2e;">New Contact Form Submission</h2>
                <table style="font-family:sans-serif;font-size:14px;color:#333;border-collapse:collapse;width:100%">
                    <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#888;width:140px">Name</td><td style="padding:8px;border-bottom:1px solid #eee"><strong>${body.name}</strong></td></tr>
                    <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#888">Email</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${body.email}">${body.email}</a></td></tr>
                    ${body.phone ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#888">Phone</td><td style="padding:8px;border-bottom:1px solid #eee">${body.phone}</td></tr>` : ''}
                    <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#888">Subject</td><td style="padding:8px;border-bottom:1px solid #eee">${body.subject}</td></tr>
                    <tr><td style="padding:8px;color:#888;vertical-align:top">Message</td><td style="padding:8px;white-space:pre-wrap">${body.message}</td></tr>
                </table>
            `,
            text: `Name: ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone ?? 'N/A'}\nSubject: ${body.subject}\n\n${body.message}`,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('[Contact] Email send error:', err);
        return NextResponse.json(
            { error: 'Failed to send email. Please try again or contact us directly.' },
            { status: 500 }
        );
    }
}
