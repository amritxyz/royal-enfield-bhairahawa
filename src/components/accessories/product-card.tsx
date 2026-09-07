'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QuantityControls } from '@/components/accessories/quantity-controls';
import { useCart } from '@/hooks/use-cart';
import type { Accessory } from '@/lib/types';
import { formatNpr } from '@/lib/utils';

export function ProductCard({ accessory }: { accessory: Accessory }) {
  const { addItem, getQuantity, increment, decrement } = useCart();
  const quantity = getQuantity(accessory.id);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(accessory);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Card className="group relative bg-card border border-border hover:border-accent/60 transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between">
      <div>
        <Link href={`/accessories/${accessory.id}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#181818] border-b border-border/60">
            <Image
              src={accessory.image}
              alt={accessory.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <Badge className="absolute top-3 left-3 bg-black/80 text-accent border border-accent/30 text-[10px] font-heading uppercase tracking-wider font-bold rounded-sm">
              {accessory.category}
            </Badge>
          </div>
        </Link>

        <CardContent className="p-5">
          <Link href={`/accessories/${accessory.id}`}>
            <h3 className="font-heading text-lg font-bold uppercase text-white mb-1 group-hover:text-accent transition-colors tracking-wide">
              {accessory.name}
            </h3>
          </Link>
          <p className="text-xs text-zinc-400 mb-3 line-clamp-2 leading-relaxed">
            {accessory.details}
          </p>
          <p className="font-heading text-lg font-bold text-accent">
            {formatNpr(accessory.price)}
          </p>
        </CardContent>
      </div>

      <div className="p-5 pt-0 mt-auto">
        {quantity > 0 ? (
          <div className="flex items-center justify-between gap-3">
            <QuantityControls
              quantity={quantity}
              onDecrement={() => decrement(accessory.id)}
              onIncrement={() => increment(accessory.id)}
            />
            <Link
              href="/cart"
              className="font-heading text-xs uppercase tracking-wider text-zinc-400 hover:text-accent transition-colors font-medium"
            >
              View Cart →
            </Link>
          </div>
        ) : (
          <Button
            type="button"
            className="w-full bg-accent hover:bg-accent/90 text-white font-heading uppercase tracking-wider font-bold text-xs"
            onClick={handleAdd}
          >
            <ShoppingBag className="w-3.5 h-3.5 mr-2" />
            {added ? 'Added to Cart' : 'Add to Cart'}
          </Button>
        )}
      </div>
    </Card>
  );
}