'use client'

import { ColumnDef } from '@tanstack/react-table'
import CellAction from './cell-action'

export type HeightColumn = {
  _id: string
  height: string | number
  createdAt: string
}

export const columns: ColumnDef<HeightColumn>[] = [
  {
    accessorKey: 'height',
    header: 'Height',
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
