'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import useLogout from '@/hooks/useLogout'

export default function Home() {
  const { data: session } = useSession()
  const logOut = useLogout()

  return (
    <div>
      <p>home page</p> <br />
      <p>{JSON.stringify(session)}</p> <br />
      <Link href="/admin/overview">admin page</Link> <br /> <br />
      <button onClick={() => logOut()}>log out</button>
    </div>
  )
}
