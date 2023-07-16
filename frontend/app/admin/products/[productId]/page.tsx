import { getCategories } from '@/actions/category-action'
import { getHeights } from '@/actions/height-action'
import { getProduct } from '@/actions/product-action'
import ProductForm from './components/product-form'

interface Params {
  params: {
    productId: string
  }
}

export default async function page({ params }: Params) {
  const [product, heights, categories] = await Promise.all([
    getProduct(params.productId),
    getHeights(),
    getCategories(),
  ])

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm heights={heights} categories={categories} initialData={product} />
      </div>
    </div>
  )
}
