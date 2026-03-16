export const prerender = false;

import type { APIRoute } from 'astro';
import { getLatestOrder } from '../../lib/orderStore';

export const GET: APIRoute = async ({ locals }) => {
  const phone = locals.sessionPhone;
  if (!phone) {
    return new Response(JSON.stringify({ order: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const order = getLatestOrder(phone);

  return new Response(JSON.stringify({ order: order || null }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
