import crypto from 'node:crypto';

export const SESSION_COOKIE_NAME = 'mercantile_session';
const MAX_AGE = 86400; // 24 hours

function getSecret(): string {
  const secret = import.meta.env.SESSION_SECRET || process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET env var is required');
  return secret;
}

function sign(payload: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

export function createSessionCookie(phone: string): string {
  const secret = getSecret();
  const payload = JSON.stringify({ phone, exp: Date.now() + MAX_AGE * 1000 });
  const encoded = Buffer.from(payload).toString('base64url');
  const signature = sign(encoded, secret);
  const value = `${encoded}.${signature}`;
  const secure = import.meta.env.PROD ? '; Secure' : '';
  return `${SESSION_COOKIE_NAME}=${value}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${MAX_AGE}${secure}`;
}

export function verifySessionCookie(cookieValue: string): string | null {
  try {
    const secret = getSecret();
    const [encoded, signature] = cookieValue.split('.');
    if (!encoded || !signature) return null;

    const expected = sign(encoded, secret);
    if (signature !== expected) return null;

    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf-8'));
    if (payload.exp < Date.now()) return null;

    return payload.phone || null;
  } catch {
    return null;
  }
}

export function parseCookieValue(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? match[1] : null;
}
