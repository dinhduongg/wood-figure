import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

import useAxiosPrivate from './useAxiosPrivate'

export default function useLogout() {
  const { data: session } = useSession()
  const axiosPrivate = useAxiosPrivate()

  const logOut = async () => {
    try {
      await axiosPrivate.post('/auth/sign-out', {
        username: session?.user.username,
      })

      signOut({
        redirect: true,
        callbackUrl: '/',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return logOut
}
