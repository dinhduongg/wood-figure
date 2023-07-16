import { axiosPubllic } from '@/axios/axios-client'
import { Product } from '@/types/interface/product.interface'

export const getProducts = async (): Promise<Product[]> => {
  const res = await axiosPubllic.get('/product/get')

  return res.data
}

export const getProduct = async (id: string): Promise<Product> => {
  const res = await axiosPubllic.get(`/product/get/${id}`)

  return res.data.product
}
