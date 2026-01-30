-- Run in Supabase SQL Editor AFTER src/sql and rls-patches.sql.
-- RLS cho admin (products, product_variants, categories) và Storage policy cho product-images.
--
-- Trước khi upload ảnh: tạo bucket trong Supabase Dashboard -> Storage -> New bucket,
-- id = "product-images", chọn Public nếu muốn URL ảnh public.
--
-- Gán quyền admin: UPDATE public.profiles SET role = 'admin' WHERE id = '<user_uuid>';

-- 1. Products: Admin được INSERT/UPDATE/DELETE; public giữ SELECT
CREATE POLICY "Admin full access products" ON public.products
  FOR ALL TO authenticated
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 2. product_variants: Bật RLS, public đọc, admin full
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public view product_variants" ON public.product_variants
  FOR SELECT USING (true);

CREATE POLICY "Admin full access product_variants" ON public.product_variants
  FOR ALL TO authenticated
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 3. categories: Bật RLS, public đọc, admin full
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public view categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Admin full access categories" ON public.categories
  FOR ALL TO authenticated
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 4. Storage: policy cho bucket product-images (tạo bucket trong Dashboard: Storage -> New bucket, id = product-images, public nếu cần)
-- Cho phép authenticated upload và đọc object trong bucket product-images
DROP POLICY IF EXISTS "Authenticated upload product-images" ON storage.objects;
CREATE POLICY "Authenticated upload product-images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Public read product-images" ON storage.objects;
CREATE POLICY "Public read product-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');
