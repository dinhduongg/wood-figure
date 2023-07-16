import Link from 'next/link'

import { getCategories } from '@/actions/category-action'
import MainNav from '@/components/shop/main-nav'
import NavbarActions from '@/components/shop/navbar-actions'
import Container from '../ui/container'

export default async function NavBar() {
  const categories = await getCategories()

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  )
}
