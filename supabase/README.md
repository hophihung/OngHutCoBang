# Supabase schema

1. **Schema gốc:** Trong Supabase Dashboard → SQL Editor, chạy toàn bộ nội dung file [../src/sql](../src/sql).
2. **Bản vá RLS:** Sau đó chạy toàn bộ nội dung file [rls-patches.sql](rls-patches.sql).

Nếu project đã có bảng trùng tên, chỉ chạy `rls-patches.sql` (các lệnh dùng CREATE POLICY / ALTER / CREATE TRIGGER có thể chạy tách).
