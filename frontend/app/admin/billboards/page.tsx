import { format } from 'date-fns'

import { axiosPubllic } from '@/axios/axios-client'
import BilboardClient from './components/client'
import { Billboard } from '@/types/interface/billboard.interface'
import { BillboardColumn } from './components/columns'

async function getBillboards() {
  const res = await axiosPubllic.get(`/billboard/get`)

  return res.data
}

export const metadata = {
  title: 'admin billboards',
  description: 'This is admin billboards page',
}

export default async function Billboards() {
  const _getBillboards: Promise<Billboard[]> = getBillboards()
  const billboards = await _getBillboards

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    _id: item._id,
    label: item.label,
    createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BilboardClient data={formattedBillboards} />
      </div>
    </div>
  )
}
