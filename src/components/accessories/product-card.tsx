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
    <Card className="group relative bg-secondary/50 border-white/5 hover:border-accent/30 transition-all duration-500 overflow-hidden">
      <Link href={`/accessories/${accessory.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
          <Image
            src={accessory.image}
            alt={accessory.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
          <Badge className="absolute top-3 left-3 bg-accent/10 text-accent border-accent/20 text-[10px] font-bold tracking-wider">
            {accessory.category}
          </Badge>
        </div>
      </Link>

      <CardContent className="p-5">
        <Link href={`/accessories/${accessory.id}`}>
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent transition-colors">
            {accessory.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {accessory.details}
        </p>
        <p className="text-base font-semibold text-accent mb-4">
          {formatNpr(accessory.price)}
        </p>

        {quantity > 0 ? (
          <div className="flex items-center justify-between gap-3">
            <QuantityControls
              quantity={quantity}
              onDecrement={() => decrement(accessory.id)}
              onIncrement={() => increment(accessory.id)}
            />
            <Link
              href="/cart"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              View cart
            </Link>
          </div>
        ) : (
          <Button
            type="button"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            onClick={handleAdd}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            {added ? 'Added' : 'Add to cart'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}