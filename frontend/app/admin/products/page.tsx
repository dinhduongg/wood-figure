import { axiosPubllic } from '@/axios/axios-client'
import { Product } from '@/types/interface/product.interface'
import { ProductColumn } from './components/columns'
import { format } from 'date-fns'
import ProductClient from './components/client'
import { Height } from '@/types/interface/height.interface'

async function getProducts() {
  const res = await axiosPubllic.get(`/product/get`)

  return res.data
}

export const metadata = {
  title: 'admin products',
  description: 'This is admin products page',
}

export default async function Products() {
  const _getProducts: Promise<Product[]> = getProducts()
  const products = await _getProducts

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    _id: item._id,
    name: item.name,
    price: item.price,
    discount_money: item.discount_money,
    discount_percent: item.discount_percent,
    discounted_price: item.discounted_price,
    category: (item.category as any)?.[0]?.name,
    heights: item.heights.map((height: Height) => height.name),
    createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  )
}
