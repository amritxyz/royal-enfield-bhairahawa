// src/app/register/page.tsx
'use client';

import { useState, useActionState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { signUpWithEmail } from '@/lib/auth/actions';

const initialState = { success: false, error: undefined, field: undefined };

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(
    signUpWithEmail,
    initialState
  );

  return (
    <div className="pt-24 pb-24 min-h-screen flex items-center">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-md mx-auto">
          <SectionHeading
            label="Account"
            title="Create Account"
            description="Join the Royal Enfield community in Bhairahawa."
            align="center"
          />

          {state.error && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{state.error}</p>
            </div>
          )}

          <form action={formAction} className="mt-8 space-y-5 bg-card border border-border rounded-sm p-6 sm:p-8">
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-heading uppercase tracking-wider font-semibold text-zinc-300 mb-2"
              >
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                autoComplete="name"
                className="w-full px-4 py-2.5 bg-secondary/80 border border-border rounded-sm text-white placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-heading uppercase tracking-wider font-semibold text-zinc-300 mb-2"
              >
                Rider Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full px-4 py-2.5 bg-secondary/80 border border-border rounded-sm text-white placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
                placeholder="rider@royalenfield.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-heading uppercase tracking-wider font-semibold text-zinc-300 mb-2"
              >
                Contact Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className="w-full px-4 py-2.5 bg-secondary/80 border border-border rounded-sm text-white placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
                placeholder="+977 9800000000"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-heading uppercase tracking-wider font-semibold text-zinc-300 mb-2"
              >
                Password *
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full px-4 py-2.5 bg-secondary/80 border border-border rounded-sm text-white placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors pr-12"
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-zinc-500 mt-1.5 font-sans">
                Must be at least 6 characters
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              className="w-full bg-accent hover:bg-accent/90 text-white font-heading uppercase tracking-wider font-bold h-11 text-xs"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Rider Account...
                </>
              ) : (
                'Create Rider Account'
              )}
            </Button>

            <p className="text-center text-xs text-zinc-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-accent hover:underline font-heading font-semibold uppercase tracking-wider"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
