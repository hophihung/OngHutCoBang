import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export type ProductSummary = {
  id: number;
  name: string;
  base_image_url: string | null;
  price: number;
  default_variant_id: number | null;
};

export async function GET(req: NextRequest) {
  try {
    const idsParam = req.nextUrl.searchParams.get("ids");
    if (!idsParam?.trim()) return NextResponse.json([]);
    const ids = idsParam
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => Number.isFinite(n));
    if (ids.length === 0) return NextResponse.json([]);

    const supabase = await createClient();
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, name, base_image_url")
      .in("id", ids)
      .eq("is_active", true);

    if (productsError || !products?.length) return NextResponse.json([]);

    const productIds = products.map((p) => p.id);
    const { data: variants } = await supabase
      .from("product_variants")
      .select("id, product_id, price")
      .in("product_id", productIds);

    const minPriceByProduct: Record<number, number> = {};
    const firstVariantIdByProduct: Record<number, number> = {};
    variants?.forEach((v) => {
      const pid = v.product_id;
      const price = Number(v.price ?? 0);
      if (minPriceByProduct[pid] == null || price < minPriceByProduct[pid])
        minPriceByProduct[pid] = price;
      if (firstVariantIdByProduct[pid] == null) firstVariantIdByProduct[pid] = v.id;
    });

    const result: ProductSummary[] = products.map((p) => ({
      id: p.id,
      name: p.name,
      base_image_url: p.base_image_url ?? null,
      price: minPriceByProduct[p.id] ?? 0,
      default_variant_id: firstVariantIdByProduct[p.id] ?? null,
    }));

    return NextResponse.json(result);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
