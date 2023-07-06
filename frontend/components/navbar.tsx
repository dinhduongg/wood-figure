'use client'

import { signOut } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import MainNav from '@/components/main-nav'

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div>This will be the icon</div>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
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
