// src/components/sections/cta-section.tsx
import Link from 'next/link';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { siteConfig } from '@/config/site';

export function CTASection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#0D0D0D] border-t border-border/70 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            label="Experience Pure Motorcycling"
            title="Book Your Test Ride Today"
            description="Visit our official Royal Enfield showroom in Bhairahawa, Nepal. Feel the legendary thump and test-ride your dream machine with our certified experts."
            align="center"
          />

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white font-heading uppercase tracking-wider font-bold px-8 h-12 text-sm group shadow-lg shadow-accent/25"
              asChild
            >
              <Link href="/book">
                Book a Test Ride
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-border bg-secondary hover:border-accent text-white font-heading uppercase tracking-wider text-sm h-12 px-8"
              asChild
            >
              <Link href={siteConfig.location.mapsUrl}>
                <MapPin className="mr-2 w-4 h-4 text-accent" />
                Showroom Location
              </Link>
            </Button>
          </div>

          {/* Contact info cards */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="flex flex-col gap-2 p-5 bg-card border border-border rounded-sm">
              <div className="flex items-center gap-2 text-accent font-heading text-xs uppercase tracking-wider font-semibold">
                <MapPin className="w-4 h-4" />
                Address
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {siteConfig.location.address}
              </p>
            </div>

            <div className="flex flex-col gap-2 p-5 bg-card border border-border rounded-sm">
              <div className="flex items-center gap-2 text-accent font-heading text-xs uppercase tracking-wider font-semibold">
                <Phone className="w-4 h-4" />
                Direct Hotline
              </div>
              <p className="text-xs text-zinc-400">
                {siteConfig.location.phone}
              </p>
            </div>

            <div className="flex flex-col gap-2 p-5 bg-card border border-border rounded-sm">
              <div className="flex items-center gap-2 text-accent font-heading text-xs uppercase tracking-wider font-semibold">
                <Mail className="w-4 h-4" />
                Official Email
              </div>
              <p className="text-xs text-zinc-400">
                {siteConfig.location.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
