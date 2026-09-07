// src/components/sections/motorcycle-lineup.tsx
'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motorcycles } from '@/lib/constants/motorcycles';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/shared/section-heading';

export function MotorcycleLineup() {
  const series350 = motorcycles.filter((m) => m.category === '350cc');
  const series400 = motorcycles.filter((m) => m.category === '400cc+');

  return (
    <section className="relative py-20 lg:py-28 bg-[#0D0D0D]">
      <div className="container mx-auto px-4 lg:px-8 relative">
        <SectionHeading
          label="Motorcycle Range"
          title="The Royal Enfield Lineup"
          description="Explore our complete fleet available at our official Bhairahawa showroom. Engineered with pure motorcycling heritage."
        />

        {/* 350cc Series */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border">
            <div className="w-2 h-4 bg-accent" />
            <h3 className="font-heading text-lg tracking-wider text-white uppercase font-bold">
              350cc Series — J-Platform
            </h3>
            <span className="text-xs font-heading text-zinc-500 uppercase tracking-widest ml-auto">
              Classic & Urban Cruisers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {series350.map((moto) => (
              <MotorcycleCard key={moto.id} motorcycle={moto} />
            ))}
          </div>
        </div>

        {/* 400cc+ Series */}
        <div>
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border">
            <div className="w-2 h-4 bg-accent" />
            <h3 className="font-heading text-lg tracking-wider text-white uppercase font-bold">
              400cc+ Series — Expedition & Roadster
            </h3>
            <span className="text-xs font-heading text-zinc-500 uppercase tracking-widest ml-auto">
              Sherpa 450 & Scrambler
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {series400.map((moto) => (
              <MotorcycleCard key={moto.id} motorcycle={moto} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MotorcycleCard({
  motorcycle,
}: {
  motorcycle: (typeof motorcycles)[number];
}) {
  return (
    <Card className="group relative bg-card border border-border hover:border-accent/60 transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between">
      <div>
        {/* Motorcycle visual block */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#181818] border-b border-border/60">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#282828_0%,#141414_100%)]" />
          
          {/* Subtle tire track / mechanical graphic watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="font-heading text-6xl font-black uppercase text-white tracking-widest select-none">
              RE
            </span>
          </div>

          {motorcycle.isNew && (
            <Badge className="absolute top-3 left-3 bg-accent text-white text-[10px] font-heading tracking-widest font-bold border-none rounded-sm">
              NEW MODEL
            </Badge>
          )}

          <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/80 border border-white/10 rounded-sm">
            <span className="text-[10px] font-heading tracking-wider text-zinc-300 uppercase">
              {motorcycle.category}
            </span>
          </div>
        </div>

        <CardContent className="p-5">
          <p className="font-heading text-[11px] tracking-[0.2em] text-accent uppercase font-semibold mb-1">
            {motorcycle.subcategory}
          </p>
          <h3 className="font-heading text-2xl font-bold uppercase text-white mb-2 group-hover:text-accent transition-colors tracking-wide">
            {motorcycle.name}
          </h3>
          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
            {motorcycle.description}
          </p>
        </CardContent>
      </div>

      <div className="px-5 pb-5 pt-0 border-t border-border/40 mt-auto flex items-center justify-between pt-3">
        <Link
          href={motorcycle.href}
          className="inline-flex items-center gap-1 text-xs font-heading font-bold uppercase tracking-wider text-white hover:text-accent transition-colors group/link"
        >
          View Specs & Booking
          <ArrowUpRight className="w-3.5 h-3.5 text-accent transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
        <Link
          href={`/book?motorcycle=${motorcycle.id}`}
          className="text-[11px] font-heading uppercase tracking-wider text-zinc-400 hover:text-white"
        >
          Test Ride →
        </Link>
      </div>
    </Card>
  );
}
