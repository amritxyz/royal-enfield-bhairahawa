// src/components/shared/animated-text.tsx
'use client';

import { type ElementType, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimatedTextTag = 'h1' | 'h2' | 'h3' | 'p' | 'span';

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: AnimatedTextTag;
}

export function AnimatedText({
  text,
  className,
  as: Tag = 'span',
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as ElementType;

  return (
    <Component ref={ref} className={cn(className)}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          className={cn(
            'inline-block transition-all duration-700',
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          )}
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          {word}&nbsp;
        </span>
      ))}
    </Component>
  );
}
