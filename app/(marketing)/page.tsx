import db from '@/lib/db'
import type { Product } from '@prisma/client'
import Products from '@/components/marketing/home/products'

async function getProducts() {
    const products = await db.product.findMany({ orderBy: { createdAt: 'desc' } })
    return products as Product[]
}

export default async function Home() {
    const products = await getProducts()

    return (
        <section>
            <Products data={products} />
        </section>
    )
}
