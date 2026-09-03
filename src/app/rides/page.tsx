// src/app/rides/page.tsx
import { RidesSection } from '@/components/sections/rides-section';
import { SectionHeading } from '@/components/shared/section-heading';

export const metadata = {
  title: 'Rides',
  description: 'Join our community rides and explore the most breathtaking routes in Nepal and beyond.',
};

export default function RidesPage() {
  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <SectionHeading
          label="Adventures"
          title="All Rides"
          description="Join our community rides and explore the most breathtaking routes. From weekend escapes to epic Himalayan expeditions."
          align="center"
        />
      </div>
      <RidesSection />
    </div>
  );
}
