// src/lib/auth/session.ts
import { cookies } from 'next/headers';
import { AUTH_CONFIG } from '@/lib/constants/auth';
import { createClient } from '@/lib/supabase/server';

/**
 * Marks the session start time in a cookie using the request cookie store.
 * This is the correct way to set cookies inside Server Actions before a
 * redirect() — building a NextResponse here is discarded by redirect().
 */
export async function setSessionStartCookieStore() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_CONFIG.SESSION_STARTED_AT_COOKIE, Date.now().toString(), {
    maxAge: AUTH_CONFIG.SESSION_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}

/**
 * Checks if the current session has exceeded the 1-day maximum age.
 * Returns true if the session is still valid, false if it should be invalidated.
 */
export async function isSessionValid(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionStartedAt = cookieStore.get(
    AUTH_CONFIG.SESSION_STARTED_AT_COOKIE
  );

  // No session marker = no active session
  if (!sessionStartedAt) {
    return false;
  }

  const startedAt = parseInt(sessionStartedAt.value, 10);
  if (isNaN(startedAt)) {
    return false;
  }

  const now = Date.now();
  const maxAgeMs = AUTH_CONFIG.SESSION_MAX_AGE * 1000;

  // Session is valid if it started less than 1 day ago
  return now - startedAt < maxAgeMs;
}

/**
 * Marks the session start time in a cookie.
 * Called on successful login/signup.
 */
export function setSessionStartCookie(response: Response) {
  const now = Date.now().toString();
  const cookieHeader = `${AUTH_CONFIG.SESSION_STARTED_AT_COOKIE}=${now}; Path=/; Max-Age=${AUTH_CONFIG.SESSION_MAX_AGE}; SameSite=Lax${
    process.env.NODE_ENV === 'production' ? '; Secure' : ''
  }`;

  const existing = response.headers.get('Set-Cookie');
  if (existing) {
    response.headers.append('Set-Cookie', cookieHeader);
  } else {
    response.headers.set('Set-Cookie', cookieHeader);
  }
}

/**
 * Clears the session start cookie.
 * Called on logout or when session expires.
 */
export function clearSessionStartCookie(response: Response) {
  const cookieHeader = `${AUTH_CONFIG.SESSION_STARTED_AT_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
  response.headers.append('Set-Cookie', cookieHeader);
}

/**
 * Gets the current authenticated user, enforcing 1-day session limit.
 * Returns null if no valid session exists.
 */
export async function getCurrentUser() {
  const isValid = await isSessionValid();
  if (!isValid) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

/**
 * Gets the current user's profile data.
 */
export async function getCurrentUserProfile() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile;
}
