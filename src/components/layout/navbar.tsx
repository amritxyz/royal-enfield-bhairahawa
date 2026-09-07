// src/components/layout/navbar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems } from '@/lib/constants/motorcycles';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const { user, profile } = useAuth();
  const { itemCount, hydrated } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#0E0E0E]/95 backdrop-blur-md border-b border-border py-3 shadow-lg'
          : 'bg-gradient-to-b from-black/80 to-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Official Royal Enfield Brand Logo / Badge */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-8 bg-accent group-hover:scale-y-110 transition-transform" />
              <div className="flex flex-col leading-none">
                <span className="font-heading text-xl sm:text-2xl font-bold tracking-wider text-white group-hover:text-accent transition-colors">
                  ROYAL ENFIELD
                </span>
                <span className="font-heading text-[10px] tracking-[0.35em] text-accent uppercase font-medium">
                  Bhairahawa Dealer
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 font-heading text-sm uppercase tracking-wider text-zinc-300 hover:text-white transition-colors relative group/nav"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200 text-zinc-400 group-hover/nav:text-white',
                        activeDropdown === item.label && 'rotate-180 text-accent'
                      )}
                    />
                  )}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-200" />
                </Link>

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-60 bg-card border border-border rounded-sm p-1.5 shadow-2xl animate-scale-in">
                    <div className="px-3 py-1.5 border-b border-border/50 mb-1">
                      <span className="text-[10px] font-heading tracking-[0.2em] text-accent uppercase font-semibold">
                        {item.label} Range
                      </span>
                    </div>
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 text-xs font-heading uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-secondary rounded-sm transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-300 hover:text-white relative hover:bg-white/5"
              asChild
            >
              <Link href="/cart" aria-label="Shopping cart">
                <ShoppingCart className="w-5 h-5" />
                {hydrated && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-sm bg-accent text-white text-[10px] font-bold leading-4 text-center font-heading">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>
            </Button>

            {user ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex border-border bg-secondary hover:border-accent font-heading uppercase tracking-wider text-xs"
                  asChild
                >
                  <Link href="/account">
                    <User className="w-3.5 h-3.5 mr-1.5 text-accent" />
                    {profile?.full_name?.split(' ')[0] || 'Rider Account'}
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-300 hover:text-white sm:hidden"
                  asChild
                >
                  <Link href="/account">
                    <User className="w-5 h-5" />
                  </Link>
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex border-border bg-secondary hover:border-accent font-heading uppercase tracking-wider text-xs"
                asChild
              >
                <Link href="/login">
                  <User className="w-3.5 h-3.5 mr-1.5 text-accent" />
                  Rider Login
                </Link>
              </Button>
            )}

            {/* Book Test Ride quick CTA in desktop header */}
            <Button
              size="sm"
              className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-white font-heading uppercase tracking-wider text-xs font-semibold px-4"
              asChild
            >
              <Link href="/book">Test Ride</Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 bg-card border border-border rounded-sm p-4 animate-scale-in shadow-2xl">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2.5 font-heading text-sm uppercase tracking-wider text-white hover:bg-secondary rounded-sm transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-6 py-2 text-xs font-heading uppercase tracking-wide text-zinc-400 hover:text-white hover:bg-secondary/50 rounded-sm transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="border-t border-border mt-3 pt-3 flex flex-col gap-2">
                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-white font-heading uppercase tracking-wider"
                  asChild
                >
                  <Link href="/book" onClick={() => setIsMobileMenuOpen(false)}>
                    Book a Test Ride
                  </Link>
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-border bg-secondary text-white font-heading uppercase tracking-wider"
                    asChild
                  >
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <User className="w-4 h-4 mr-2 text-accent" />
                      Login
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border bg-secondary text-zinc-300"
                    asChild
                  >
                    <Link href="/cart" aria-label="Shopping cart" onClick={() => setIsMobileMenuOpen(false)}>
                      <ShoppingCart className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
