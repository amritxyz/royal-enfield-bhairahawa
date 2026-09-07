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
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-[#141414]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#282828_0%,#101010_100%)]" />
            <div className="absolute inset-0 flex items-center justify-center opacity-15">
              <span className="font-heading text-8xl font-black uppercase text-white tracking-widest select-none">
                RE
              </span>
            </div>
            {motorcycle.isNew && (
              <Badge className="absolute top-4 left-4 bg-accent text-white text-[10px] font-heading tracking-widest font-bold border-none rounded-sm">
                NEW MODEL
              </Badge>
            )}
          </div>

          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 bg-accent/10 border border-accent/20 rounded-sm">
              <span className="w-1.5 h-1.5 bg-accent" />
              <span className="font-heading text-[11px] tracking-[0.2em] text-accent uppercase font-semibold">
                {motorcycle.subcategory} · {motorcycle.category}
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-bold uppercase text-white tracking-wide mb-2">
              {motorcycle.name}
            </h1>
            <p className="font-heading text-lg text-accent uppercase tracking-wider mb-6 font-semibold">
              {motorcycle.tagline}
            </p>
            <p className="text-zinc-300 leading-relaxed mb-8 text-sm">
              {motorcycle.description}
            </p>
            {motorcycle.specs && (
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(motorcycle.specs).map(([key, value]) => (
                  <div key={key} className="bg-card border border-border rounded-sm p-3.5">
                    <p className="font-heading text-[10px] tracking-[0.2em] text-zinc-400 uppercase font-medium mb-1">
                      {key}
                    </p>
                    <p className="text-white font-heading text-base font-bold uppercase">{value}</p>
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