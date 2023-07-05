// export { default } from 'next-auth/middleware'
import { withAuth } from 'next-auth/middleware'
import { AuthorityRole } from './types/interface/enum'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith('/admin') &&
      req.nextauth.token?.authority !== AuthorityRole.ADMIN
    ) {
      return NextResponse.rewrite(new URL('/?message= Truy cập bị từ chối', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = { matcher: ['/admin/:path*'] }
