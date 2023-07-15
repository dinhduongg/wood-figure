// 'use client'

// import * as z from 'zod'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'

// import { Button } from '@/components/ui/button'
// import { Height } from '@/types/interface/height.interface'
// import { MultipleSelect } from '@/components/ui/multiple-select'
// import { FormField, Form, FormItem, FormLabel, FormControl } from '@/components/ui/form'

// const formSchema = z.object({
//   heights: z.array(z.string()),
// })

// type ProductFormValues = z.infer<typeof formSchema>

// interface ProductProps {
//   initialData: Height[]
// }

// export default function Products({ initialData }: ProductProps) {
//   const form = useForm<ProductFormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: initialData,
//   })

//   const onSubmit = async (data: ProductFormValues) => {
//     console.log(data)
//   }

//   return (
//     <div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
//           <FormField
//             control={form.control}
//             name="heights"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Height</FormLabel>
//                 <FormControl>
//                   <MultipleSelect field={field} form={form} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           <Button type="submit">submit</Button>
//         </form>
//       </Form>
//     </div>
//   )
// }
