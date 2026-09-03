// src/components/layout/footer.tsx
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { navItems } from '@/lib/constants/motorcycles';

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex flex-col leading-none mb-4">
              <span className="text-lg font-bold tracking-wider text-white">
                BHAIRAHAWA
              </span>
              <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                Royal Enfield
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              {siteConfig.description}
            </p>
            <div className="flex gap-3">
              {['Instagram', 'Facebook', 'YouTube'].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors text-xs"
                >
                  {social[0]}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rides */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">
              Rides
            </h4>
            <ul className="space-y-2">
              {['Himalayan Odyssey', 'Moto Himalaya', 'Leh Ladakh', 'Community Rides'].map(
                (ride) => (
                  <li key={ride}>
                    <Link
                      href="/rides"
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {ride}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">
              Visit Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {siteConfig.location.address}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {siteConfig.location.phone}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {siteConfig.location.email}
                </span>
              </li>
            </ul>
            <Link
              href={siteConfig.location.mapsUrl}
              className="inline-flex items-center gap-1 mt-4 text-sm text-accent hover:underline"
            >
              Get Directions
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Pure Motorcycling — Built for every adventure.
          </p>
        </div>
      </div>
    </footer>
  );
}
