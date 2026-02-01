"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { getCartId, clearCart } from "@/lib/cart";

/**
 * When URL has payos=success (redirect from PayOS after payment), clear the user's cart
 * once and replace URL to /tai-khoan/don-hang (no query) to avoid clearing again on refresh.
 */
export default function ClearCartOnPayOSSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setCartCount } = useCart();
  const clearedRef = useRef(false);

  useEffect(() => {
    if (searchParams.get("payos") !== "success" || clearedRef.current) return;
    clearedRef.current = true;

    (async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) {
        router.replace("/tai-khoan/don-hang");
        return;
      }
      const cartId = await getCartId(session.user.id);
      if (cartId) await clearCart(cartId);
      setCartCount(0);
      router.replace("/tai-khoan/don-hang");
    })();
  }, [searchParams, router, setCartCount]);

  return null;
}
