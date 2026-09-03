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
      <div className="glass rounded-2xl p-10 text-center text-muted-foreground">
        Loading cart...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <ShoppingBag className="w-10 h-10 text-accent mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Your cart is empty</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Browse genuine accessories and add them to your cart.
        </p>
        <Button
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          asChild
        >
          <Link href="/accessories">Shop accessories</Link>
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
            className="glass rounded-2xl p-4 sm:p-5 flex gap-4"
          >
            <Link
              href={`/accessories/${item.id}`}
              className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-xl bg-zinc-900"
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
                  <p className="text-[10px] tracking-[0.2em] text-accent uppercase mb-1">
                    {item.category}
                  </p>
                  <Link
                    href={`/accessories/${item.id}`}
                    className="text-white font-semibold hover:text-accent transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatNpr(item.price)}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
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
                <p className="text-sm font-semibold text-white">
                  {formatNpr(item.price * item.quantity)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="glass rounded-2xl p-6 h-fit lg:sticky lg:top-28">
        <h3 className="text-lg font-bold text-white mb-4">Order summary</h3>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Items</span>
          <span className="text-white">{itemCount}</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-xl font-semibold text-accent">
            {formatNpr(subtotal)}
          </span>
        </div>
        <Button
          size="lg"
          disabled
          className="w-full bg-accent/60 text-accent-foreground font-semibold h-12 mb-3"
        >
          Checkout coming soon
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10"
          onClick={clear}
        >
          Clear cart
        </Button>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Your cart is saved on this device. Payment is not enabled yet.
        </p>
      </aside>
    </div>
  );
}