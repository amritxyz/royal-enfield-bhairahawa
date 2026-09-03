// src/lib/constants/auth.ts
export const AUTH_CONFIG = {
  // Session expires after 1 day (in seconds)
  SESSION_MAX_AGE: 60 * 60 * 24, // 24 hours

  // Cookie names
  SESSION_STARTED_AT_COOKIE: 're_session_started_at',
  AUTH_TOKEN_COOKIE: 're-auth-token',

  // Protected routes
  PROTECTED_ROUTES: ['/account', '/book', '/orders', '/profile'],

  // Auth routes
  LOGIN_ROUTE: '/login',
  REGISTER_ROUTE: '/register',
  CALLBACK_ROUTE: '/auth/callback',

  // Redirect after login
  DEFAULT_REDIRECT: '/account',
} as const;

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_TAKEN: 'An account with this email already exists',
  WEAK_PASSWORD: 'Password should be at least 6 characters',
  INVALID_EMAIL: 'Please enter a valid email address',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  GENERIC: 'Something went wrong. Please try again.',
} as const;
