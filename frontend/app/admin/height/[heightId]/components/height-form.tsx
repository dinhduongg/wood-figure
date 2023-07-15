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
import AlertModal from '@/components/modals/alert-modal'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useRevalidate from '@/hooks/useRevalidate'
import { Height } from '@/types/interface/height.interface'

const formSchema = z.object({
  _id: z.string(),
  name: z.string().min(1),
  value: z.string().min(1),
})

type HeightFormValues = z.infer<typeof formSchema>

interface HeightProps {
  initialData: Height | null
}

export default function HeightForm({ initialData }: HeightProps) {
  const router = useRouter()
  const params = useParams()
  const privateAxios = useAxiosPrivate()
  const revalidate = useRevalidate()

  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit height' : 'Create height'
  const description = initialData ? 'Edit a height' : 'Create a new height'
  const toastMessage = initialData ? 'Height updated' : 'Height created'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<HeightFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      _id: '',
      name: '',
      value: '',
    },
  })

  const onSubmit = async (data: HeightFormValues) => {
    try {
      setLoading(true)
      // TODO: make API call here

      if (initialData) {
        await privateAxios.patch(`/height/update/${data._id}`, data)
      } else {
        await privateAxios.post('/height/create', data)
      }

      router.refresh()
      router.push(`/admin/height`)

      toast.success(toastMessage)
    } catch (error) {
      toast.error('Some thing went wrong!' + error)
    } finally {
      setLoading(false)
      revalidate()
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      // TODO: make API call here

      await privateAxios.delete(`/height/delete/${params?.heightId}`)

      router.refresh()
      router.push('/admin/height')

      toast.success('Height deleted')
    } catch (error) {
      toast.error('Some thing went wrong!')
    } finally {
      setLoading(false)
      setIsOpen(false)
      revalidate()
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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name + cm" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input placeholder="Value" {...field} />
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
