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
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 blur-[150px] rounded-full" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <SectionHeading
          label="Motorcycles"
          title="Explore the complete lineup"
          description="Discover the Royal Enfield range available at our Bhairahawa showroom."
        />

        {/* 350cc Series */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
            <h3 className="text-sm tracking-[0.3em] text-accent uppercase font-medium">
              350cc Series — J-Platform
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-accent/50 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {series350.map((moto) => (
              <MotorcycleCard key={moto.id} motorcycle={moto} />
            ))}
          </div>
        </div>

        {/* 400cc+ Series */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
            <h3 className="text-sm tracking-[0.3em] text-accent uppercase font-medium">
              400cc+ Series
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-accent/50 to-transparent" />
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
    <Card className="group relative bg-secondary/50 border-white/5 hover:border-accent/30 transition-all duration-500 overflow-hidden">
      {/* Image placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
        {/* 
          <Image
            src={motorcycle.image}
            alt={motorcycle.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />

        {motorcycle.isNew && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold tracking-wider">
            NEW
          </Badge>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
      </div>

      <CardContent className="p-5">
        <p className="text-[10px] tracking-[0.2em] text-accent uppercase mb-1">
          {motorcycle.subcategory}
        </p>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
          {motorcycle.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {motorcycle.description}
        </p>

        <Link
          href={motorcycle.href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-accent transition-colors group/link"
        >
          View Details
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
