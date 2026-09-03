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
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-8 bg-accent" />
        <span className="text-xs tracking-[0.3em] text-accent uppercase font-medium">
          {label}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-lg max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
