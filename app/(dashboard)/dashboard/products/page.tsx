import db from '@/lib/db'
import type { Discount, Product, Variant } from '@prisma/client'
import PageHeader from '@/components/ui/page-header'
import { Card, CardContent } from '@/components/ui/card'
import HeaderButtons from '@/components/ui/header-buttons'
import TablePagination from '@/components/ui/table-pagination'
import ProductTable from '@/components/dashboard/product/product-table'

export const metadata = { title: 'Products', description: 'Manage your products here' }

const pageSize = 10
type ProductWithVariants = Product & { variants: Variant[]; discount: Discount }
async function getProducts(pageNumber: number) {
    const totalCount = await db.product.count()
    const totalPages = Math.ceil(totalCount / pageSize)

    if (pageNumber > totalPages) pageNumber = 1

    const skip = (pageNumber - 1) * pageSize
    // Todo: Include how many orders have been made for each product
    const products = await db.product.findMany({
        take: pageSize,
        skip: skip,
        orderBy: { createdAt: 'desc' },
        where: { NOT: { isArchived: true } },
        include: { variants: true, discount: { where: { endDate: { gte: new Date() } }, orderBy: { startDate: 'desc' }, take: 1 } },
    })
    const productsFiltered = products.map(product => ({ ...product, discount: product?.discount[0] }))

    return { products: productsFiltered as ProductWithVariants[], totalCount: totalCount, totalPages: totalPages, currentPage: pageNumber }
}

const ProductsPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const num = parseInt(searchParams.page as string) || 1
    const { products, totalCount, totalPages, currentPage } = await getProducts(num)

    return (
        <section className="space-y-3">
            <HeaderButtons href="/dashboard/products/new" data={products} />

            <Card>
                <PageHeader title="Products" description="Manage your products here" />

                <CardContent>
                    <ProductTable data={products} />
                </CardContent>

                <TablePagination title={'products'} totalCount={totalCount} totalPages={totalPages} currentPage={currentPage} pageSize={pageSize} />
            </Card>
        </section>
    )
}

export default ProductsPage
