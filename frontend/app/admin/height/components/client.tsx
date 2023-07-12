'use client'

import { Plus } from 'lucide-react'

import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { HeightColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'
import { Separator } from '@/components/ui/separator'

interface HeightClientProps {
  data: HeightColumn[]
}

export default function HeightClient({ data }: HeightClientProps) {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Heights (${data.length})`} desctiption="Manage heights for your product" />
        <Button onClick={() => router.push(`/admin/height/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" desctiption="API calls for height" />
      <Separator />
      <ApiList entityName="height" entityIdName="heightId" />
    </>
  )
}
