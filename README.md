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
