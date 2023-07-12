'use client'

import { Plus } from 'lucide-react'

import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { CategoryColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'
import { Separator } from '@/components/ui/separator'

interface CategoryClientProps {
  data: CategoryColumn[]
}

export default function CategoryClient({ data }: CategoryClientProps) {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          desctiption="Manage categories for your store"
        />
        <Button onClick={() => router.push(`/admin/categories/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" desctiption="API calls for category" />
      <Separator />
      <ApiList entityName="category" entityIdName="categoryId" />
    </>
  )
}
