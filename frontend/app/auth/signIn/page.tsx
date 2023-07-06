'use client'

import * as z from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  username: z.string().min(6, 'Tên đăng nhập phải hơn 6 ký tự'),
  password: z.string(),
})

export default function SignIn() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const callbackUrl = '/check-role'

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // TODO: login
    // console.log(values)
    const res = await signIn('credentials', {
      username: values.username,
      password: values.password,
      redirect: true,
      callbackUrl: '/check-role',
    })

    // if (res?.error) {
    //   console.log(res.error)
    //   return
    // }

    // if (res?.ok) {
    //   console.log(res)
    //   router.push('/check-role')
    //   return
    // }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Đăng nhập
              </h1>
              <Link href="/" className="hover:text-black/50 duration-300">
                Trang chủ
              </Link>
            </div>

            <div className="space-y-4 md:space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Tên đăng nhập
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Tên đăng nhập"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Mật khẩu
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Mật khẩu"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-end">
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Quên mật khẩu?
                    </a>
                  </div>

                  <Button className="w-full" type="submit">
                    Đăng nhập
                  </Button>

                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Bạn chưa có tài khoản
                    <Link
                      href="/auth/signUp"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1"
                    >
                      Đăng ký
                    </Link>
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
