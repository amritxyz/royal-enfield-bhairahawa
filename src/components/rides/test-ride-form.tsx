'use client';

import { useActionState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AlertCircle, CheckCircle2, Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { motorcycles } from '@/lib/constants/motorcycles';
import { bookTestRide, type BookTestRideState } from '@/lib/rides/actions';

const initialState: BookTestRideState = { success: false };

const fieldClassName =
  'w-full px-4 py-2.5 bg-secondary/80 border border-border rounded-sm text-white placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors';

function todayIsoDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

export function TestRideForm({
  motorcycleId,
  lockMotorcycle = false,
}: {
  motorcycleId?: string;
  lockMotorcycle?: boolean;
}) {
  const pathname = usePathname();
  const { user, profile, loading } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(bookTestRide, initialState);
  const selectedMotorcycle = motorcycles.find((moto) => moto.id === motorcycleId);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-sm p-8 text-center text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin mx-auto mb-3 text-accent" />
        Checking your session...
      </div>
    );
  }

  if (!user) {
    const redirectTo = pathname || '/book';
    return (
      <div className="bg-card border border-border rounded-sm p-8 text-center">
        <Lock className="w-8 h-8 text-accent mx-auto mb-4" />
        <h3 className="text-xl font-heading font-bold uppercase text-white mb-2">Rider Sign In Required</h3>
        <p className="text-xs text-zinc-400 mb-6 max-w-md mx-auto">
          Test rides are reserved for registered riders so our Bhairahawa showroom team can verify credentials and confirm your booking.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            className="bg-accent hover:bg-accent/90 text-white font-heading uppercase tracking-wider font-bold"
            asChild
          >
            <Link href={`/login?redirect=${encodeURIComponent(redirectTo)}`}>
              Sign In
            </Link>
          </Button>
          <Button
            variant="outline"
            className="border-border bg-secondary text-white font-heading uppercase tracking-wider hover:border-accent"
            asChild
          >
            <Link href={`/register?redirect=${encodeURIComponent(redirectTo)}`}>
              Create Rider Account
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-5 bg-card border border-border rounded-sm p-6 sm:p-8">
      {state.success && (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-200">
            Your test ride request is pending. We&apos;ll contact you within 24
            hours to confirm.
          </p>
        </div>
      )}

      {state.error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{state.error}</p>
        </div>
      )}

      <div>
        <label htmlFor="motorcycleId" className="block text-sm font-medium text-white mb-2">
          Motorcycle *
        </label>
        {lockMotorcycle && selectedMotorcycle ? (
          <>
            <input type="hidden" name="motorcycleId" value={selectedMotorcycle.id} />
            <div className={fieldClassName}>
              {selectedMotorcycle.name} — {selectedMotorcycle.tagline}
            </div>
          </>
        ) : (
          <select
            id="motorcycleId"
            name="motorcycleId"
            required
            defaultValue={motorcycleId ?? ''}
            className={fieldClassName}
          >
            <option value="">Choose a motorcycle</option>
            {motorcycles.map((moto) => (
              <option key={moto.id} value={moto.id}>
                {moto.name} — {moto.tagline}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
            Full Name *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={profile?.full_name ?? ''}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
            Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={profile?.email ?? user.email ?? ''}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
            Phone *
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            defaultValue={profile?.phone ?? ''}
            placeholder="+977 9800000000"
          />
        </div>
        <div>
          <label htmlFor="preferredDate" className="block text-sm font-medium text-white mb-2">
            Preferred date *
          </label>
          <Input
            id="preferredDate"
            name="preferredDate"
            type="date"
            required
            min={todayIsoDate()}
          />
        </div>
      </div>

      <div>
        <label htmlFor="preferredTime" className="block text-sm font-medium text-white mb-2">
          Preferred time *
        </label>
        <Input id="preferredTime" name="preferredTime" type="time" required />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-white mb-2">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className={`${fieldClassName} resize-none`}
          placeholder="Anything we should know before your ride..."
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          'Book Test Ride'
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        We&apos;ll contact you within 24 hours to confirm your appointment.
      </p>
    </form>
  );
}