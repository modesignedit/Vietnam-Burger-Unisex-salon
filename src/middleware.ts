import { type NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase/admin'

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('__session')?.value

  let uid: string | null = null
  if (session) {
    try {
      const decoded = await adminAuth.verifySessionCookie(session, true)
      uid = decoded.uid
    } catch {}
  }

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = request.nextUrl.pathname === '/admin'

  if (isAdminRoute && !uid && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  if (isLoginPage && uid) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
