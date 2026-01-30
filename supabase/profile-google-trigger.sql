-- Chạy trong Supabase SQL Editor.
-- 1. Thêm cột avatar_url, email vào profiles (nếu chưa có)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS avatar_url TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT;

-- 2. Sửa trigger: ghi full_name (name hoặc full_name từ Google), avatar_url, email khi user mới
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, email, role)
  VALUES (
    new.id,
    COALESCE(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name'
    ),
    new.raw_user_meta_data->>'avatar_url',
    new.email,
    'customer'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Backfill: cập nhật profile đã có từ auth.users (user đăng nhập Google trước khi có trigger)
UPDATE public.profiles p
SET
  full_name = COALESCE(p.full_name, u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name'),
  avatar_url = COALESCE(p.avatar_url, u.raw_user_meta_data->>'avatar_url'),
  email = COALESCE(p.email, u.email)
FROM auth.users u
WHERE p.id = u.id;
