'use server'
import db from '@/lib/db'
import { action } from '@/lib/safe-actions'
import { revalidatePath } from 'next/cache'
import categorySchema from '@/lib/schemas/category'

export const addSafeCategory = action(categorySchema, async ({ id, name }) => {
    if (!name) return { error: 'Name is required' }

    const existingCategory = await db.category.findFirst({ where: { name: name.toLowerCase() } })
    if (existingCategory) return { error: 'Category already exists' }

    if (id) {
        const category = await db.category.update({ where: { id }, data: { name: name.toLowerCase() } })
        if (!category) return { error: 'Failed to update category' }
    } else {
        const category = await db.category.create({ data: { name: name.toLowerCase() } })
        if (!category) return { error: 'Failed to create category' }
    }

    revalidatePath('/dashboard/categories')
    return { success: true }
})

export const onDeleteCategory = async (id: string) => {
    const category = await db.category.delete({ where: { id } })
    if (!category) return { error: 'Failed to delete category' }

    revalidatePath('/dashboard/categories')
    return { success: category }
}
