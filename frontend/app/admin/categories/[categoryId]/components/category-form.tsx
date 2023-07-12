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
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Category } from '@/types/interface/category.interface'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Billboard } from '@/types/interface/billboard.interface'

const formSchema = z.object({
  _id: z.string(),
  name: z.string().min(1),
  link: z.string().min(1),
  billboardId: z.string().min(1),
})

type CategoryFormValues = z.infer<typeof formSchema>

interface CategoryProps {
  initialData: Category | null
  billboards: Billboard[]
}

export default function CategoryForm({ initialData, billboards }: CategoryProps) {
  const router = useRouter()
  const params = useParams()
  const privateAxios = useAxiosPrivate()

  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit category' : 'Create category'
  const description = initialData ? 'Edit a category' : 'Create a new category'
  const toastMessage = initialData ? 'Category updated' : 'Category created'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      _id: '',
      name: '',
      link: '',
      billboardId: '',
    },
  })

  const onSubmit = async (data: CategoryFormValues) => {
    // TODO update shop preference
    try {
      setLoading(true)
      // make api call here

      if (initialData) {
        await privateAxios.patch(`/category/update/${data._id}`, data)
      } else {
        await privateAxios.post('/category/create', data)
      }
      router.refresh()
      router.push(`/admin/categories`)

      toast.success(toastMessage)
    } catch (error) {
      toast.error('Some thing went wrong!' + error)
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    // TODO update shop preference
    try {
      setLoading(true)
      // TODO: make api call here
      await privateAxios.delete(`/category/delete/${params.categoryId}`)
      router.refresh()
      router.push('/admin/categories')
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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Link" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BillboardId</FormLabel>
                  {/* <FormControl>
                    <Input placeholder="Link" {...field} />
                  </FormControl> */}
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a billboard" />
                        <SelectContent>
                          {billboards.map((billboard) => (
                            <SelectItem key={billboard._id} value={billboard._id}>
                              {billboard.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectTrigger>
                    </FormControl>
                  </Select>
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
