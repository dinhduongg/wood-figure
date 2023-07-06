'use client'

import { signOut, useSession } from 'next-auth/react'

export default function AdminPage() {
  const { data: session } = useSession()

  return (
    <div>
      <div>AdminPage</div>
      <button onClick={() => signOut()}>log out</button>
    </div>
  )
}
