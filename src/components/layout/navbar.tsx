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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-wider text-white group-hover:text-accent transition-colors">
                BHAIRAHAWA
              </span>
              <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                Royal Enfield
              </span>
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
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors rounded-md hover:bg-white/5"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200',
                        activeDropdown === item.label && 'rotate-180'
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 glass rounded-xl p-2 animate-scale-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-white hover:bg-white/5 rounded-lg transition-colors"
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
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-white relative"
              asChild
            >
              <Link href="/cart" aria-label="Shopping cart">
                <ShoppingCart className="w-5 h-5" />
                {hydrated && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold leading-4 text-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>
            </Button>

            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-white hidden sm:flex"
                  asChild
                >
                  <Link href="/account">
                    <User className="w-4 h-4 mr-2" />
                    {profile?.full_name?.split(' ')[0] || 'Account'}
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-white sm:hidden"
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
                className="hidden sm:flex border-white/10 bg-white/5 hover:bg-white/10 text-white"
                asChild
              >
                <Link href="/login">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Link>
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
          <div className="lg:hidden mt-4 glass rounded-2xl p-4 animate-scale-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-8 py-2 text-sm text-muted-foreground hover:text-white transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="border-t border-white/5 mt-2 pt-2 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-white/10 bg-white/5 text-white"
                  asChild
                >
                  <Link href="/login">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground relative"
                  asChild
                >
                  <Link href="/cart" aria-label="Shopping cart">
                    <ShoppingCart className="w-5 h-5" />
                    {hydrated && itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold leading-4 text-center">
                        {itemCount > 99 ? '99+' : itemCount}
                      </span>
                    )}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
