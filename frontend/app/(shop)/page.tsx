import { getBillBoard } from '@/actions/billboard-action'
import Billboard from '@/components/shop/billboard'
import Container from '@/components/ui/container'

export default async function Home() {
  const billboard = await getBillBoard('5d70178e-7306-465e-a124-2cce7beb9dcc')

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>
    </Container>
  )
}
