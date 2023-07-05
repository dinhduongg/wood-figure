import axios from 'axios'

const axiosPubllic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const axiosPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export default axiosPubllic
