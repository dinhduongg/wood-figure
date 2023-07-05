import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface Session {
    user: {
      username: string
      authorities: string[]
      authority: string
      accessToken: string
    }
  }
}

import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    username: string
    authorities: string[]
    authority: string
    accessToken: string
  }
}
