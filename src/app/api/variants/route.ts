import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export type VariantDetail = {
  variant_id: number;
  name: string;
  price: number;
  image: string | null;
};

export async function GET(req: NextRequest) {
  try {
    const idsParam = req.nextUrl.searchParams.get("ids");
    if (!idsParam?.trim()) {
      return NextResponse.json([]);
    }
    const ids = idsParam
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => Number.isFinite(n));
    if (ids.length === 0) return NextResponse.json([]);

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("product_variants")
      .select("id, price, variant_name, image_url, products(name, base_image_url)")
      .in("id", ids);

    if (error) {
      console.error("[api/variants]", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    type VariantRow = {
      id: number;
      price: number | string;
      variant_name: string | null;
      image_url: string | null;
      products: { name: string; base_image_url: string | null } | null;
    };
    const rows = (data ?? []) as unknown as VariantRow[];

    const result: VariantDetail[] = rows.map((r) => {
      const product = Array.isArray(r.products) ? r.products[0] : r.products;
      return {
        variant_id: r.id,
        name: product?.name ?? r.variant_name ?? "Product",
        price: Number(r.price ?? 0),
        image: r.image_url ?? product?.base_image_url ?? null,
      };
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("[api/variants]", err);
    return NextResponse.json(
      { error: "Lỗi lấy thông tin biến thể" },
      { status: 500 }
    );
  }
}
