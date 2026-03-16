export const prerender = false;

import type { APIRoute } from 'astro';
import { saveOrder } from '../../lib/orderStore';

export const POST: APIRoute = async ({ locals, request }) => {
  const phone = locals.sessionPhone;
  if (!phone) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { items, total } = body;

    if (!Array.isArray(items) || typeof total !== 'number') {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const order = saveOrder(phone, items, total);

    return new Response(JSON.stringify({ order }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
