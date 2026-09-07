// src/components/sections/rides-section.tsx
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { rides } from '@/lib/constants/motorcycles';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/shared/section-heading';

const difficultyColors: Record<string, string> = {
  Easy: 'bg-emerald-950/80 text-emerald-400 border-emerald-800',
  Moderate: 'bg-amber-950/80 text-amber-400 border-amber-800',
  Challenging: 'bg-orange-950/80 text-orange-400 border-orange-800',
  Extreme: 'bg-red-950/80 text-red-400 border-red-800',
};

export function RidesSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#090909] border-t border-border/70">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          label="Expeditions & Tours"
          title="Epic Rides & Community"
          description="Join official Royal Enfield Bhairahawa group rides, Himalayan expeditions, and weekend escapes across Nepal and beyond."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {rides.map((ride) => (
            <Card
              key={ride.id}
              className="group relative bg-card border border-border hover:border-accent/60 transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Visual placeholder with expedition grid pattern */}
                <div className="relative aspect-[3/2] overflow-hidden bg-[#161616] border-b border-border/60">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#2b1517_0%,#121212_100%)]" />
                  
                  {/* Expedition watermark badge */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-15">
                    <span className="font-heading text-4xl font-bold uppercase text-white tracking-widest select-none">
                      EXPEDITION
                    </span>
                  </div>

                  {ride.difficulty && (
                    <Badge
                      className={cn(
                        'absolute top-3 right-3 text-[10px] font-heading uppercase tracking-widest font-bold border rounded-sm',
                        difficultyColors[ride.difficulty]
                      )}
                    >
                      {ride.difficulty}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-5">
                  <h3 className="font-heading text-xl font-bold uppercase text-white mb-2 group-hover:text-accent transition-colors tracking-wide">
                    {ride.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {ride.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-heading uppercase tracking-wider text-zinc-400">
                    {ride.duration && (
                      <span className="flex items-center gap-1.5 px-2 py-0.5 bg-secondary border border-border rounded-sm">
                        <Clock className="w-3 h-3 text-accent" />
                        {ride.duration}
                      </span>
                    )}
                  </div>
                </CardContent>
              </div>

              <div className="px-5 pb-5 pt-0 border-t border-border/40 mt-auto pt-3">
                <Link
                  href={ride.href}
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-white hover:text-accent transition-colors group/link"
                >
                  Join Expedition
                  <ArrowRight className="w-3.5 h-3.5 text-accent transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
