import { CartView } from '@/components/cart/cart-view';
import { SectionHeading } from '@/components/shared/section-heading';

export const metadata = {
  title: 'Cart',
  description: 'Review genuine Royal Enfield accessories in your cart.',
};

export default function CartPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          label="Cart"
          title="Your accessories"
          description="Review your genuine Royal Enfield gear. Checkout and payment will be available soon."
        />
        <CartView />
      </div>
    </div>
  );
}