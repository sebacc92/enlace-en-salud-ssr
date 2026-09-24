import type { RequestEventBase, RequestEventCommon } from "@builder.io/qwik-city";

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

const encoder = new TextEncoder();

function toBase64Url(bytes: ArrayBuffer): string {
  let str = "";
  for (const b of new Uint8Array(bytes)) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");
  const str = atob(padded);
  const arr = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) arr[i] = str.charCodeAt(i);
  return arr;
}

function getHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

/** Constant-time string comparison, used for the username/password check. */
export function timingSafeEqual(a: string, b: string): boolean {
  const bytesA = encoder.encode(a);
  const bytesB = encoder.encode(b);
  if (bytesA.length !== bytesB.length) return false;
  let diff = 0;
  for (let i = 0; i < bytesA.length; i++) diff |= bytesA[i] ^ bytesB[i];
  return diff === 0;
}

export async function createSessionToken(secret: string): Promise<string> {
  const payload = String(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  const key = await getHmacKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${toBase64Url(signature)}`;
}

export async function verifySessionToken(token: string, secret: string): Promise<boolean> {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expires = Number(payload);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  const key = await getHmacKey(secret);
  try {
    return await crypto.subtle.verify("HMAC", key, fromBase64Url(signature), encoder.encode(payload));
  } catch {
    return false;
  }
}

export async function hasValidAdminSession(requestEvent: RequestEventBase): Promise<boolean> {
  const secret = requestEvent.env.get("ADMIN_SESSION_SECRET");
  const cookieValue = requestEvent.cookie.get(SESSION_COOKIE)?.value;
  if (!secret || !cookieValue) return false;
  return verifySessionToken(cookieValue, secret);
}

/** Redirects to the login page when the current request has no valid admin session. */
export async function requireAdminSession(requestEvent: RequestEventCommon): Promise<void> {
  if (!(await hasValidAdminSession(requestEvent))) {
    throw requestEvent.redirect(302, "/admin/login");
  }
}

export function setAdminSessionCookie(requestEvent: RequestEventBase, token: string): void {
  requestEvent.cookie.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export function clearAdminSessionCookie(requestEvent: RequestEventBase): void {
  requestEvent.cookie.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/admin",
    maxAge: 0,
  });
}
