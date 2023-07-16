import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(currency: number | string) {
  const format = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
    Number(currency)
  )
  return format
}
