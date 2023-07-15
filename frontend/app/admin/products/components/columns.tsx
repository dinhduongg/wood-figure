'use client'

import { ColumnDef } from '@tanstack/react-table'
import CellAction from './cell-action'

export type ProductColumn = {
  _id: string
  name: string
  price: number
  discount_percent: number
  discount_money: number
  discounted_price: number
  category: any
  heights: any
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'discount_percent',
    header: 'Discount percent',
  },
  {
    accessorKey: 'discount_money',
    header: 'Discount monet',
  },
  {
    accessorKey: 'discounted_price',
    header: 'Discounted price',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'heights',
    header: 'Heights',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
