-- Chạy trong Supabase SQL Editor.
-- XÓA TẤT CẢ SẢN PHẨM (products) và biến thể (product_variants).
-- Thứ tự bắt buộc do khóa ngoại:
--   cart_items.variant_id → product_variants
--   order_items.variant_id → product_variants
--   product_variants.product_id → products
-- Wishlist có ON DELETE CASCADE với products → sẽ tự xóa theo.

-- Xóa theo thứ tự (chạy lần lượt hoặc chạy cả block):

DELETE FROM public.cart_items;
DELETE FROM public.order_items;
DELETE FROM public.product_variants;
DELETE FROM public.products;

-- Reset identity (tùy chọn): để id tự tăng lại từ 1 sau khi xóa hết
-- ALTER SEQUENCE public.products_id_seq RESTART WITH 1;
-- ALTER SEQUENCE public.product_variants_id_seq RESTART WITH 1;
