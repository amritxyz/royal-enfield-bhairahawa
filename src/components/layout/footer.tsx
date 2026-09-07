// src/components/layout/footer.tsx
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { navItems } from '@/lib/constants/motorcycles';

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-[#0B0B0B]">
      {/* Royal Enfield Heritage Banner */}
      <div className="border-b border-border/70 bg-[#111111]/80 py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-accent" />
              <span className="font-heading text-lg sm:text-xl font-bold tracking-[0.25em] text-white uppercase">
                MADE LIKE A GUN · SINCE 1901
              </span>
            </div>
            <p className="text-xs font-heading tracking-widest text-zinc-400 uppercase">
              Official Royal Enfield Showroom & Service Center · Bhairahawa, Nepal
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-7 bg-accent" />
              <div className="flex flex-col leading-none">
                <span className="font-heading text-xl font-bold tracking-wider text-white">
                  ROYAL ENFIELD
                </span>
                <span className="font-heading text-[10px] tracking-[0.3em] text-accent uppercase">
                  Bhairahawa
                </span>
              </div>
            </div>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex gap-2.5">
              {['Instagram', 'Facebook', 'YouTube'].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-sm border border-border bg-secondary flex items-center justify-center text-zinc-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-colors text-xs font-heading font-semibold"
                >
                  {social[0]}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white mb-4 tracking-widest uppercase flex items-center gap-2">
              <span className="w-1 h-3 bg-accent" />
              Motorcycles
            </h4>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs font-heading uppercase tracking-wider text-zinc-400 hover:text-white hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rides */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white mb-4 tracking-widest uppercase flex items-center gap-2">
              <span className="w-1 h-3 bg-accent" />
              Expeditions & Rides
            </h4>
            <ul className="space-y-2.5">
              {['Himalayan Odyssey', 'Moto Himalaya', 'Leh Ladakh', 'Community Rides'].map(
                (ride) => (
                  <li key={ride}>
                    <Link
                      href="/rides"
                      className="text-xs font-heading uppercase tracking-wider text-zinc-400 hover:text-white hover:text-accent transition-colors"
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
            <h4 className="font-heading text-sm font-bold text-white mb-4 tracking-widest uppercase flex items-center gap-2">
              <span className="w-1 h-3 bg-accent" />
              Showroom Location
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-xs text-zinc-400 leading-relaxed">
                  {siteConfig.location.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span className="text-xs text-zinc-400">
                  {siteConfig.location.phone}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span className="text-xs text-zinc-400">
                  {siteConfig.location.email}
                </span>
              </li>
            </ul>
            <Link
              href={siteConfig.location.mapsUrl}
              className="inline-flex items-center gap-1.5 mt-4 text-xs font-heading font-semibold uppercase tracking-wider text-accent hover:underline"
            >
              Get Directions to Showroom
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-heading tracking-wider uppercase text-zinc-500">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-[11px] font-heading tracking-widest uppercase text-zinc-400">
            Pure Motorcycling · Built for every adventure.
          </p>
        </div>
      </div>
    </footer>
  );
}
