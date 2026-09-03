// src/components/sections/cta-section.tsx
import Link from 'next/link';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { siteConfig } from '@/config/site';

export function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading
            label="Visit Us"
            title="Start Your Next Adventure"
            description="Book your test ride, visit our showroom, or get in touch with our team. Experience the legacy of Royal Enfield and discover your perfect motorcycle."
            align="center"
          />

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 h-12 group"
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
              className="border-white/10 bg-white/5 hover:bg-white/10 text-white h-12 px-8"
              asChild
            >
              <Link href="#map">
                <MapPin className="mr-2 w-4 h-4" />
                Find Our Showroom
              </Link>
            </Button>
          </div>

          {/* Contact info */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-2 p-6 glass rounded-xl">
              <MapPin className="w-5 h-5 text-accent" />
              <p className="text-sm text-muted-foreground text-center">
                {siteConfig.location.address}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 glass rounded-xl">
              <Phone className="w-5 h-5 text-accent" />
              <p className="text-sm text-muted-foreground">
                {siteConfig.location.phone}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 glass rounded-xl">
              <Mail className="w-5 h-5 text-accent" />
              <p className="text-sm text-muted-foreground">
                {siteConfig.location.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
