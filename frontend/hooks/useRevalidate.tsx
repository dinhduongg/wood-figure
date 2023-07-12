import { axiosPubllic } from '@/axios/axios-client'
import { useOrigin } from './useOrigin'

export default function useRevalidate() {
  const origin = useOrigin()

  const revalidate = async () => {
    await axiosPubllic.get(`${origin}/api/revalidate`)
  }

  return revalidate
}
