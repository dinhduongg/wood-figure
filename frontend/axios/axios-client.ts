import axios from 'axios'
import Cookies from 'js-cookie'
import { getSession } from 'next-auth/react'

export const axiosPubllic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
})

export const axiosPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
  // withCredentials: true,
})

axiosPrivate.interceptors.request.use(
  async (config) => {
    const session = await getSession()
    if (!config.headers['token']) {
      config.headers['token'] = `Bearer ${session?.user.accessToken}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true
      const session = await getSession()

      const res = await axiosPrivate.post('/auth/refresh-access', {
        username: session?.user.username,
      })

      Cookies.set('access-token', res.data.accessToken)

      prevRequest.headers['token'] = `Bearer ${res?.data.accessToken}`
      return axiosPrivate(prevRequest)
    }
    return Promise.reject(error)
  }
)
