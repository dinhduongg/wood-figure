import { Category } from './category.interface'
import { Height } from './height.interface'

export interface Product {
  _id: string
  id: string
  name: string
  price: number
  images: string[]
  discount_percent: number
  discount_money: number
  discounted_price: number
  isFeatured: boolean
  isOutOfStock: boolean
  categoryId: string
  heightId: string[]
  category: Category
  heights: Height[]
  createdAt: Date
}
