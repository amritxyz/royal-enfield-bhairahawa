// src/components/sections/hero-section.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { heroSlides } from '@/lib/constants/motorcycles';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(
      (currentSlide - 1 + heroSlides.length) % heroSlides.length
    );
  }, [currentSlide, goToSlide]);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative h-screen min-h-[720px] w-full overflow-hidden bg-[#0A0A0A] flex flex-col justify-between">
      {/* Background with authentic mechanical grid & deep dark vignetting */}
      <div className="absolute inset-0">
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            currentSlide === 0 &&
              'bg-[radial-gradient(ellipse_at_top_right,#241012_0%,#0e0e0e_60%,#080808_100%)]',
            currentSlide === 1 &&
              'bg-[radial-gradient(ellipse_at_top_right,#1f1a14_0%,#0e0e0e_60%,#080808_100%)]',
            currentSlide === 2 &&
              'bg-[radial-gradient(ellipse_at_top_right,#1d1010_0%,#0e0e0e_60%,#080808_100%)]',
            currentSlide === 3 &&
              'bg-[radial-gradient(ellipse_at_top_right,#141920_0%,#0e0e0e_60%,#080808_100%)]'
          )}
        />
        {/* Subtle mechanical grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 container mx-auto px-4 lg:px-8 flex flex-col justify-center pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Heritage Pill / Tag */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/15 border border-accent/30 rounded-sm">
              <span className="w-1.5 h-1.5 bg-accent" />
              <span className="font-heading text-xs tracking-[0.25em] text-accent uppercase font-semibold">
                PURE MOTORCYCLING · SINCE 1901
              </span>
            </div>
            <span className="text-zinc-600">/</span>
            <span className="font-heading text-xs tracking-[0.2em] text-zinc-400 uppercase font-medium">
              SHOWROOM BHAIRAHAWA
            </span>
          </div>

          {/* Title */}
          <h1
            key={`title-${currentSlide}`}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black tracking-tight text-white uppercase leading-[0.88] mb-6 animate-slide-up"
          >
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p
            key={`subtitle-${currentSlide}`}
            className="text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-2xl font-sans font-light tracking-wide mb-10 animate-slide-up delay-100"
          >
            {slide.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 animate-slide-up delay-200">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white font-heading font-bold uppercase tracking-wider px-8 h-12 text-sm group shadow-lg shadow-accent/20"
              asChild
            >
              <Link href={slide.href}>
                {slide.cta}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-border bg-secondary hover:border-white/40 text-white font-heading uppercase tracking-wider text-sm h-12 px-8"
              asChild
            >
              <Link href="/models">Explore All Motorcycles</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom controls & Slide Switcher */}
      <div className="relative z-10 border-t border-border/80 bg-[#0E0E0E]/90 py-5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Slide tabs / indicators */}
            <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {heroSlides.map((s, index) => (
                <button
                  key={s.id}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    'flex items-center gap-2.5 text-left py-1 transition-all group font-heading uppercase text-xs tracking-wider shrink-0',
                    index === currentSlide
                      ? 'text-white font-bold'
                      : 'text-zinc-500 hover:text-zinc-300 font-normal'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <span
                    className={cn(
                      'h-1 transition-all duration-300 rounded-none',
                      index === currentSlide
                        ? 'w-8 bg-accent'
                        : 'w-4 bg-zinc-700 group-hover:bg-zinc-500'
                    )}
                  />
                  <span>
                    0{index + 1} {s.id.replace('-', ' ')}
                  </span>
                </button>
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="border-border bg-secondary hover:border-accent hover:bg-accent/10 text-white h-9 w-9 rounded-sm"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="border-border bg-secondary hover:border-accent hover:bg-accent/10 text-white h-9 w-9 rounded-sm"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
