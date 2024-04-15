'use client'
import { X } from 'lucide-react'
import CellActions from './cell-actions'
import { Badge } from '@/components/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import type { Discount, Product, Variant } from '@prisma/client'
import { formatCurrency, formatDateTime } from '@/lib/formatters'

type ProductWithVariants = Product & {
    variants: Variant[]
    discount: Discount
}
export const columns: ColumnDef<ProductWithVariants>[] = [
    {
        accessorKey: 'id',
        header: () => <span>ID</span>,
    },
    {
        accessorKey: 'name',
        header: () => <span>Name</span>,
    },
    {
        accessorKey: 'price',
        header: () => <span>Price</span>,
        cell: ({ row }) => formatCurrency(row.original.price),
    },
    {
        accessorKey: 'state',
        header: () => <span className="hidden md:block">State</span>,
        cell: ({ row }) => (
            <Badge variant={row.original.state === 'draft' ? 'outline' : 'default'} className="hidden capitalize md:inline-flex">
                {row.original.state}
            </Badge>
        ),
    },
    {
        accessorKey: 'discount.amount',
        header: () => <span className="hidden md:block">Discount</span>,
        cell: ({ row }) => (
            <span className="hidden text-destructive md:block">
                {row.original.discount ? (
                    row.original.discount.isPercentage ? (
                        `${row.original.discount.amount}%`
                    ) : (
                        formatCurrency(row.original.discount.amount)
                    )
                ) : (
                    <X className="size-4 text-foreground" />
                )}
            </span>
        ),
    },
    {
        accessorKey: 'stock',
        header: () => <span className="hidden lg:block">Stock</span>,
        cell: ({ row }) => <span className="hidden lg:block">{row.original.variants.reduce((acc, variant) => acc + variant.quantity, 0)}</span>,
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
