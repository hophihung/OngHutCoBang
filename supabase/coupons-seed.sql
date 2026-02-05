-- Chạy trong Supabase SQL Editor (sau khi đã chạy coupons-table.sql).
-- Thêm 10 coupon mẫu cho Coupon Management.

INSERT INTO public.coupons (
  code,
  description,
  discount_type,
  discount_value,
  usage_limit,
  usage_count,
  start_date,
  end_date,
  is_active
) VALUES
  (
    'WELCOME10',
    'Giảm 10% cho khách hàng mới lần đầu mua hàng',
    'percentage',
    10,
    500,
    0,
    CURRENT_DATE,
    (CURRENT_DATE + INTERVAL '3 months')::date,
    true
  ),
  (
    'FREESHIP50K',
    'Miễn phí ship đơn từ 200k (giảm tối đa 50.000đ)',
    'fixed_cart',
    50000,
    1000,
    0,
    CURRENT_DATE,
    (CURRENT_DATE + INTERVAL '1 month')::date,
    true
  ),
  (
    'TET2025',
    'Ưu đãi Tết 2025 - Giảm 15% toàn bộ đơn hàng',
    'percentage',
    15,
    200,
    0,
    CURRENT_DATE,
    DATE '2025-02-15',
    true
  ),
  (
    'ONGHUT20',
    'Giảm 20% khi mua combo ống hút cỏ bàng từ 5 sản phẩm',
    'percentage',
    20,
    NULL,
    0,
    (CURRENT_DATE - INTERVAL '7 days')::date,
    NULL,
    true
  ),
  (
    'SALE30',
    'Flash sale cuối tuần - Giảm 30% (áp dụng 1 lần/khách)',
    'percentage',
    30,
    100,
    0,
    CURRENT_DATE,
    (CURRENT_DATE + INTERVAL '7 days')::date,
    true
  ),
  (
    'TRUNGTHU',
    'Ưu đãi Trung thu - Giảm 25.000đ đơn từ 150k',
    'fixed_cart',
    25000,
    300,
    0,
    CURRENT_DATE,
    DATE '2025-09-15',
    true
  ),
  (
    'LOYAL15',
    'Mã dành cho khách hàng thân thiết - Giảm 15%',
    'percentage',
    15,
    50,
    0,
    (CURRENT_DATE - INTERVAL '1 month')::date,
    (CURRENT_DATE + INTERVAL '2 months')::date,
    true
  ),
  (
    'NEWYEAR50K',
    'Năm mới giảm 50.000đ cho đơn từ 300.000đ',
    'fixed_cart',
    50000,
    150,
    0,
    DATE '2024-12-20',
    DATE '2025-01-05',
    false
  ),
  (
    'ECO5',
    'Giảm 5% khi thanh toán qua ví điện tử (min 100k)',
    'percentage',
    5,
    NULL,
    0,
    CURRENT_DATE,
    NULL,
    true
  ),
  (
    'FIRSTORDER',
    'Đơn đầu tiên giảm 50.000đ (áp dụng đơn từ 250k)',
    'fixed_cart',
    50000,
    800,
    0,
    (CURRENT_DATE - INTERVAL '15 days')::date,
    (CURRENT_DATE + INTERVAL '45 days')::date,
    true
  )
ON CONFLICT (code) DO NOTHING;
