// src/components/shared/section-heading.tsx
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' && 'text-center flex flex-col items-center'
      )}
    >
      <div className="inline-flex items-center gap-2.5 mb-3 px-2.5 py-1 bg-accent/10 border border-accent/20 rounded-sm">
        <span className="w-1.5 h-1.5 bg-accent" />
        <span className="text-[11px] tracking-[0.25em] text-accent uppercase font-heading font-semibold">
          {label}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold uppercase text-white tracking-wide mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
