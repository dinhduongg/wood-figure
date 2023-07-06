'use client'

import { signOut } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import MainNav from '@/components/main-nav'
import Link from 'next/link'

export default function Navbar() {
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
          <Button
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: '/',
              })
            }
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  )
}
