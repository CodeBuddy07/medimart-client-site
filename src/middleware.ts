
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get('accessToken')?.value
    const secret = new TextEncoder().encode(process.env.SECRET!)
    
    let role = "guest"

    if (token) {
      const { payload } = await jwtVerify(token, secret)
      role = payload.role?.toString() || "guest"
    }

    const protectedRoutes = {
      '/admin': ['admin'],
      '/dashboard': ["admin", 'customer'],
      '/profile': ['admin', 'user', 'guest'],
    }

    const path = request.nextUrl.pathname
    const route = Object.keys(protectedRoutes).find(route => path.startsWith(route))

    if (route) {
      const allowedRoles = protectedRoutes[route as keyof typeof protectedRoutes]
      if (!allowedRoles.includes(role)) {
        const unauthorizedUrl = new URL('/unauthorized', request.url)
        unauthorizedUrl.searchParams.set('message', `Your ${role} account cannot access ${route}`)
        unauthorizedUrl.searchParams.set('from', path)
        return NextResponse.redirect(unauthorizedUrl)
      }
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    const unauthorizedUrl = new URL('/log-in', request.url)
    return NextResponse.redirect(unauthorizedUrl);
  }
}