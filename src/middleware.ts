// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'


export async function middleware (request: NextRequest) {

  const token = request.cookies.get('accessToken')?.value || 'guest'

  const secret = new TextEncoder().encode(process.env.SECRET)

  const { payload } = await jwtVerify(token, secret) as { payload: { role?: string } };

  const role = payload.role ?? "guest";
  

  const protectedRoutes = {
    '/admin': ['admin'],
    '/dashboard': ['admin', 'customer'],
    '/profile': ['admin', 'user', 'guest'],
  }

  const path = request.nextUrl.pathname
  const route = Object.keys(protectedRoutes).find(route => path.startsWith(route))

  if (route) {
    const allowedRoles = route ? protectedRoutes[route as keyof typeof protectedRoutes] : []
    if (!allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL('/log-in', request.url))
    }
  }

  return NextResponse.next()
}