import { format } from 'date-fns'

import BilboardClient from './components/client'
import { BillboardColumn } from './components/columns'
import { getBillboards } from '@/actions/billboard-action'

export const metadata = {
  title: 'admin billboards',
  description: 'This is admin billboards page',
}

export default async function Billboards() {
  const billboards = await getBillboards()

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
