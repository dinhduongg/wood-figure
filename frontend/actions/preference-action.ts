import { axiosPubllic } from '@/axios/axios-client'
import { Preference } from '@/types/interface/preference.interface'

export const getPreference = async (): Promise<Preference> => {
  const res = await axiosPubllic.get('/preference/get')

  return res.data[0]
}
