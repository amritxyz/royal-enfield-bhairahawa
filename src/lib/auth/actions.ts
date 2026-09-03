// src/lib/auth/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { AUTH_CONFIG, AUTH_ERRORS } from '@/lib/constants/auth';
import { setSessionStartCookie, clearSessionStartCookie } from './session';

type AuthState = {
  success: boolean;
  error?: string;
  field?: string;
};

/**
 * Email/password sign in
 */
export async function signInWithEmail(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Validation
  if (!email || !password) {
    return { success: false, error: AUTH_ERRORS.INVALID_CREDENTIALS };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    return {
      success: false,
      error:
        error.message === 'Invalid login credentials'
          ? AUTH_ERRORS.INVALID_CREDENTIALS
          : error.message,
    };
  }

  // Set the 1-day session marker
  const response = NextResponse.redirect(
    new URL(AUTH_CONFIG.DEFAULT_REDIRECT, process.env.NEXT_PUBLIC_APP_URL)
  );
  setSessionStartCookie(response);

  revalidatePath('/', 'layout');
  redirect(AUTH_CONFIG.DEFAULT_REDIRECT);
}

/**
 * Email/password sign up — instant auth (no email confirmation)
 */
export async function signUpWithEmail(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;
  const phone = formData.get('phone') as string;

  // Validation
  if (!email || !password || !fullName) {
    return {
      success: false,
      error: 'Please fill in all required fields',
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      error: AUTH_ERRORS.WEAK_PASSWORD,
      field: 'password',
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone || null,
      },
      // Redirect after signup (used if email confirmation is ever re-enabled)
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}${AUTH_CONFIG.CALLBACK_ROUTE}`,
    },
  });

  if (error) {
    if (error.message.includes('already registered')) {
      return { success: false, error: AUTH_ERRORS.EMAIL_TAKEN, field: 'email' };
    }
    if (error.message.includes('Password')) {
      return { success: false, error: AUTH_ERRORS.WEAK_PASSWORD, field: 'password' };
    }
    return { success: false, error: error.message };
  }

  // With email confirmation disabled, Supabase returns a session immediately
  if (!data.session) {
    // Fallback: if for some reason no session is returned,
    // this means email confirmation is still enabled in Supabase dashboard
    return {
      success: false,
      error: 'Email confirmation is required. Please check your inbox or contact support.',
    };
  }

  // Profile is auto-created by the database trigger (handle_new_user)
  // No need to manually insert here.

  // Set the 1-day session marker cookie
  const response = NextResponse.redirect(
    new URL(AUTH_CONFIG.DEFAULT_REDIRECT, process.env.NEXT_PUBLIC_APP_URL)
  );
  setSessionStartCookie(response);

  revalidatePath('/', 'layout');
  redirect(AUTH_CONFIG.DEFAULT_REDIRECT);
}

/**
 * Sign out - clears both Supabase session and 1-day marker
 */
export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();

  // Clear the session start cookie
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_CONFIG.SESSION_STARTED_AT_COOKIE);

  revalidatePath('/', 'layout');
  redirect(AUTH_CONFIG.LOGIN_ROUTE);
}

/**
 * Google OAuth sign in
 */
export async function signInWithGoogle(): Promise<void> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}${AUTH_CONFIG.CALLBACK_ROUTE}`,
    },
  });

  if (error || !data?.url) {
    throw new Error(error?.message || 'Failed to start Google sign in');
  }

  redirect(data.url);
}

// Need to import NextResponse for redirects in server actions
import { NextResponse } from 'next/server';
