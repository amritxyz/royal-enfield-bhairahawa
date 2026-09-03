'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CART_MAX_QUANTITY, CART_STORAGE_KEY } from '@/lib/constants/accessories';
import type { Accessory, CartItem } from '@/lib/types';

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  hydrated: boolean;
  addItem: (accessory: Accessory, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
  getQuantity: (id: string) => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function clampQuantity(value: number) {
  return Math.max(1, Math.min(CART_MAX_QUANTITY, Math.floor(value)));
}

function parseStoredCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => {
        if (
          !item ||
          typeof item !== 'object' ||
          typeof (item as CartItem).id !== 'string' ||
          typeof (item as CartItem).name !== 'string' ||
          typeof (item as CartItem).price !== 'number'
        ) {
          return null;
        }
        const cartItem = item as CartItem;
        return {
          id: cartItem.id,
          name: cartItem.name,
          category: cartItem.category,
          price: cartItem.price,
          image: cartItem.image,
          quantity: clampQuantity(Number(cartItem.quantity) || 1),
        };
      })
      .filter((item): item is CartItem => item !== null);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(parseStoredCart(window.localStorage.getItem(CART_STORAGE_KEY)));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((accessory: Accessory, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === accessory.id);
      if (existing) {
        return current.map((item) =>
          item.id === accessory.id
            ? { ...item, quantity: clampQuantity(item.quantity + quantity) }
            : item
        );
      }
      return [
        ...current,
        {
          id: accessory.id,
          name: accessory.name,
          category: accessory.category,
          price: accessory.price,
          image: accessory.image,
          quantity: clampQuantity(quantity),
        },
      ];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((current) => current.filter((item) => item.id !== id));
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: clampQuantity(quantity) } : item
      )
    );
  }, []);

  const increment = useCallback((id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: clampQuantity(item.quantity + 1) }
          : item
      )
    );
  }, []);

  const decrement = useCallback((id: string) => {
    setItems((current) =>
      current.flatMap((item) => {
        if (item.id !== id) return [item];
        if (item.quantity <= 1) return [];
        return [{ ...item, quantity: item.quantity - 1 }];
      })
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const getQuantity = useCallback(
    (id: string) => items.find((item) => item.id === id)?.quantity ?? 0,
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      hydrated,
      addItem,
      removeItem,
      setQuantity,
      increment,
      decrement,
      clear,
      getQuantity,
    }),
    [
      items,
      itemCount,
      subtotal,
      hydrated,
      addItem,
      removeItem,
      setQuantity,
      increment,
      decrement,
      clear,
      getQuantity,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}