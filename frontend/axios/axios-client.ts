import axios from 'axios'

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
