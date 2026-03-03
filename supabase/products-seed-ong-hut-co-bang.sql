-- Chạy trong Supabase SQL Editor.
-- Thêm 4 sản phẩm ống hút cỏ bàng (products + product_variants).

-- 1. ỐNG HÚT CỎ BÀNG SIZE NHỎ (LẺ) - 50 ống/hộp - 29.000 đ
INSERT INTO public.products (name, description, is_active)
VALUES (
  'ỐNG HÚT CỎ BÀNG SIZE NHỎ (LẺ)',
  'Đường kính khoảng 3-4.5mm. Độ dài: 200mm.',
  true
);
INSERT INTO public.product_variants (product_id, sku, variant_name, price, stock_quantity)
VALUES (
  (SELECT id FROM public.products WHERE name = 'ỐNG HÚT CỎ BÀNG SIZE NHỎ (LẺ)' LIMIT 1),
  'OHCB-NHO-LE',
  '50 ống/ 1 hộp',
  29000,
  100
);

-- 2. ỐNG HÚT CỎ BÀNG SIZE LỚN (LẺ) - 30 ống/hộp - 19.000 đ
INSERT INTO public.products (name, description, is_active)
VALUES (
  'ỐNG HÚT CỎ BÀNG SIZE LỚN (LẺ)',
  'Đường kính khoảng 4.5-6 mm. Độ dài: 200mm.',
  true
);
INSERT INTO public.product_variants (product_id, sku, variant_name, price, stock_quantity)
VALUES (
  (SELECT id FROM public.products WHERE name = 'ỐNG HÚT CỎ BÀNG SIZE LỚN (LẺ)' LIMIT 1),
  'OHCB-LON-LE',
  '30 ống/ 1 hộp',
  19000,
  100
);

-- 3. ỐNG HÚT CỎ BÀNG SIZE NHỎ (SỈ) - 1000 ống/túi - 350.000 đ
INSERT INTO public.products (name, description, is_active)
VALUES (
  'ỐNG HÚT CỎ BÀNG SIZE NHỎ (SỈ)',
  'Đường kính khoảng 3-4.5mm. Độ dài: 200mm.',
  true
);
INSERT INTO public.product_variants (product_id, sku, variant_name, price, stock_quantity)
VALUES (
  (SELECT id FROM public.products WHERE name = 'ỐNG HÚT CỎ BÀNG SIZE NHỎ (SỈ)' LIMIT 1),
  'OHCB-NHO-SI',
  '1000 ống/ 1 túi',
  350000,
  50
);

-- 4. ỐNG HÚT CỎ BÀNG SIZE LỚN (SỈ) - 1000 ống/túi - 400.000 đ
INSERT INTO public.products (name, description, is_active)
VALUES (
  'ỐNG HÚT CỎ BÀNG SIZE LỚN (SỈ)',
  'Đường kính khoảng 4.5-6 mm. Độ dài: 200mm.',
  true
);
INSERT INTO public.product_variants (product_id, sku, variant_name, price, stock_quantity)
VALUES (
  (SELECT id FROM public.products WHERE name = 'ỐNG HÚT CỎ BÀNG SIZE LỚN (SỈ)' LIMIT 1),
  'OHCB-LON-SI',
  '1000 ống/ 1 túi',
  400000,
  50
);
