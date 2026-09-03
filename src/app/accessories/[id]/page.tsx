import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { AccessoryProductActions } from '@/components/accessories/product-actions';
import { Badge } from '@/components/ui/badge';
import {
  accessoryCategorySlugs,
  accessories,
  getAccessory,
} from '@/lib/constants/accessories';
import { formatNpr } from '@/lib/utils';

export function generateStaticParams() {
  return accessories.map((accessory) => ({ id: accessory.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const accessory = getAccessory(id);
  if (!accessory) {
    return { title: 'Accessories' };
  }
  return {
    title: accessory.name,
    description: accessory.details,
  };
}

export default async function AccessoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categoryFromSlug = accessoryCategorySlugs[id];
  if (categoryFromSlug) {
    redirect(`/accessories?category=${encodeURIComponent(categoryFromSlug)}`);
  }

  const accessory = getAccessory(id);
  if (!accessory) notFound();

  return (
    <div className="pt-24 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <Link
          href="/accessories"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All accessories
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-zinc-800 to-zinc-900">
            <Image
              src={accessory.image}
              alt={accessory.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div>
            <Badge className="bg-accent/10 text-accent border-accent/20 text-[10px] font-bold tracking-wider mb-4">
              {accessory.category}
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {accessory.name}
            </h1>
            <p className="text-2xl font-semibold text-accent mb-6">
              {formatNpr(accessory.price)}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {accessory.details}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {accessory.description}
            </p>
            <AccessoryProductActions accessory={accessory} />
          </div>
        </div>
      </div>
    </div>
  );
}