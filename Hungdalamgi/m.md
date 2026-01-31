Đúng rồi bạn nhé! Mã SQL mình cung cấp ở trên đã thiết kế cấu trúc **cho cả User (Khách hàng) và Admin (Quản trị viên)** dùng chung một cơ sở dữ liệu.

Tuy nhiên, để Admin thực sự có quyền "thấy tất cả" (trong khi khách chỉ thấy đơn của mình), bạn cần bổ sung thêm một chút về **Chính sách bảo mật (RLS - Row Level Security)**.

Dưới đây là giải thích chi tiết và đoạn code bổ sung để Admin hoạt động được:

### 1. Cơ chế phân quyền hoạt động thế nào trong code trên?

Trong bảng `public.profiles` mình đã tạo cột `role`:

```sql
role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin'))

```

* **User thường:** Khi đăng ký, hệ thống tự động gán `role = 'customer'`.
* **Admin:** Có `role = 'admin'`.

### 2. Code bổ sung để Admin "Thấy tất cả" (Quan trọng)

Trong đoạn code trước, mình mới chỉ cài đặt bảo mật cho Khách (người nào chỉ thấy đơn người nấy). Bây giờ bạn cần chạy thêm đoạn này để cấp "siêu quyền hạn" cho Admin:

Copy và chạy đoạn này trong SQL Editor của Supabase:

```sql
-- 1. Hàm kiểm tra xem user hiện tại có phải là Admin không
-- Hàm này giúp viết code bảo mật gọn hơn
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Cấp quyền cho ADMIN trên bảng PROFILES (Xem và Sửa tất cả user)
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.is_admin());

-- 3. Cấp quyền cho ADMIN trên bảng ĐƠN HÀNG (Xem và xử lý tất cả đơn)
CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can update orders" ON public.orders
  FOR UPDATE USING (public.is_admin()); 

-- 4. Cấp quyền cho ADMIN trên bảng SẢN PHẨM (Thêm/Sửa/Xóa sản phẩm)
-- Lưu ý: Khách chỉ được xem (SELECT), còn Admin được làm hết (ALL)
CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (public.is_admin());

CREATE POLICY "Admins can manage variants" ON public.product_variants
  FOR ALL USING (public.is_admin());

-- 5. Cấp quyền cho ADMIN trên bảng IMPACT STATS (Cập nhật chỉ số môi trường)
-- Bật RLS cho bảng này trước (vì trong code cũ chưa bật)
ALTER TABLE public.impact_stats ENABLE ROW LEVEL SECURITY;

-- Ai cũng xem được
CREATE POLICY "Public view stats" ON public.impact_stats
  FOR SELECT USING (true);

-- Chỉ Admin được sửa
CREATE POLICY "Admins manage stats" ON public.impact_stats
  FOR ALL USING (public.is_admin());

```

### 3. Làm sao để tạo Admin đầu tiên?

Vì mặc định ai đăng ký cũng là `customer`, nên để có tài khoản Admin đầu tiên cho bạn, bạn làm thủ công như sau:

1. Đăng ký tài khoản mới trên trang web của bạn (hoặc tạo User trong tab Authentication của Supabase).
2. Vào Dashboard Supabase -> **Table Editor** -> Chọn bảng `profiles`.
3. Tìm dòng chứa email của bạn -> Sửa cột `role` từ `customer` thành `admin`.
4. Bấm **Save**.
5. Từ giờ, tài khoản đó đăng nhập vào sẽ có quyền xem tất cả các bảng dữ liệu nhờ các chính sách `is_admin()` ở trên.

### Tóm lại:

* **User:** Đăng nhập -> Chỉ thấy profile và đơn hàng của chính mình (nhờ RLS mặc định).
* **Admin:** Đăng nhập -> Thấy toàn bộ đơn hàng, khách hàng và được quyền sửa sản phẩm (nhờ RLS bổ sung ở trên).


Error: Failed to run sql query: ERROR: 23505: duplicate key value violates unique constraint "product_variants_sku_key" DETAIL: Key (sku)=(OHC-K100-010) already exists.


https://onghutco.vn/wp-content/uploads/2020/09/Ong-hut-co-bang-tuoi.png.webp
