'use client'
import { columns } from './columns'
import type { Category } from '@prisma/client'
import { DataTable } from '@/components/ui/data-table'

const CategoryTable = ({ categories }: { categories: Category[] }) => <DataTable columns={columns} data={categories} visibleColumns={{ id: false }} />

export default CategoryTable
