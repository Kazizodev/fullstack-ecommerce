import db from '@/lib/db'
import type { Category } from '@prisma/client'
import PageHeader from '@/components/ui/page-header'
import { Card, CardContent } from '@/components/ui/card'
import HeaderButtons from '@/components/ui/header-buttons'
import TablePagination from '@/components/ui/table-pagination'
import CategoryTable from '@/components/dashboard/category/category-table'

export const metadata = { title: 'Categories', description: 'Manage your categories here' }

const pageSize = 10
async function getCategories(pageNumber: number) {
    const totalCount = await db.category.count()
    const totalPages = Math.ceil(totalCount / pageSize)

    if (pageNumber > totalPages) pageNumber = 1

    const skip = (pageNumber - 1) * pageSize
    const categories = await db.category.findMany({ take: pageSize, skip: skip, orderBy: { createdAt: 'desc' } })

    return { categories: categories as Category[], totalCount: totalCount, totalPages: totalPages, currentPage: pageNumber }
}

const CategoriesPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const num = parseInt(searchParams.page as string) || 1
    const { categories, totalCount, totalPages, currentPage } = await getCategories(num)

    return (
        <section className="space-y-3">
            <HeaderButtons href="/dashboard/categories/new" />

            <Card>
                <PageHeader title="Categories" description="Manage your categories here" />

                <CardContent>
                    <CategoryTable categories={categories} />
                </CardContent>

                <TablePagination title={'categories'} totalCount={totalCount} totalPages={totalPages} currentPage={currentPage} pageSize={pageSize} />
            </Card>
        </section>
    )
}

export default CategoriesPage
