# Ong Hut Co Bang

D? �n s? d?ng **Next.js** (App Router) v� **Supabase**.

## C�ng ngh?

- **Next.js 16** ? React framework (TypeScript, App Router, Tailwind CSS)
- **Supabase** ? Backend (Auth, Database, Realtime, Storage)

## B?t ??u

### 1. C�i dependency

```bash
npm install
```

### 2. C?u h�nh Supabase

- T?o project t?i [supabase.com](https://supabase.com)
- Sao ch�p `.env.local.example` th�nh `.env.local`
- ?i?n **Project URL** v� **Anon key** (Settings ? API trong Supabase Dashboard):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### 3. Ch?y dev

```bash
npm run dev
```

M? [http://localhost:3000](http://localhost:3000).

## C?u tr�c Supabase

- **Client (browser):** `src/lib/supabase/client.ts` ? d�ng trong Client Components
- **Server:** `src/lib/supabase/server.ts` ? d�ng trong Server Components, Server Actions, Route Handlers
- **Middleware:** `src/middleware.ts` ? refresh session/auth m?i request

## Kiem tra cau hinh

- **.env.local:** Co `NEXT_PUBLIC_SUPABASE_URL` va `NEXT_PUBLIC_SUPABASE_ANON_KEY` trung voi project Supabase (Settings > API).
- **Google Login (Supabase):** Authentication > URL Configuration: Redirect URL co `http://localhost:3000/auth/callback`. Authentication > Providers > Google: bat, dien Client ID va Client Secret.
- **Google Cloud Console:** Authorized redirect URIs co `https://<project-ref>.supabase.co/auth/v1/callback`.

## Dang nhap bang Google (Supabase Auth)

Trang **Tai khoan** va **Dang ky** co nut **Dang nhap / Dang ky bang Google**. Luong OAuth:

1. **Supabase Dashboard** (Authentication):
   - **URL Configuration**: Them **Redirect URL**: `http://localhost:3000/auth/callback` (va URL production neu co).
   - **Providers > Google**: Bat Google, dien **Client ID** va **Client Secret** (lay tu Google Cloud Console).

2. **Google Cloud Console** ([console.cloud.google.com](https://console.cloud.google.com)):
   - Tao OAuth 2.0 Client ID (loai "Web application").
   - **Authorized redirect URIs**: Them dung `https://<project-ref>.supabase.co/auth/v1/callback` (vd: `https://hdzkgoenpfxyhsgpqatp.supabase.co/auth/v1/callback`).
   - Copy Client ID va Client Secret vao Supabase > Authentication > Providers > Google.

Sau khi cau hinh, nguoi dung bam "Dang nhap bang Google" se duoc chuyen den Google, dang nhap xong quay ve `/auth/callback` roi ve Trang chu. Dang nhap bang Facebook da duoc go bo.

## PayOS (thanh toan)

Trang gio hang co nut **Thanh toan bang PayOS**. Them vao `.env.local`:

- `PAYOS_CLIENT_ID`, `PAYOS_API_KEY`, `PAYOS_CHECKSUM_KEY` (lay tai [PayOS Business](https://business.payos.vn/))
- Sau thanh toan nguoi dung ve `/gio-hang?payos=success` hoac `?payos=cancel` neu huy.

## Scripts

| L?nh   | M� t?              |
|--------|--------------------|
| `npm run dev`   | Ch?y dev server    |
| `npm run build` | Build production   |
| `npm run start` | Ch?y sau khi build |
| `npm run lint`  | Ch?y ESLint        |
