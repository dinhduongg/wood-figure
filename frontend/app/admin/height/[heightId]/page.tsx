import { axiosPubllic } from '@/axios/axios-client'
import HeightForm from './components/height-form'
import { Height } from '@/types/interface/height.interface'

interface Params {
  params: {
    heightId: string
  }
}

async function getHeight(id: string) {
  const res = await axiosPubllic.get(`/height/get/${id}`)

  return res.data.height
}

export default async function page({ params }: Params) {
  const _getHeight: Promise<Height> = getHeight(params.heightId)
  const height = await _getHeight

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <HeightForm initialData={height} />
      </div>
    </div>
  )
}
