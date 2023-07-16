import { format } from 'date-fns'

import { getHeights } from '@/actions/height-action'
import HeightClient from './components/client'
import { HeightColumn } from './components/columns'

export const metadata = {
  title: 'admin height',
  description: 'This is admin height page',
}

export default async function Heights() {
  const heights = await getHeights()

  const formattedHeights: HeightColumn[] = heights.map((item) => ({
    _id: item._id,
    name: item.name,
    createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <HeightClient data={formattedHeights} />
      </div>
    </div>
  )
}
