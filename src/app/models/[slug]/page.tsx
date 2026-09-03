import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { TestRideForm } from '@/components/rides/test-ride-form';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/shared/section-heading';
import { getMotorcycle, motorcycles } from '@/lib/constants/motorcycles';

export function generateStaticParams() {
  return motorcycles.map((motorcycle) => ({ slug: motorcycle.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const motorcycle = getMotorcycle(slug);
  if (!motorcycle) {
    return { title: 'Motorcycles' };
  }
  return {
    title: motorcycle.name,
    description: motorcycle.description,
  };
}

export default async function MotorcyclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const motorcycle = getMotorcycle(slug);
  if (!motorcycle) notFound();

  return (
    <div className="pt-24 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <Link
          href="/models"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All motorcycles
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-zinc-800 to-zinc-900">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            {motorcycle.isNew && (
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground text-[10px] font-bold tracking-wider">
                NEW
              </Badge>
            )}
          </div>

          <div>
            <p className="text-[10px] tracking-[0.2em] text-accent uppercase mb-3">
              {motorcycle.subcategory} · {motorcycle.category}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              {motorcycle.name}
            </h1>
            <p className="text-lg text-accent mb-6">{motorcycle.tagline}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {motorcycle.description}
            </p>
            {motorcycle.specs && (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(motorcycle.specs).map(([key, value]) => (
                  <div key={key} className="glass rounded-xl p-4">
                    <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1">
                      {key}
                    </p>
                    <p className="text-white font-medium">{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <SectionHeading
            label="Test Ride"
            title={`Book a ${motorcycle.name} test ride`}
            description="Experience this motorcycle at our Bhairahawa showroom. Sign in is required so we can confirm your booking."
            align="center"
          />
          <TestRideForm motorcycleId={motorcycle.id} lockMotorcycle />
        </div>
      </div>
    </div>
  );
}