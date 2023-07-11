import { axiosPubllic } from '@/axios/axios-client'
import BillboardForm from './components/billboard-form'
import { Billboard } from '@/types/interface/billboard.interface'

interface Params {
  params: {
    billboardId: string
  }
}

async function getBillboard(id: string) {
  const res = await axiosPubllic.get(`/billboard/get/${id}`)

  return res.data.billboard
}

export default async function page({ params }: Params) {
  const _getBillboard: Promise<Billboard> = getBillboard(params.billboardId)
  const billboard = await _getBillboard

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  )
}
