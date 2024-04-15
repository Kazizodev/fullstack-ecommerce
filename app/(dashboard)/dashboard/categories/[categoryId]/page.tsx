import db from '@/lib/db'
import { Metadata } from 'next'
import type { Category } from '@prisma/client'
import CategoryForm from '@/components/dashboard/category/category-form'

export const metadata: Metadata = { title: 'Add Category', description: 'Add a new category to your store' }

async function getCategory(categoryId: string) {
    const category = await db.category.findUnique({ where: { id: categoryId } })
    return category as Category
}

const CategoryFormPage = async ({ params, searchParams }: { params: { categoryId: string }; searchParams: { [key: string]: string | string[] | undefined } }) => {
    const category = await getCategory(params.categoryId)

    return (
        <div className="mx-auto grid max-w-7xl items-start gap-4 md:gap-8">
            <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
                <CategoryForm callback={searchParams.callback} initialData={category} />
            </div>
        </div>
    )
}

export default CategoryFormPage
