'use client'

import { ColumnDef } from '@tanstack/react-table'
import CellAction from './cell-action'

export type HeightColumn = {
  _id: string
  name: string
  createdAt: string
}

export const columns: ColumnDef<HeightColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Value',
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
