// src/app/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { AUTH_CONFIG } from '@/lib/constants/auth';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? AUTH_CONFIG.DEFAULT_REDIRECT;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Upsert profile for OAuth users
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await supabase.from('profiles').upsert({
          id: user.id,
          email: user.email!,
          full_name: user.user_metadata?.full_name ?? null,
          avatar_url: user.user_metadata?.avatar_url ?? null,
        });
      }

      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';

      const response = NextResponse.redirect(
        forwardedHost
          ? `https://${forwardedHost}${next}`
          : `${origin}${next}`
      );

      // Set 1-day session marker
      response.cookies.set(
        AUTH_CONFIG.SESSION_STARTED_AT_COOKIE,
        Date.now().toString(),
        {
          path: '/',
          maxAge: AUTH_CONFIG.SESSION_MAX_AGE,
          sameSite: 'lax',
          secure: !isLocalEnv,
        }
      );

      return response;
    }
  }

  // Return user to login with error
  return NextResponse.redirect(
    `${origin}${AUTH_CONFIG.LOGIN_ROUTE}?error=auth_failed`
  );
}
