-- Chạy trong Supabase SQL Editor để cho phép trang chủ và checkout đọc coupon đang active.
-- Sau khi chạy, http://localhost:3000/ sẽ lấy được danh sách coupon từ DB.

DROP POLICY IF EXISTS "Public read active coupons" ON public.coupons;

CREATE POLICY "Public read active coupons" ON public.coupons
  FOR SELECT
  USING (
    is_active = true
    AND (end_date IS NULL OR end_date >= CURRENT_DATE)
    AND (start_date IS NULL OR start_date <= CURRENT_DATE)
  );
