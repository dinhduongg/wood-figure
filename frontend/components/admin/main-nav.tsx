'use client'

import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const routes = [
    {
      href: '/admin/overview',
      label: 'Overview',
      active: pathname === '/admin/overview',
    },
    {
      href: '/admin/billboards',
      label: 'Billboards',
      active: pathname === '/admin/billboards',
    },
    {
      href: '/admin/categories',
      label: 'Categories',
      active: pathname === '/admin/categories',
    },
    {
      href: '/admin/height',
      label: 'Heights',
      active: pathname === '/admin/height',
    },
    {
      href: '/admin/products',
      label: 'Products',
      active: pathname === '/admin/products',
    },
    {
      href: '/admin/settings',
      label: 'Settings',
      active: pathname === '/admin/settings',
    },
  ]
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
