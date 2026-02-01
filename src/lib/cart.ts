import { createClient } from "@/lib/supabase/client";

export type CartItemRow = {
  id: number;
  cart_id: number;
  variant_id: number;
  quantity: number;
  product_variants: {
    id: number;
    price: number;
    variant_name: string | null;
    product_id: number;
    image_url: string | null;
    products: { name: string; base_image_url: string | null } | null;
  } | null;
};

export type CartItemDisplay = {
  id: number;
  variant_id: number;
  quantity: number;
  name: string;
  price: number;
  image: string | null;
};

/**
 * Get existing cart for user or create one. Returns cart id.
 */
export async function getOrCreateCart(userId: string): Promise<number | null> {
  const supabase = createClient();
  const { data: existing } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing?.id) return existing.id as number;

  const { data: inserted, error } = await supabase
    .from("carts")
    .insert({ user_id: userId })
    .select("id")
    .single();

  if (error || !inserted?.id) return null;
  return inserted.id as number;
}

/**
 * Get cart id for user without creating. Returns null if no cart.
 */
export async function getCartId(userId: string): Promise<number | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();
  return data?.id ?? null;
}

/**
 * Fetch cart items with product/variant details for display and PayOS.
 */
export async function getCartItems(cartId: number): Promise<CartItemDisplay[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      "id, variant_id, quantity, product_variants(id, price, variant_name, product_id, image_url, products(name, base_image_url))"
    )
    .eq("cart_id", cartId);

  if (error || !data) return [];

  return (data as CartItemRow[]).map((row) => {
    const v = row.product_variants;
    const name = v?.products?.name ?? v?.variant_name ?? "Product";
    const price = Number(v?.price ?? 0);
    const image =
      v?.image_url ?? v?.products?.base_image_url ?? null;
    return {
      id: row.id,
      variant_id: row.variant_id,
      quantity: row.quantity,
      name,
      price,
      image,
    };
  });
}

/**
 * Add or merge quantity for a variant in the cart.
 */
export async function addCartItem(
  cartId: number,
  variantId: number,
  quantity: number
): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { data: existing } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cartId)
    .eq("variant_id", variantId)
    .maybeSingle();

  if (existing?.id) {
    const newQty = (existing.quantity ?? 0) + quantity;
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQty })
      .eq("id", existing.id);
    return { error: error?.message ?? null };
  }

  const { error } = await supabase.from("cart_items").insert({
    cart_id: cartId,
    variant_id: variantId,
    quantity,
  });
  return { error: error?.message ?? null };
}

/**
 * Update cart item quantity. Remove if quantity <= 0.
 */
export async function updateCartItemQuantity(
  cartItemId: number,
  quantity: number
): Promise<{ error: string | null }> {
  const supabase = createClient();
  if (quantity <= 0) {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", cartItemId);
    return { error: error?.message ?? null };
  }
  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", cartItemId);
  return { error: error?.message ?? null };
}

/**
 * Remove a cart item by id.
 */
export async function removeCartItem(
  cartItemId: number
): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId);
  return { error: error?.message ?? null };
}

/**
 * Total quantity of items in user's cart. Returns 0 if no cart or not found.
 */
export async function getCartCount(userId: string): Promise<number> {
  const cartId = await getCartId(userId);
  if (!cartId) return 0;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("cart_id", cartId);

  if (error || !data) return 0;
  return (data as { quantity: number }[]).reduce((sum, r) => sum + (r.quantity ?? 0), 0);
}
