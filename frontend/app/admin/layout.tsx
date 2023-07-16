import '../globals.css'
import { Inter } from 'next/font/google'

import Navbar from '@/components/admin/navbar'
import AuthProvider from '@/context/AuthProvider'
import { ToasterProvider } from '@/providers/toast-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin dashboard',
  description: 'This is admin dashboard',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
