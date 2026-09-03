'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
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

let cartItems: CartItem[] = [];
const emptyCart: CartItem[] = [];
let loadedFromStorage = false;
const listeners = new Set<() => void>();

function readCartSnapshot(): CartItem[] {
  if (!loadedFromStorage && typeof window !== 'undefined') {
    cartItems = parseStoredCart(window.localStorage.getItem(CART_STORAGE_KEY));
    loadedFromStorage = true;
  }
  return cartItems;
}

function readCartServerSnapshot(): CartItem[] {
  return emptyCart;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function emitChange() {
  for (const listener of listeners) listener();
}

function persist() {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
}

function updateCart(updater: (current: CartItem[]) => CartItem[]) {
  cartItems = updater(cartItems);
  persist();
  emitChange();
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(
    subscribe,
    readCartSnapshot,
    readCartServerSnapshot
  );

  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const addItem = useCallback((accessory: Accessory, quantity = 1) => {
    updateCart((current) => {
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
    updateCart((current) => current.filter((item) => item.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      updateCart((current) => current.filter((item) => item.id !== id));
      return;
    }
    updateCart((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: clampQuantity(quantity) } : item
      )
    );
  }, []);

  const increment = useCallback((id: string) => {
    updateCart((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: clampQuantity(item.quantity + 1) }
          : item
      )
    );
  }, []);

  const decrement = useCallback((id: string) => {
    updateCart((current) =>
      current.flatMap((item) => {
        if (item.id !== id) return [item];
        if (item.quantity <= 1) return [];
        return [{ ...item, quantity: item.quantity - 1 }];
      })
    );
  }, []);

  const clear = useCallback(() => {
    updateCart(() => []);
  }, []);

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