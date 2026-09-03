'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { QuantityControls } from '@/components/accessories/quantity-controls';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import type { Accessory } from '@/lib/types';

export function AccessoryProductActions({ accessory }: { accessory: Accessory }) {
  const { addItem, getQuantity, increment, decrement } = useCart();
  const quantity = getQuantity(accessory.id);

  if (quantity > 0) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        <QuantityControls
          quantity={quantity}
          onDecrement={() => decrement(accessory.id)}
          onIncrement={() => increment(accessory.id)}
        />
        <Button
          variant="outline"
          className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          asChild
        >
          <Link href="/cart">Go to cart</Link>
        </Button>
      </div>
    );
  }

  return (
    <Button
      type="button"
      size="lg"
      className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12 px-8"
      onClick={() => addItem(accessory)}
    >
      <ShoppingBag className="w-4 h-4 mr-2" />
      Add to cart
    </Button>
  );
}