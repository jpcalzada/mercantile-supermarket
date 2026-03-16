export const prerender = false;

import type { APIRoute } from 'astro';
import twilio from 'twilio';

export const POST: APIRoute = async ({ request }) => {
  const { phone } = await request.json();

  if (!phone || typeof phone !== 'string') {
    return new Response(JSON.stringify({ error: 'Phone number is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const accountSid = import.meta.env.TWILIO_ACCOUNT_SID;
  const authToken = import.meta.env.TWILIO_AUTH_TOKEN;
  const verifySid = import.meta.env.TWILIO_VERIFY_SERVICE_SID;

  if (!accountSid || !authToken || !verifySid) {
    return new Response(JSON.stringify({ error: 'Twilio not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const client = twilio(accountSid, authToken);
    await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: phone, channel: 'sms' });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Failed to send code' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
