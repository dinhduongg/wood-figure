import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import axiosPubllic from '@/axios'

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password', placeholder: 'asd' },
      },
      async authorize(credentials, req) {
        const user = await axiosPubllic.post('/api/auth/sign-in', credentials)

        if (user.data) {
          return Promise.resolve(user.data)
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signIn',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      session.user = token as any
      return session
    },
  },
}
