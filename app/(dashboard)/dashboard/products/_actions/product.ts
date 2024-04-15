'use server'
import db from '@/lib/db'
import { slugify } from '@/lib/utils'
import { action } from '@/lib/safe-actions'
import { revalidatePath } from 'next/cache'
import productSchema from '@/lib/schemas/product'

export const addSafeProduct = action(productSchema, async ({ id, name, description, price, state, categories, variants, isDiscount, discount }) => {
    if (!name) return { error: 'Name is required' }
    if (!price) return { error: 'Price is required' }
    if (!state) return { error: 'State is required' }
    if (!description) return { error: 'Description is required' }
    if (isDiscount && (!discount?.amount || !discount.startDate || !discount.endDate || isNaN(discount.amount))) return { error: 'Discount is incomplete or invalid' }

    if (!id) {
        const product = await db.product.create({
            data: {
                name,
                price,
                state,
                description,
                slug: slugify(name),
                categories: { connect: categories?.map(id => ({ id })) || [] },
                variants: { createMany: { data: variants.map(variant => ({ name: variant.name, quantity: variant.quantity })) } },
                discount: isDiscount ? { create: { amount: discount.amount!, isPercentage: discount.isPercentage!, startDate: discount.startDate!, endDate: discount.endDate! } } : undefined,
            },
        })
        if (!product) return { error: 'Failed to create product' }
    } else {
        // ? Check if product exists
        const newProduct = await db.product.findUnique({
            where: { id },
            include: { variants: true, discount: { where: { endDate: { gte: new Date() } }, orderBy: { startDate: 'desc' }, take: 1 } },
        })
        if (!newProduct) return { error: 'Product not found' }
        const existingProduct = { ...newProduct, discount: newProduct?.discount[0] }

        // ? Delete variants that are not in the new list
        const existingVariantIds = existingProduct.variants.map(variant => variant.id)
        const newVariantIds = variants.map(variant => variant.id)
        const variantsToDeleteIds = existingVariantIds.filter(id => !newVariantIds.includes(id))
        await db.variant.deleteMany({ where: { id: { in: variantsToDeleteIds } } })

        // ? If there is a discount, update it, else create a new one
        if (isDiscount) {
            if (existingProduct.discount)
                await db.discount.update({
                    where: { id: existingProduct.discount.id },
                    data: { amount: discount.amount, isPercentage: discount.isPercentage, startDate: discount.startDate, endDate: discount.endDate },
                })
            else
                await db.discount.create({
                    data: { amount: discount.amount!, isPercentage: discount.isPercentage!, startDate: discount.startDate!, endDate: discount.endDate!, product: { connect: { id } } },
                })
        }

        // ? Update product
        const product = await db.product.update({ where: { id }, data: { name, slug: slugify(name), description, price, state, categories: { set: categories?.map(id => ({ id })) || [] } } })
        if (!product) return { error: 'Failed to update product' }

        // ? Create or update variants
        for (const variant of variants) {
            if (variant.id) await db.variant.update({ where: { id: variant.id }, data: { name: variant.name, quantity: variant.quantity } })
            else await db.variant.create({ data: { name: variant.name, quantity: variant.quantity, productId: id } })
        }
    }

    revalidatePath('/dashboard/products')
    return { success: true }
})

export const onDeleteProduct = async (id: string) => {
    const product = await db.product.delete({ where: { id } })
    if (!product) throw new Error('Failed to delete product')

    revalidatePath('/dashboard/products')
}
