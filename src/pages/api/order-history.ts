export const prerender = false;

import type { APIRoute } from 'astro';
import { getAllOrders } from '../../lib/orderStore';

export const GET: APIRoute = async ({ locals }) => {
  const phone = locals.sessionPhone;
  if (!phone) {
    return new Response(JSON.stringify({ orders: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const orders = getAllOrders(phone);

  return new Response(JSON.stringify({ orders }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
