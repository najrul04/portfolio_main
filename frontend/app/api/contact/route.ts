import { NextResponse } from 'next/server';

// WHY: the contact form sends through this server-side route instead of a
// client-side service (EmailJS) — the API key stays out of the browser and
// there is no OAuth grant that Google can expire (which is how the old
// EmailJS/Gmail integration silently died).

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

// WHY: until najrul.com is verified in Resend, the from-address MUST be
// onboarding@resend.dev and Resend only delivers to the account owner's email.
const FROM = process.env.CONTACT_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>';
// WHY: must match the Resend account owner's email until najrul.com is
// verified in Resend — unverified accounts can only deliver to themselves.
const TO = process.env.CONTACT_TO_EMAIL ?? 'nazrul2517@gmail.com';

interface ContactBody {
   name: string;
   email: string;
   message: string;
   company?: string; // honeypot — humans never see this field
}

const isContactBody = (value: unknown): value is ContactBody => {
   if (typeof value !== 'object' || value === null) return false;
   const v = value as Record<string, unknown>;
   return (
      typeof v.name === 'string' &&
      typeof v.email === 'string' &&
      typeof v.message === 'string' &&
      (v.company === undefined || typeof v.company === 'string')
   );
};

export async function POST(request: Request) {
   const apiKey = process.env.RESEND_API_KEY;
   if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 });
   }

   let body: unknown;
   try {
      body = await request.json();
   } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
   }

   if (!isContactBody(body)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
   }

   const name = body.name.trim().slice(0, 200);
   const email = body.email.trim().slice(0, 200);
   const message = body.message.trim().slice(0, 5000);

   if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
   }

   // WHY: honeypot — bots fill every field; a filled "company" means spam.
   // Return success so the bot thinks it worked and moves on.
   if (body.company) {
      return NextResponse.json({ ok: true });
   }

   const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
         Authorization: `Bearer ${apiKey}`,
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         from: FROM,
         to: [TO],
         reply_to: email,
         subject: `Portfolio contact from ${name}`,
         // WHY: plain text, not HTML — visitor input goes straight into the
         // email, so no markup means no injection surface.
         text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
   });

   if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error(`Resend error ${res.status}: ${detail}`);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 502 });
   }

   return NextResponse.json({ ok: true });
}
