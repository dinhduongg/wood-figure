import { format } from 'date-fns'

import { getCategories } from '@/actions/category-action'
import CategoryClient from './components/client'
import { CategoryColumn } from './components/columns'

export const metadata = {
  title: 'admin categories',
  description: 'This is admin categories page',
}

export default async function Categories() {
  const categories = await getCategories()

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    _id: item._id,
    name: item.name,
    link: item.link,
    billboardLabel: item.billboard?.[0]?.label ?? '',
    createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  )
}
