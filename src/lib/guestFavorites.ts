const GUEST_FAVORITES_KEY = "guest_favorites";

function parseIds(raw: string | null): number[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is number => typeof x === "number" && Number.isInteger(x));
  } catch {
    return [];
  }
}

export function getGuestFavorites(): number[] {
  if (typeof window === "undefined") return [];
  return parseIds(window.localStorage.getItem(GUEST_FAVORITES_KEY));
}

export function setGuestFavorites(productIds: number[]): void {
  const ids = [...new Set(productIds)].filter(Number.isInteger);
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GUEST_FAVORITES_KEY, JSON.stringify(ids));
}

export function addGuestFavorite(productId: number): void {
  const ids = getGuestFavorites();
  if (ids.includes(productId)) return;
  setGuestFavorites([...ids, productId]);
}

export function removeGuestFavorite(productId: number): void {
  setGuestFavorites(getGuestFavorites().filter((id) => id !== productId));
}

export function isGuestFavorite(productId: number): boolean {
  return getGuestFavorites().includes(productId);
}

export function clearGuestFavorites(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(GUEST_FAVORITES_KEY);
}
