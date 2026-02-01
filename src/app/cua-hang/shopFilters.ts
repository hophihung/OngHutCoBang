export type ShopParams = {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
  sort?: string;
  page?: string;
};

const SHOP_PARAM_KEYS: (keyof ShopParams)[] = [
  "category",
  "minPrice",
  "maxPrice",
  "inStock",
  "sort",
  "page",
];

/**
 * Build query string for /cua-hang from current params and overrides.
 */
export function buildShopQuery(
  current: ShopParams,
  overrides: Partial<ShopParams> = {}
): string {
  const merged = { ...current, ...overrides };
  const search = new URLSearchParams();
  SHOP_PARAM_KEYS.forEach((key) => {
    const v = merged[key];
    if (v != null && v !== "") search.set(key, String(v));
  });
  const q = search.toString();
  return q ? `?${q}` : "";
}

export function parseShopParams(
  raw: Record<string, string | string[] | undefined>
): ShopParams {
  const get = (k: keyof ShopParams) => {
    const v = raw[k];
    if (v == null) return undefined;
    return Array.isArray(v) ? v[0] : v;
  };
  return {
    category: get("category"),
    minPrice: get("minPrice"),
    maxPrice: get("maxPrice"),
    inStock: get("inStock"),
    sort: get("sort"),
    page: get("page"),
  };
}
