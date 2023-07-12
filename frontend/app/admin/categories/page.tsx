import { format } from 'date-fns'

import { axiosPubllic } from '@/axios/axios-client'
import CategoryClient from './components/client'
import { Category } from '@/types/interface/category.interface'
import { CategoryColumn } from './components/columns'

async function getCategories() {
  const res = await axiosPubllic.get(`/category/get`)

  return res.data
}

export default async function Categories() {
  const _getCategories: Promise<Category[]> = getCategories()
  const categories = await _getCategories

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
