export const prerender = false;

import type { APIRoute } from 'astro';
import { SESSION_COOKIE_NAME } from '../../lib/session';

export const POST: APIRoute = async () => {
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `${SESSION_COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`,
    },
  });
};
