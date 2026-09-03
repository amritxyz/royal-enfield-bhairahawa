'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { ProductCard } from '@/components/accessories/product-card';
import { Input } from '@/components/ui/input';
import { accessories, accessoryCategories } from '@/lib/constants/accessories';
import type { AccessoryCategory } from '@/lib/types';
import { cn } from '@/lib/utils';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A–Z' },
];

export function AccessoriesCatalog({
  initialCategory,
  initialQuery,
}: {
  initialCategory?: string;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery ?? '');
  const [category, setCategory] = useState<AccessoryCategory | 'All'>(
    accessoryCategories.includes(initialCategory as AccessoryCategory)
      ? (initialCategory as AccessoryCategory)
      : 'All'
  );
  const [sort, setSort] = useState<SortOption>('featured');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const next = accessories.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const matchesQuery =
        !needle ||
        item.name.toLowerCase().includes(needle) ||
        item.category.toLowerCase().includes(needle) ||
        item.details.toLowerCase().includes(needle) ||
        item.description.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });

    const sorted = [...next];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [category, query, sort]);

  return (
    <div className="mt-12">
      <div className="glass rounded-2xl p-4 lg:p-5 mb-8 sticky top-20 z-20">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search helmets, luggage, guards..."
              className="pl-10 h-11 py-0"
              aria-label="Search accessories"
            />
          </div>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="h-11 px-4 bg-secondary/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors lg:w-56"
            aria-label="Sort accessories"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {(['All', ...accessoryCategories] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-colors',
                category === item
                  ? 'bg-accent text-accent-foreground border-accent'
                  : 'border-white/10 text-muted-foreground hover:text-white hover:border-white/20'
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
      </p>

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-white font-medium mb-2">No matching accessories</p>
          <p className="text-sm text-muted-foreground">
            Try a different search or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((accessory) => (
            <ProductCard key={accessory.id} accessory={accessory} />
          ))}
        </div>
      )}
    </div>
  );
}