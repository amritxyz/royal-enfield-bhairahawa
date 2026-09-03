// src/components/sections/rides-section.tsx
import Link from 'next/link';
import { ArrowRight, Clock, Mountain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { rides } from '@/lib/constants/motorcycles';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/shared/section-heading';

const difficultyColors: Record<string, string> = {
  Easy: 'bg-green-500/10 text-green-400 border-green-500/20',
  Moderate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Challenging: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Extreme: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export function RidesSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          label="Adventures"
          title="All Rides"
          description="Join our community rides and explore the most breathtaking routes."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {rides.map((ride, index) => (
            <Card
              key={ride.id}
              className="group relative bg-background border-white/5 hover:border-accent/30 transition-all duration-500 overflow-hidden"
            >
              {/* Image placeholder */}
              <div className="relative aspect-[3/2] overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                {/*
                  <Image
                    src={ride.image}
                    alt={ride.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                {ride.difficulty && (
                  <Badge
                    className={cn(
                      'absolute top-3 right-3 text-[10px] font-bold tracking-wider border',
                      difficultyColors[ride.difficulty]
                    )}
                  >
                    {ride.difficulty}
                  </Badge>
                )}
              </div>

              <CardContent className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                  {ride.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {ride.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  {ride.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {ride.duration}
                    </span>
                  )}
                </div>

                <Link
                  href={ride.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-accent transition-colors group/link"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
