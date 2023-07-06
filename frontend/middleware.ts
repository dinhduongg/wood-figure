import { getToken } from 'next-auth/jwt'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

import { AuthorityRole } from './types/interface/enum'

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const { pathname } = request.nextUrl
  const protectedPaths = ['/admin', '/check-role']
  const matchesProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  if (matchesProtectedPath) {
    const token = await getToken({ req: request })

    if (!token) {
      if (pathname.includes('/check-role')) {
        const url = new URL(`/403`, request.url)
        return NextResponse.rewrite(url)
      }

      const url = new URL(`/auth/signIn`, request.url)
      url.searchParams.set('callbackUrl', encodeURI(request.url))
      return NextResponse.redirect(url)
    }

    if (token.authority !== AuthorityRole.ADMIN) {
      const url = new URL(`/403`, request.url)
      return NextResponse.rewrite(url)
    }
  }
  return NextResponse.next()
}
