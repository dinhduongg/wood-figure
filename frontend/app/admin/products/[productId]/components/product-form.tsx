'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { XIcon } from 'lucide-react'

import AlertModal from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Heading from '@/components/ui/heading'
import ImageUpload from '@/components/ui/image-upload'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Separator } from '@/components/ui/separator'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useRevalidate from '@/hooks/useRevalidate'
import { Category } from '@/types/interface/category.interface'
import { Height } from '@/types/interface/height.interface'
import { Product } from '@/types/interface/product.interface'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'

const formSchema = z.object({
  _id: z.string(),
  name: z.string().min(1),
  images: z.array(z.string()).min(1),
  price: z.coerce.number(),
  discount_percent: z.coerce.number(),
  discount_money: z.coerce.number(),
  discounted_price: z.coerce.number(),
  isFeatured: z.boolean().default(false),
  isOutOfStock: z.boolean().default(false),
  categoryId: z.string().min(1),
  heightId: z.array(z.string()).min(1),
})

type ProductFormValues = z.infer<typeof formSchema>

interface ProductProps {
  initialData: Product | null
  heights: Height[]
  categories: Category[]
}

export default function ProductForm({ initialData, heights, categories }: ProductProps) {
  const router = useRouter()
  const params = useParams()
  const privateAxios = useAxiosPrivate()
  const revalidate = useRevalidate()

  const [isOpen, setIsOpen] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit product' : 'Create product'
  const description = initialData ? 'Edit a product' : 'Create a new product'
  const toastMessage = initialData ? 'Product updated' : 'Product created'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      _id: '',
      name: '',
      images: [],
      price: 0,
      discount_money: 0,
      discounted_price: 0,
      discount_percent: 0,
      isFeatured: false,
      isOutOfStock: false,
      categoryId: '',
      heightId: [],
    },
  })

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true)
      // TODO: make API call here

      if (initialData) {
        await privateAxios.patch(`/product/update/${data._id}`, data)
      } else {
        await privateAxios.post('/product/create', data)
      }

      router.refresh()
      router.push(`/admin/products`)

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

      await privateAxios.delete(`/product/delete/${params?.categoryId}`)

      router.refresh()
      router.push('/admin/products')

      toast.success('Product deleted')
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
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? field.value : []}
                    disabled={loading}
                    onChange={(url: string) => field.onChange([...field.value, url])}
                    onRemove={(url: string) =>
                      field.onChange([...field.value.filter((current) => current !== url)])
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount_percent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount percent</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="discount percent" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount_money"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount money</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="discount money" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discounted_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discounted price</FormLabel>
                  <FormControl>
                    <Input type="number" disabled placeholder="discounted price" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Id</FormLabel>
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
                          {categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectTrigger>
                    </FormControl>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="heightId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height Id</FormLabel>
                  <FormControl>
                    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <div
                            className={cn(
                              'w-full overflow-auto border border-input bg-background flex items-center justify-between cursor-default px-2 py-1.5',
                              field.value.length === 0 &&
                                'text-muted-foreground flex justify-between'
                            )}
                          >
                            {field.value.length !== 0 ? (
                              <div className="flex items-center space-x-2">
                                {field.value.map((item) => (
                                  <div
                                    className="border p-1 flex items-center space-x-2 rounded bg-gray-200 cursor-pointer"
                                    onClick={() =>
                                      form.setValue(
                                        'heightId',
                                        field.value.filter((id) => id !== item)
                                      )
                                    }
                                    key={item}
                                  >
                                    <p className="text-sm">
                                      {heights.find((height) => height._id === item)?.name}
                                    </p>
                                    <XIcon className="w-4 h-4 font-bold" />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p>Select height...</p>
                            )}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </div>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Command>
                          <CommandInput placeholder="Search height..." className="h-9" />
                          <CommandEmpty>No height found.</CommandEmpty>
                          <CommandGroup>
                            {heights.map((height) => (
                              <CommandItem
                                value={height._id}
                                key={height._id}
                                onSelect={(val) => {
                                  if (field.value.includes(val)) {
                                    return form.setValue(
                                      'heightId',
                                      field.value.filter((id) => id !== val)
                                    )
                                  }

                                  return form.setValue('heightId', [...field.value, val])
                                }}
                              >
                                {height.name}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    field.value.find((item) => item === height._id)
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>This product will apear on the home page</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isOutOfStock"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Out of stock</FormLabel>
                    <FormDescription>This product is running out</FormDescription>
                  </div>
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
