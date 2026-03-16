import { defineMiddleware } from 'astro:middleware';
import { SESSION_COOKIE_NAME, verifySessionCookie, parseCookieValue } from './lib/session';

export const onRequest = defineMiddleware(async ({ request, locals, url, redirect }, next) => {
  const cookieHeader = request.headers.get('cookie');
  const sessionValue = parseCookieValue(cookieHeader, SESSION_COOKIE_NAME);

  locals.sessionPhone = sessionValue ? verifySessionCookie(sessionValue) : null;

  // Route guard: /checkout and /track require authentication
  if (url.pathname === '/checkout' && !locals.sessionPhone) {
    return redirect('/auth?redirect=/checkout', 302);
  }

  if (url.pathname === '/track' && !locals.sessionPhone) {
    return redirect('/auth?redirect=/track', 302);
  }

  if (url.pathname === '/history' && !locals.sessionPhone) {
    return redirect('/auth?redirect=/history', 302);
  }

  return next();
});
