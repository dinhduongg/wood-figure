import '../globals.css'
import { Urbanist } from 'next/font/google'

import AuthProvider from '@/context/AuthProvider'
import { ToasterProvider } from '@/providers/toast-provider'
import Footer from '@/components/shop/footer'
import NavBar from '@/components/shop/navbar'

const font = Urbanist({ subsets: ['latin'] })

export const metadata = {
  title: 'Store',
  description: 'Store',
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <AuthProvider>
          <NavBar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
