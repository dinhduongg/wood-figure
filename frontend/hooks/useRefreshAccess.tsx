import { axiosPrivate } from '@/axios/axios-client'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

export default function useRefreshAccess() {
  const { data: session, update: updateSession } = useSession()

  const refresh = async () => {
    try {
      const response = await axiosPrivate.post('/api/auth/refresh-access', {
        username: session?.user.username,
      })

      updateSession({
        accessToken: response.data.accessToken,
      })

      return response.data.accessToken
    } catch (error) {
      toast.error('RefreshToken hết hạn')
    }
  }

  return refresh
}
