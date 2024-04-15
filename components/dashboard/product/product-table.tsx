'use client'
import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import type { Discount, Product, Variant } from '@prisma/client'

type ProductData = Product & {
    variants: Variant[]
    discount: Discount
}

const ProductTable = ({ data }: { data: ProductData[] }) => <DataTable columns={columns} data={data} visibleColumns={{ id: false }} />

export default ProductTable
