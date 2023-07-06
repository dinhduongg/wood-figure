'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data: sesstion } = useSession()

  return (
    <div>
      <p>home page</p> <br />
      <p>{JSON.stringify(sesstion)}</p> <br />
      <Link href="/admin/overview">admin page</Link> <br /> <br />
      <button onClick={() => signOut()}>log out</button>
    </div>
  )
}
