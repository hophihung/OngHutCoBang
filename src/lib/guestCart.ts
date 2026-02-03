const GUEST_CART_KEY = "guest_cart";

export type GuestCartItem = { variantId: number; quantity: number };

function parseGuestCart(raw: string | null): GuestCartItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is GuestCartItem =>
        typeof x === "object" &&
        x != null &&
        typeof (x as GuestCartItem).variantId === "number" &&
        typeof (x as GuestCartItem).quantity === "number"
    );
  } catch {
    return [];
  }
}

export function getGuestCart(): GuestCartItem[] {
  if (typeof window === "undefined") return [];
  return parseGuestCart(window.localStorage.getItem(GUEST_CART_KEY));
}

export function setGuestCart(items: GuestCartItem[]): number {
  const filtered = items.filter((i) => i.quantity > 0);
  const toStore = JSON.stringify(filtered);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(GUEST_CART_KEY, toStore);
  }
  return filtered.reduce((sum, i) => sum + i.quantity, 0);
}

export function getGuestCartCount(): number {
  return getGuestCart().reduce((sum, i) => sum + i.quantity, 0);
}

/**
 * Add or merge quantity for a variant in guest cart. Returns new total quantity.
 */
export function addToGuestCart(variantId: number, quantity: number): number {
  const items = getGuestCart();
  const existing = items.find((i) => i.variantId === variantId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ variantId, quantity });
  }
  return setGuestCart(items);
}

export function clearGuestCart(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(GUEST_CART_KEY);
  }
}
