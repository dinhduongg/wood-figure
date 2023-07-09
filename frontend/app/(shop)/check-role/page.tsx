'use server'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

import { AuthorityRole } from '@/types/interface/enum'
import { options } from '@/app/api/auth/[...nextauth]/options'

export default async function CheckRole() {
  const session = await getServerSession(options)

  if (session?.user.authority === AuthorityRole.ADMIN) {
    redirect('/admin/overview')
  }

  if (session?.user.authority === AuthorityRole.USER) {
    redirect('/')
  }

  return (
    <div>
      <div>your role is: {JSON.stringify(session?.user.authority)}</div>
    </div>
  )
}
