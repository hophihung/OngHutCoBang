import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Trả về response redirect và giữ nguyên cookie đã set (session refresh).
 * Tránh mất cookie khi redirect.
 */
function redirectWithCookies(
  url: URL,
  supabaseResponse: NextResponse
): NextResponse {
  const res = NextResponse.redirect(url)
  supabaseResponse.cookies.getAll().forEach((cookie) =>
    res.cookies.set(cookie.name, cookie.value, cookie)
  )
  return res
}

/**
 * Cập nhật session Supabase (refresh token) cho mỗi request.
 * Bảo vệ /admin: chỉ cho phép user đã đăng nhập và có role = 'admin'.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Bước 1: Lấy user hiện tại (đồng thời refresh session)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Chỉ xử lý bảo vệ cho route /admin* (không đụng /tai-khoan, /auth để tránh vòng lặp redirect)
  if (pathname.startsWith('/admin')) {
    // Console check: admin đã đăng nhập chưa hay vào luôn
    const isLoggedIn = !!user
    console.log('[Admin Middleware]', {
      pathname,
      isLoggedIn,
      userId: user?.id ?? null,
    })

    // Bước 2: Chưa đăng nhập → redirect về trang đăng nhập, lưu next để quay lại
    if (!user) {
      console.log('[Admin Middleware] → Chưa đăng nhập, redirect /tai-khoan?next=' + pathname)
      const loginUrl = new URL('/tai-khoan', request.url)
      loginUrl.searchParams.set('next', pathname)
      return redirectWithCookies(loginUrl, supabaseResponse)
    }

    // Bước 3: Đã có user → query bảng profiles lấy role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = profile?.role ?? 'customer'
    console.log('[Admin Middleware]', { role, userId: user.id })

    // role !== 'admin' → redirect về trang chủ (403)
    if (role !== 'admin') {
      console.log('[Admin Middleware] → role !== admin, redirect /')
      return redirectWithCookies(new URL('/', request.url), supabaseResponse)
    }

    console.log('[Admin Middleware] → admin đã đăng nhập, cho vào')
    // role === 'admin' → cho phép đi tiếp (xử lý ở dưới: return supabaseResponse)
  }

  return supabaseResponse
}
