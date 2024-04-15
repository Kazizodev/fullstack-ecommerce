import db from '@/lib/db'
import { Metadata } from 'next'
import type { Category, Discount, Product, Variant } from '@prisma/client'
import ProductForm from '@/components/dashboard/product/slug/product-form'

export const metadata: Metadata = { title: 'Add Product', description: 'Add a new product to your store' }

type ProductWithVariants = Product & {
    variants: Variant[]
    categories: Category[]
    discount: Discount
}
async function getProduct(productId: string) {
    const product = await db.product.findUnique({
        where: { id: productId },
        include: { variants: true, categories: { select: { id: true, name: true } }, discount: { where: { endDate: { gte: new Date() } }, orderBy: { startDate: 'desc' }, take: 1 } },
    })
    if (product) {
        const productFiltered = { ...product, discount: product?.discount[0] }

        return productFiltered as ProductWithVariants
    } else return undefined
}

async function getCategories() {
    const categories = await db.category.findMany()
    return categories as Category[]
}

const ProductFormPage = async ({ params }: { params: { productId: string } }) => {
    const [product, categories] = await Promise.all([getProduct(params.productId), getCategories()])

    return (
        <div className="mx-auto grid max-w-7xl items-start gap-4 md:gap-8">
            <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
                <ProductForm initialData={product} categories={categories} />
            </div>
        </div>
    )
}

export default ProductFormPage
