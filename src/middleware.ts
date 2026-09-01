import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
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

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Check for 2FA cookie
  const has2FA = request.cookies.has('admin_2fa_verified')

  const ADMIN_EMAIL = 'rasheedclothingintl@gmail.com';
  const isAdmin = user && user.email === ADMIN_EMAIL;

  // If the user is not logged in or not the admin, and trying to access /admin (but not /admin/login), redirect to login
  if ((!user || !isAdmin) && request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  // If the user is logged in but hasn't completed 2FA, redirect to verify (unless already there)
  if (isAdmin && !has2FA && request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login/verify') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login/verify'
    return NextResponse.redirect(url)
  }

  // If the user is logged in AND has 2FA, prevent them from accessing login/verify pages
  if (isAdmin && has2FA && request.nextUrl.pathname.startsWith('/admin/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*'],
}
