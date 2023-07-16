import { axiosPubllic } from '@/axios/axios-client'
import { Category } from '@/types/interface/category.interface'

export const getCategories = async (): Promise<Category[]> => {
  const res = await axiosPubllic.get('/category/get')

  return res.data
}

export const getCategory = async (id: string): Promise<Category> => {
  const res = await axiosPubllic.get(`/category/get/${id}`)

  return res.data.category
}
