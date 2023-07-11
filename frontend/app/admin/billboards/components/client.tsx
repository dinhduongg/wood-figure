'use client'

import { Plus } from 'lucide-react'

import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { BillboardColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'
import { Separator } from '@/components/ui/separator'

interface BilboardClientProps {
  data: BillboardColumn[]
}

export default function BilboardClient({ data }: BilboardClientProps) {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          desctiption="Manage billboards for your store"
        />
        <Button onClick={() => router.push(`/admin/billboards/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading title="API" desctiption="API calls for billboard" />
      <Separator />
      <ApiList entityName="billboard" entityIdName="billboardId" />
    </>
  )
}
