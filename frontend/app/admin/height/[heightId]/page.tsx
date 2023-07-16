import { getHeight } from '@/actions/height-action'
import HeightForm from './components/height-form'

interface Params {
  params: {
    heightId: string
  }
}

export default async function page({ params }: Params) {
  const height = await getHeight(params.heightId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <HeightForm initialData={height} />
      </div>
    </div>
  )
}
