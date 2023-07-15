import { axiosPubllic } from '@/axios/axios-client'
import ProductForm from './components/product-form'
import { Product } from '@/types/interface/product.interface'
import { Height } from '@/types/interface/height.interface'
import { Category } from '@/types/interface/category.interface'

interface Params {
  params: {
    productId: string
  }
}

async function getProduct(id: string) {
  const res = await axiosPubllic.get(`/product/get/${id}`)

  return res.data.product
}

async function getCategories() {
  const res = await axiosPubllic.get('/category/get')

  return res.data
}

async function getHeights() {
  const res = await axiosPubllic.get('/height/get')

  return res.data
}

export default async function page({ params }: Params) {
  const _getProduct: Promise<Product> = getProduct(params.productId)
  const _getHeights: Promise<Height[]> = getHeights()
  const _getCategories: Promise<Category[]> = getCategories()
  const [product, heights, categories] = await Promise.all([
    _getProduct,
    _getHeights,
    _getCategories,
  ])

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm heights={heights} categories={categories} initialData={product} />
      </div>
    </div>
  )
}
