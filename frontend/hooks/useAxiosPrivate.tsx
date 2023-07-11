'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import { axiosPrivate } from '@/axios/axios-client'
import useRefreshAccess from './useRefreshAccess'

export default function useAxiosPrivate() {
  const refresh = useRefreshAccess()
  const { data: session } = useSession()

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['token']) {
          config.headers['token'] = `Bearer ${session?.user.accessToken}`
        }
        return config
      },
      (error) => {
        Promise.reject(error)
      }
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          console.log('chay 403')

          prevRequest.sent = true
          const newAccessToken = await refresh()
          console.log('new', newAccessToken)

          prevRequest.headers['token'] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept)
      axiosPrivate.interceptors.request.eject(requestIntercept)
    }
  }, [refresh, session])

  return axiosPrivate
}
