import { format } from 'date-fns'

import { axiosPubllic } from '@/axios/axios-client'
import HeightClient from './components/client'
import { Height } from '@/types/interface/height.interface'
import { HeightColumn } from './components/columns'

async function getHeights() {
  const res = await axiosPubllic.get(`/height/get`)

  return res.data
}

export default async function Heights() {
  const _getHeights: Promise<Height[]> = getHeights()
  const heights = await _getHeights

  const formattedHeights: HeightColumn[] = heights.map((item) => ({
    _id: item._id,
    height: item.height,
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
