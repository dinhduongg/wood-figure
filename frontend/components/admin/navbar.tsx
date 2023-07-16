'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import MainNav from '@/components/admin/main-nav'
import useLogout from '@/hooks/useLogout'

export default function Navbar() {
  const logOut = useLogout()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/admin/overview">
          <div>This will be the icon</div>
        </Link>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline">
            <Link href="/">Cửa hàng</Link>
          </Button>
          <Button onClick={logOut}>Đăng xuất</Button>
        </div>
      </div>
    </div>
  )
}
