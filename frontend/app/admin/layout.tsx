import Navbar from '@/components/navbar'

export const metadata = {
  title: 'Admin dashboard',
  description: 'This is admin dashboard',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
