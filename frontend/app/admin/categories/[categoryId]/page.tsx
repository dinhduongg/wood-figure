import { axiosPubllic } from '@/axios/axios-client'
import CategoryForm from './components/category-form'
import { Category } from '@/types/interface/category.interface'
import { Billboard } from '@/types/interface/billboard.interface'

interface Params {
  params: {
    categoryId: string
  }
}

async function getCategory(id: string) {
  const res = await axiosPubllic.get(`/category/get/${id}`)

  return res.data.category
}

async function getBillboards() {
  const res = await axiosPubllic.get(`/billboard/get`)

  return res.data
}

export default async function page({ params }: Params) {
  const _getCategory: Promise<Category> = getCategory(params.categoryId)
  const _getBillboard: Promise<Billboard[]> = getBillboards()
  const [category, billboards] = await Promise.all([_getCategory, _getBillboard])

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  )
}
