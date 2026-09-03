// src/middleware.ts
import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { AUTH_CONFIG } from '@/lib/constants/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route is protected
  const isProtectedRoute = AUTH_CONFIG.PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Refresh the session
  const { supabaseResponse, user } = await updateSession(request);

  // Check 1-day session expiry via cookie
  const sessionStartedAt = request.cookies.get(
    AUTH_CONFIG.SESSION_STARTED_AT_COOKIE
  );
  let sessionValid = false;

  if (sessionStartedAt) {
    const startedAt = parseInt(sessionStartedAt.value, 10);
    if (!isNaN(startedAt)) {
      const ageMs = Date.now() - startedAt;
      const maxAgeMs = AUTH_CONFIG.SESSION_MAX_AGE * 1000;
      sessionValid = ageMs < maxAgeMs;
    }
  }

  // Heal missing session marker for an otherwise valid Supabase session.
  // This covers users who signed in before the marker cookie was introduced
  // (or whose marker was lost), so they aren't locked out of protected routes.
  if (user && !sessionValid && !request.cookies.get(AUTH_CONFIG.SESSION_STARTED_AT_COOKIE)) {
    supabaseResponse.cookies.set(
      AUTH_CONFIG.SESSION_STARTED_AT_COOKIE,
      Date.now().toString(),
      {
        path: '/',
        maxAge: AUTH_CONFIG.SESSION_MAX_AGE,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      }
    );
    sessionValid = true;
  }

  // If on protected route and no valid session, redirect to login
  if (isProtectedRoute && (!user || !sessionValid)) {
    const loginUrl = new URL(AUTH_CONFIG.LOGIN_ROUTE, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    loginUrl.searchParams.set(
      'error',
      !sessionValid && user ? 'session_expired' : ''
    );
    const response = NextResponse.redirect(loginUrl);

    // Clear expired session cookie
    if (!sessionValid && user) {
      response.cookies.set(AUTH_CONFIG.SESSION_STARTED_AT_COOKIE, '', {
        maxAge: 0,
        path: '/',
      });
    }

    return response;
  }

  // If authenticated user tries to access login/register, redirect to account
  if (
    user &&
    sessionValid &&
    (pathname === AUTH_CONFIG.LOGIN_ROUTE ||
      pathname === AUTH_CONFIG.REGISTER_ROUTE)
  ) {
    return NextResponse.redirect(
      new URL(AUTH_CONFIG.DEFAULT_REDIRECT, request.url)
    );
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
