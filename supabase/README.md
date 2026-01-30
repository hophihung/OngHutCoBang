# Supabase schema

1. **Schema gốc:** Trong Supabase Dashboard → SQL Editor, chạy toàn bộ nội dung file [../src/sql](../src/sql).
2. **Bản vá RLS:** Sau đó chạy toàn bộ nội dung file [rls-patches.sql](rls-patches.sql).
3. **Profile + Google trigger:** Chạy [profile-google-trigger.sql](profile-google-trigger.sql) để thêm cột `avatar_url`, `email` vào `profiles`, cập nhật trigger ghi đủ thông tin Google khi user mới, và backfill user đã tồn tại.

Nếu project đã có bảng trùng tên, chỉ chạy `rls-patches.sql` (các lệnh dùng CREATE POLICY / ALTER / CREATE TRIGGER có thể chạy tách).
