import { getBillboards } from '@/actions/billboard-action'
import { getCategory } from '@/actions/category-action'
import CategoryForm from './components/category-form'

interface Params {
  params: {
    categoryId: string
  }
}

export default async function page({ params }: Params) {
  const [category, billboards] = await Promise.all([
    getCategory(params.categoryId),
    getBillboards(),
  ])

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  )
}
