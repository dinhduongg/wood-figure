'use client'

import { useState } from 'react'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import AlertModal from '@/components/modals/alert-modal'

import { CategoryColumn } from './columns'
import useRevalidate from '@/hooks/useRevalidate'

interface CellActionProps {
  data: CategoryColumn
}
export default function CellAction({ data }: CellActionProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const privateAxios = useAxiosPrivate()
  const revalidate = useRevalidate()

  const onConfirm = async () => {
    try {
      setLoading(true)
      //   await axios.delete(`/api/${params.storeId}/billboards/${data.id}`)
      await privateAxios.delete(`/category/delete/${data._id}`)

      router.refresh()

      toast.success('Billboard deleted.')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setOpen(false)
      setLoading(false)
      revalidate()
    }
  }

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success('Billboard ID copied to clipboard.')
  }
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data._id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/admin/categories/${data._id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
