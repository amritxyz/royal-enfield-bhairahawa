// src/components/sections/hero-section.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { heroSlides } from '@/lib/constants/motorcycles';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 800);
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
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* Background — image placeholder (commented for now) */}
      {/*
        <div className="absolute inset-0">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover transition-transform duration-[1500ms] ease-out scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>
      */}

      {/* Animated background gradient (placeholder until images are added) */}
      <div className="absolute inset-0">
        <div
          className={cn(
            'absolute inset-0 transition-all duration-[1500ms]',
            currentSlide === 0 &&
              'bg-gradient-to-br from-zinc-950 via-zinc-900 to-orange-950/30',
            currentSlide === 1 &&
              'bg-gradient-to-br from-zinc-950 via-stone-900 to-amber-950/30',
            currentSlide === 2 &&
              'bg-gradient-to-br from-zinc-950 via-neutral-900 to-red-950/20',
            currentSlide === 3 &&
              'bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/20'
          )}
        />
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[100px]" />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-4 lg:px-8 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Slide indicator */}
          <div className="flex items-center gap-3 mb-8 animate-fade-in">
            <div className="h-px w-12 bg-accent" />
            <span className="text-xs tracking-[0.3em] text-accent uppercase font-medium">
              {String(currentSlide + 1).padStart(2, '0')} /{' '}
              {String(heroSlides.length).padStart(2, '0')}
            </span>
          </div>

          {/* Title */}
          <h1
            key={`title-${currentSlide}`}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.9] mb-6 animate-slide-up"
          >
            {slide.title.split(' ').map((word, i) => (
              <span
                key={i}
                className={cn(
                  'inline-block mr-4',
                  i === 0 && 'text-gradient'
                )}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            key={`subtitle-${currentSlide}`}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-xl mb-10 animate-slide-up delay-200 opacity-0"
          >
            {slide.subtitle}
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4 animate-slide-up delay-400 opacity-0">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 h-12 text-base group"
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
              className="border-white/10 bg-white/5 hover:bg-white/10 text-white h-12 px-8"
              asChild
            >
              <Link href="/models">View All Models</Link>
            </Button>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-8 left-0 right-0 container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Slide dots */}
            <div className="flex items-center gap-3">
              {heroSlides.map((s, index) => (
                <button
                  key={s.id}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    'relative h-1 rounded-full transition-all duration-500',
                    index === currentSlide
                      ? 'w-12 bg-accent'
                      : 'w-6 bg-white/20 hover:bg-white/40'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="border-white/10 bg-white/5 hover:bg-white/10 text-white h-10 w-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="border-white/10 bg-white/5 hover:bg-white/10 text-white h-10 w-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-600 opacity-0 z-10">
        <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}
