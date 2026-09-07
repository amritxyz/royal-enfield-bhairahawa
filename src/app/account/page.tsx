// src/app/account/page.tsx
import Image from 'next/image';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser, getCurrentUserProfile } from '@/lib/auth/session';
import { signOut } from '@/lib/auth/actions';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { getMotorcycle } from '@/lib/constants/motorcycles';
import { getUserTestRides } from '@/lib/rides/queries';
import {
  User,
  Mail,
  Phone,
  LogOut,
  Calendar,
  Bike,
} from 'lucide-react';

export const metadata = {
  title: 'My Account',
  description: 'Manage your Royal Enfield Bhairahawa account.',
};

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const profile = await getCurrentUserProfile();
  const testRides = await getUserTestRides();

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            label="Account"
            title="My Account"
            description="Manage your profile and view your bookings."
          />

          {/* Profile Card */}
          <div className="bg-card border border-border rounded-sm p-6 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-sm bg-secondary border border-border flex items-center justify-center">
                  {profile?.avatar_url ? (
                    <Image
                      src={profile.avatar_url}
                      alt={profile.full_name ?? 'User'}
                      width={56}
                      height={56}
                      className="w-full h-full rounded-sm object-cover"
                    />
                  ) : (
                    <User className="w-7 h-7 text-accent" />
                  )}
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold uppercase text-white">
                    {profile?.full_name || 'Rider'}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Member since{' '}
                    {new Date(
                      profile?.created_at || user.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-sm bg-secondary border border-border/60">
                <Mail className="w-4 h-4 text-accent" />
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-wider text-zinc-400">Registered Email</p>
                  <p className="text-sm text-white font-medium">{user.email}</p>
                </div>
              </div>

              {profile?.phone && (
                <div className="flex items-center gap-3 p-3 rounded-sm bg-secondary border border-border/60">
                  <Phone className="w-4 h-4 text-accent" />
                  <div>
                    <p className="font-heading text-[10px] uppercase tracking-wider text-zinc-400">Contact Phone</p>
                    <p className="text-sm text-white font-medium">{profile.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-card border border-border rounded-sm p-6">
              <Calendar className="w-6 h-6 text-accent mb-3" />
              <h4 className="font-heading text-lg font-bold uppercase text-white mb-1">My Bookings</h4>
              <p className="text-xs text-zinc-400 mb-4">
                {testRides.length > 0
                  ? `${testRides.length} test ride ${testRides.length === 1 ? 'request' : 'requests'}`
                  : 'No test rides booked yet'}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-border bg-secondary text-white font-heading uppercase tracking-wider text-xs hover:border-accent"
                asChild
              >
                <Link href="/book">Book a Test Ride</Link>
              </Button>
            </div>

            <div className="bg-card border border-border rounded-sm p-6">
              <Bike className="w-6 h-6 text-accent mb-3" />
              <h4 className="font-heading text-lg font-bold uppercase text-white mb-1">My Expeditions</h4>
              <p className="text-xs text-zinc-400 mb-4">
                Join upcoming Bhairahawa community rides
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-border bg-secondary text-white font-heading uppercase tracking-wider text-xs"
                disabled
              >
                Coming Soon
              </Button>
            </div>
          </div>

          {testRides.length > 0 && (
            <div className="bg-card border border-border rounded-sm p-6 mb-6">
              <h4 className="font-heading text-lg font-bold uppercase text-white mb-4">Test Ride Requests</h4>
              <div className="space-y-3">
                {testRides.map((ride) => {
                  const motorcycle = getMotorcycle(ride.motorcycle_id);
                  return (
                    <div
                      key={ride.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3.5 rounded-sm bg-secondary border border-border/60"
                    >
                      <div>
                        <p className="text-sm text-white font-heading font-bold uppercase">
                          {motorcycle?.name ?? ride.motorcycle_id}
                        </p>
                        <p className="text-xs text-zinc-400">
                          {new Date(ride.preferred_date).toLocaleDateString()}
                          {ride.preferred_time ? ` · ${ride.preferred_time}` : ''}
                        </p>
                      </div>
                      <span className="text-[10px] font-heading font-bold tracking-widest uppercase text-accent px-2 py-0.5 bg-accent/10 border border-accent/20 rounded-sm">
                        {ride.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sign Out */}
          <form>
            <Button
              type="submit"
              formAction={signOut}
              variant="outline"
              className="w-full border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive h-12"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Sessions automatically expire after 24 hours for your security.
          </p>
        </div>
      </div>
    </div>
  );
}
