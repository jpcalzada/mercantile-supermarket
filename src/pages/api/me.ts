export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const phone = locals.sessionPhone;
  return new Response(JSON.stringify({ phone: phone || null }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
