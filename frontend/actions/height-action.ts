import { axiosPubllic } from '@/axios/axios-client'
import { Height } from '@/types/interface/height.interface'

export const getHeights = async (): Promise<Height[]> => {
  const res = await axiosPubllic.get('/height/get')

  return res.data
}

export const getHeight = async (id: string): Promise<Height> => {
  const res = await axiosPubllic.get(`/height/get/${id}`)

  return res.data.height
}
