'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { QuantityControls } from '@/components/accessories/quantity-controls';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { formatNpr } from '@/lib/utils';

export function CartView() {
  const {
    items,
    itemCount,
    subtotal,
    hydrated,
    increment,
    decrement,
    removeItem,
    clear,
  } = useCart();

  if (!hydrated) {
    return (
      <div className="bg-card border border-border rounded-sm p-10 text-center text-muted-foreground">
        Loading cart...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-card border border-border rounded-sm p-12 text-center">
        <ShoppingBag className="w-10 h-10 text-accent mx-auto mb-4" />
        <h3 className="text-xl font-heading font-bold uppercase text-white mb-2">Your Cart is Empty</h3>
        <p className="text-xs text-zinc-400 mb-6">
          Browse genuine Royal Enfield accessories and gear for your ride.
        </p>
        <Button
          className="bg-accent hover:bg-accent/90 text-white font-heading uppercase tracking-wider font-bold"
          asChild
        >
          <Link href="/accessories">Explore Accessories</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-card border border-border rounded-sm p-4 sm:p-5 flex gap-4"
          >
            <Link
              href={`/accessories/${item.id}`}
              className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-sm bg-[#181818] border border-border"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="112px"
                className="object-cover"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-heading text-[10px] tracking-[0.2em] text-accent uppercase mb-1 font-semibold">
                    {item.category}
                  </p>
                  <Link
                    href={`/accessories/${item.id}`}
                    className="text-white font-heading text-lg font-bold uppercase hover:text-accent transition-colors tracking-wide"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-zinc-400 mt-1">
                    {formatNpr(item.price)} each
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-zinc-500 hover:text-destructive"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <QuantityControls
                  quantity={item.quantity}
                  onDecrement={() => decrement(item.id)}
                  onIncrement={() => increment(item.id)}
                />
                <p className="font-heading text-base font-bold text-white">
                  {formatNpr(item.price * item.quantity)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="bg-card border border-border rounded-sm p-6 h-fit lg:sticky lg:top-28">
        <h3 className="font-heading text-lg font-bold uppercase text-white mb-4 tracking-wider flex items-center gap-2">
          <span className="w-1.5 h-3 bg-accent" />
          Order Summary
        </h3>
        <div className="flex items-center justify-between text-xs font-heading uppercase text-zinc-400 mb-2">
          <span>Total Items</span>
          <span className="text-white font-bold">{itemCount}</span>
        </div>
        <div className="flex items-center justify-between mb-6 pt-3 border-t border-border">
          <span className="font-heading text-xs uppercase text-zinc-400">Subtotal</span>
          <span className="font-heading text-2xl font-bold text-accent">
            {formatNpr(subtotal)}
          </span>
        </div>
        <Button
          size="lg"
          disabled
          className="w-full bg-accent/60 text-white font-heading uppercase tracking-wider font-bold h-12 mb-3"
        >
          Checkout Coming Soon
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full border-border bg-secondary text-white font-heading uppercase tracking-wider text-xs hover:border-accent"
          onClick={clear}
        >
          Clear Cart
        </Button>
        <p className="text-[11px] text-zinc-500 mt-4 text-center">
          Cart is saved locally on your device.
        </p>
      </aside>
    </div>
  );
}