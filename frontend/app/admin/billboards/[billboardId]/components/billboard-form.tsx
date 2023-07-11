'use client'

import * as z from 'zod'
import { useState } from 'react'
import { Trash } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import ImageUpload from '@/components/ui/image-upload'
import AlertModal from '@/components/modals/alert-modal'
import { Billboard } from '@/types/interface/billboard.interface'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

const formSchema = z.object({
  _id: z.string(),
  label: z.string().min(1),
  imageUrl: z.string().min(1),
})

type BillboardFormValues = z.infer<typeof formSchema>

interface BillBoardProps {
  initialData: Billboard | null
}

export default function BillboardForm({ initialData }: BillBoardProps) {
  const router = useRouter()
  const params = useParams()
  const privateAxios = useAxiosPrivate()

  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit billboard' : 'Create billboard'
  const description = initialData ? 'Edit a billboard' : 'Create a new billboard'
  const toastMessage = initialData ? 'Billboard updated' : 'Billboard created'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      _id: '',
      label: '',
      imageUrl: '',
    },
  })

  const onSubmit = async (data: BillboardFormValues) => {
    // TODO update shop preference
    try {
      setLoading(true)
      // make api call here

      if (initialData) {
        await privateAxios.patch(`/billboard/update/${data._id}`, data)
      } else {
        await privateAxios.post('/billboard/create', data)
      }
      router.refresh()
      router.push(`/admin/billboards`)
      toast.success(toastMessage)
    } catch (error) {
      toast.error('Some thing went wrong!')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    // TODO update shop preference
    try {
      setLoading(true)
      // TODO: make api call here
      await privateAxios.delete(`/billboard/delete/${params.billboardId}`)
      router.refresh()
      router.push('/admin/billboards')
      toast.success('Billboard deleted')
    } catch (error) {
      toast.error('Some thing went wrong!')
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => onDelete()}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} desctiption={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setIsOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Upload</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Label" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  )
}
