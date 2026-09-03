// src/app/accessories/page.tsx
import { AccessoriesCatalog } from '@/components/accessories/accessories-catalog';
import { SectionHeading } from '@/components/shared/section-heading';
import { accessoryCategories } from '@/lib/constants/accessories';
import type { AccessoryCategory } from '@/lib/types';

export const metadata = {
  title: 'Accessories',
  description: 'Explore genuine Royal Enfield accessories and gear to customize your motorcycle.',
};

export default async function AccessoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const initialCategory = accessoryCategories.includes(
    params.category as AccessoryCategory
  )
    ? params.category
    : undefined;

  return (
    <div className="pt-24 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          label="Accessories"
          title="Genuine Royal Enfield Accessories"
          description="Customize your motorcycle with authentic accessories designed to enhance performance, comfort, and style."
          align="center"
        />

        <AccessoriesCatalog
          initialCategory={initialCategory}
          initialQuery={params.q}
        />
      </div>
    </div>
  );
}
