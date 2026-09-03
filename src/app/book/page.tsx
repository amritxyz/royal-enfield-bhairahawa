// src/app/book/page.tsx
import { TestRideForm } from '@/components/rides/test-ride-form';
import { SectionHeading } from '@/components/shared/section-heading';
import { getMotorcycle } from '@/lib/constants/motorcycles';

export const metadata = {
  title: 'Book a Test Ride',
  description:
    'Schedule a Royal Enfield test ride at our Bhairahawa showroom.',
};

export default async function BookTestRidePage({
  searchParams,
}: {
  searchParams: Promise<{ motorcycle?: string }>;
}) {
  const { motorcycle } = await searchParams;
  const selected = motorcycle ? getMotorcycle(motorcycle) : undefined;

  return (
    <div className="pt-24 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <SectionHeading
            label="Test Ride"
            title="Book Your Test Ride"
            description="Experience the thrill of Royal Enfield. Schedule a test ride at our Bhairahawa showroom."
            align="center"
          />
          <TestRideForm motorcycleId={selected?.id} />
        </div>
      </div>
    </div>
  );
}
