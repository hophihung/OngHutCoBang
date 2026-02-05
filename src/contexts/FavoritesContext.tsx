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
  getGuestFavorites,
  setGuestFavorites,
  addGuestFavorite as addGuestFavoriteLib,
  removeGuestFavorite as removeGuestFavoriteLib,
  clearGuestFavorites,
} from "@/lib/guestFavorites";

type FavoritesContextValue = {
  favoriteProductIds: number[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (productId: number) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteProductIds, setFavoriteProductIds] = useState<number[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      const id = session?.user?.id ?? null;
      setUserId(id);
      if (id) {
        supabase
          .from("wishlist")
          .select("product_id")
          .eq("user_id", id)
          .then(({ data }) => {
            setFavoriteProductIds((data ?? []).map((r) => r.product_id as number));
          });
      } else {
        setFavoriteProductIds(getGuestFavorites());
      }
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const id = session?.user?.id ?? null;
      setUserId(id);
      if (id) {
        const guestIds = getGuestFavorites();
        const fetchWishlist = () =>
          supabase
            .from("wishlist")
            .select("product_id")
            .eq("user_id", id)
            .then(({ data }) => {
              setFavoriteProductIds((data ?? []).map((r) => r.product_id as number));
            });
        if (guestIds.length > 0) {
          Promise.all(
            guestIds.map((product_id) =>
              supabase.from("wishlist").upsert(
                { user_id: id, product_id },
                { onConflict: "user_id,product_id" }
              )
            )
          ).then(() => {
            clearGuestFavorites();
            fetchWishlist();
          });
        } else {
          fetchWishlist();
        }
      } else {
        setFavoriteProductIds(getGuestFavorites());
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const isFavorite = useCallback(
    (productId: number) => favoriteProductIds.includes(productId),
    [favoriteProductIds]
  );

  const toggleFavorite = useCallback(
    (productId: number) => {
      if (userId) {
        const isCurrently = favoriteProductIds.includes(productId);
        if (isCurrently) {
          createClient()
            .from("wishlist")
            .delete()
            .eq("user_id", userId)
            .eq("product_id", productId)
            .then(() => {
              setFavoriteProductIds((prev) => prev.filter((id) => id !== productId));
            });
        } else {
          createClient()
            .from("wishlist")
            .insert({ user_id: userId, product_id: productId })
            .then(() => {
              setFavoriteProductIds((prev) => [...prev, productId]);
            });
        }
      } else {
        const isCurrently = favoriteProductIds.includes(productId);
        if (isCurrently) {
          removeGuestFavoriteLib(productId);
          setFavoriteProductIds(getGuestFavorites());
        } else {
          addGuestFavoriteLib(productId);
          setFavoriteProductIds(getGuestFavorites());
        }
      }
    },
    [userId, favoriteProductIds]
  );

  return (
    <FavoritesContext.Provider
      value={{ favoriteProductIds, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
