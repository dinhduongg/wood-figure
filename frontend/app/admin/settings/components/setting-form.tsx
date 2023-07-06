'use client'

import * as z from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Preference } from '@/types/interface/preference.interface'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { ApiAlert } from '@/components/ui/api-alert'

interface SettingsFormProps {
  initialData: Preference
}

const formSchema = z.object({
  storeName: z.string().min(1),
  facebookURL: z.string().min(1),
  instagramURL: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
  logo: z.string().min(1),
})

type settingFormValues = z.infer<typeof formSchema>

export default function SettingForm({ initialData }: SettingsFormProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<settingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: settingFormValues) => {
    // TODO update shop preference
    try {
      setLoading(true)
      // make api call here
      console.log(data)

      toast.success('preference updated')
    } catch (error) {
      toast.error('Some thing went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" desctiption="Manage store preference" />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="storeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Store name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebookURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>facebookURL</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="facebookURL" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagramURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>instagramURL</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="instagramURL" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>phone</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="phone" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>logo</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="logo" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            Save change
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="test"
        description={`${process.env.NEXT_PUBLIC_BACKEND_URL}`}
        variant="public"
      />
    </>
  )
}
