'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <p>home page</p>
      <Link href="/admin">admin page</Link> <br />
      <button onClick={() => signOut()}>log out</button>
    </div>
  )
}
