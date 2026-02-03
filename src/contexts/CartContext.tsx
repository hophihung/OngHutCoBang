"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import {
  getOrCreateCart,
  addCartItem as addCartItemLib,
  getCartCount,
} from "@/lib/cart";
import {
  getGuestCart,
  getGuestCartCount,
  addToGuestCart as addToGuestCartLib,
  clearGuestCart,
} from "@/lib/guestCart";

type CartContextValue = {
  cartCount: number;
  setCartCount: (n: number) => void;
  addToCart: (variantId: number, quantity: number) => Promise<{ error: string | null }>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      const id = session?.user?.id ?? null;
      setUserId(id);
      if (id) {
        getCartCount(id).then(setCartCount);
      } else {
        setCartCount(getGuestCartCount());
      }
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const id = session?.user?.id ?? null;
      setUserId(id);
      if (id) {
        const guestItems = getGuestCart();
        if (guestItems.length > 0) {
          getOrCreateCart(id).then((cartId) => {
            if (cartId) {
              guestItems.forEach(({ variantId, quantity }) => {
                addCartItemLib(cartId, variantId, quantity);
              });
              clearGuestCart();
            }
            getCartCount(id).then(setCartCount);
          });
        } else {
          getCartCount(id).then(setCartCount);
        }
      } else {
        setCartCount(getGuestCartCount());
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const addToCart = useCallback(
    async (variantId: number, quantity: number): Promise<{ error: string | null }> => {
      if (userId) {
        const cartId = await getOrCreateCart(userId);
        if (!cartId) return { error: "Không tạo được giỏ hàng" };
        const { error } = await addCartItemLib(cartId, variantId, quantity);
        if (error) return { error };
        const count = await getCartCount(userId);
        setCartCount(count);
        return { error: null };
      }
      const count = addToGuestCartLib(variantId, quantity);
      setCartCount(count);
      return { error: null };
    },
    [userId]
  );

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
