import { axiosPubllic } from '@/axios/axios-client'
import { Billboard } from '@/types/interface/billboard.interface'

export const getBillboards = async (): Promise<Billboard[]> => {
  const res = await axiosPubllic.get('/billboard/get')

  return res.data
}

export const getBillBoard = async (id: string): Promise<Billboard> => {
  const res = await axiosPubllic.get(`/billboard/get/${id}`)

  return res.data.billboard
}
