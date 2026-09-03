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
          <div className="glass rounded-2xl p-6 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                  {profile?.avatar_url ? (
                    <Image
                      src={profile.avatar_url}
                      alt={profile.full_name ?? 'User'}
                      width={64}
                      height={64}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-accent" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {profile?.full_name || 'Rider'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Member since{' '}
                    {new Date(
                      profile?.created_at || user.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                <Mail className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm text-white">{user.email}</p>
                </div>
              </div>

              {profile?.phone && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <Phone className="w-4 h-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm text-white">{profile.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="glass rounded-2xl p-6">
              <Calendar className="w-6 h-6 text-accent mb-3" />
              <h4 className="font-semibold text-white mb-1">My Bookings</h4>
              <p className="text-sm text-muted-foreground mb-4">
                {testRides.length > 0
                  ? `${testRides.length} test ride ${testRides.length === 1 ? 'request' : 'requests'}`
                  : 'No test rides booked yet'}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-white/10 bg-white/5 text-white"
                asChild
              >
                <Link href="/book">Book a test ride</Link>
              </Button>
            </div>

            <div className="glass rounded-2xl p-6">
              <Bike className="w-6 h-6 text-accent mb-3" />
              <h4 className="font-semibold text-white mb-1">My Rides</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Join upcoming community rides
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-white/10 bg-white/5 text-white"
                disabled
              >
                Coming Soon
              </Button>
            </div>
          </div>

          {testRides.length > 0 && (
            <div className="glass rounded-2xl p-6 mb-6">
              <h4 className="font-semibold text-white mb-4">Test ride requests</h4>
              <div className="space-y-3">
                {testRides.map((ride) => {
                  const motorcycle = getMotorcycle(ride.motorcycle_id);
                  return (
                    <div
                      key={ride.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg bg-white/5"
                    >
                      <div>
                        <p className="text-sm text-white font-medium">
                          {motorcycle?.name ?? ride.motorcycle_id}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(ride.preferred_date).toLocaleDateString()}
                          {ride.preferred_time ? ` · ${ride.preferred_time}` : ''}
                        </p>
                      </div>
                      <span className="text-[10px] tracking-wider uppercase text-accent">
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
