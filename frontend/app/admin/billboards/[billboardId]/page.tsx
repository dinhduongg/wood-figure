import { getBillBoard } from '@/actions/billboard-action'
import BillboardForm from './components/billboard-form'

interface Params {
  params: {
    billboardId: string
  }
}

export default async function page({ params }: Params) {
  const billboard = await getBillBoard(params.billboardId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  )
}
