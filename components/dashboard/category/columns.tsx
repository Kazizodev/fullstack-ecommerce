'use client'
import CellActions from './cell-actions'
import type { Category } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { formatDateTime } from '@/lib/formatters'

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: 'id',
        header: () => <span>ID</span>,
    },
    {
        accessorKey: 'name',
        header: () => <span>Name</span>,
        cell: ({ row }) => <span className="capitalize">{row.original.name}</span>,
    },
    {
        accessorKey: 'createdAt',
        header: () => <span className="hidden sm:block">Date</span>,
        cell: ({ row }) => <span className="hidden sm:block">{formatDateTime(row.original.createdAt)}</span>,
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellActions data={row.original} />,
    },
]
