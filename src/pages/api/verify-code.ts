export const prerender = false;

import type { APIRoute } from 'astro';
import twilio from 'twilio';
import { createSessionCookie } from '../../lib/session';

export const POST: APIRoute = async ({ request }) => {
  const { phone, code } = await request.json();

  if (!phone || !code) {
    return new Response(JSON.stringify({ error: 'Phone and code are required' }), {
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
    const check = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phone, code });

    if (check.status === 'approved') {
      const setCookie = createSessionCookie(phone);
      return new Response(JSON.stringify({ success: true, status: 'approved' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': setCookie,
        },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid code', status: check.status }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Verification failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
