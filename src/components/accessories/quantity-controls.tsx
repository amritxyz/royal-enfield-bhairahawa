'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function QuantityControls({
  quantity,
  onDecrement,
  onIncrement,
  className,
}: {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5',
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-muted-foreground hover:text-white"
        onClick={onDecrement}
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </Button>
      <span className="min-w-6 text-center text-sm font-medium text-white">
        {quantity}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-muted-foreground hover:text-white"
        onClick={onIncrement}
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}