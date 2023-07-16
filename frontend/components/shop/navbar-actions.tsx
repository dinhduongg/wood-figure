'use client'

import { ShoppingBag } from 'lucide-react'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { AuthorityRole } from '@/types/interface/enum'
import useLogout from '@/hooks/useLogout'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NavbarActions() {
  const { data: session } = useSession()
  const logOut = useLogout()
  const router = useRouter()

  return (
    <div className="ml-auto flex items-center gap-x-4">
      {session?.user ? (
        <>
          <Button className="flex items-center rounded-full bg-black px-4 py-2">
            <ShoppingBag size={20} color="white" />
            <span className="ml-2 text-sm font-medium text-white">0</span>
          </Button>
          <Button onClick={logOut} variant="outline" className="flex items-center px-4 py-2">
            Đăng xuất
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline" className="flex items-center px-4 py-2">
            <Link href="/auth/signIn">Đăng nhập</Link>
          </Button>
          <Button variant="outline" className="flex items-center px-4 py-2">
            <Link href="/auth/signUp">Đăng ký</Link>
          </Button>
        </>
      )}
      {session?.user.authority === AuthorityRole.ADMIN && (
        <Button variant="destructive" className="flex items-center rounded-full px-4 py-2">
          admin
        </Button>
      )}
    </div>
  )
}
