import db from '@/lib/db'
import { Minus, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/formatters'
import { GetColorName } from 'hex-color-to-color-name'
import type { Category, Discount, Product, Variant } from '@prisma/client'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Image from 'next/image'

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const product = await getProductBySlug(params.slug)
    return {
        title: product.name,
        description: product.description,
        url: `${process.env.NEXTAUTH_URL}/${product.slug}`,
        type: 'product',
    }
}

type ProductWithVariants = Product & { variants: Variant[]; discount: Discount; categories: Category[] }
async function getProductBySlug(slug: string) {
    const product = await db.product.findFirst({ where: { slug }, include: { categories: true, variants: true, discount: { where: { endDate: { gte: new Date() } } } } })
    const finalProduct = { ...product, discount: product?.discount[0] }
    return finalProduct as ProductWithVariants
}

const ProductPage = async ({ params }: { params: { slug: string } }) => {
    const product = await getProductBySlug(params.slug)

    return (
        <div className="py-8">
            <div className="grid grid-cols-3 gap-4 md:gap-8 lg:gap-12">
                <div className="col-span-1">
                    <div className="flex flex-col space-y-4">
                        <Image alt="Featured product" className="w-full" height={500} width={300} src="/placeholder.svg" style={{ aspectRatio: '300/500', objectFit: 'cover' }} />
                    </div>
                </div>

                <div className="col-span-2">
                    {/* Title */}
                    <h1 className="text-2xl font-bold">{product.name}</h1>

                    {/* Price */}
                    {product.discount ? (
                        <>
                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-bold text-red-600 line-through">{formatCurrency(product.price)}</span>
                                <Badge variant="destructive">{product.discount.isPercentage ? '-' + product.discount.amount + '%' : formatCurrency(product.discount.amount) + ' off'}</Badge>
                            </div>
                            <div className="text-3xl font-bold">
                                {product.discount.isPercentage ? formatCurrency(product.price * (1 - product.discount.amount / 100)) : formatCurrency(product.price - product.discount.amount)}
                            </div>
                        </>
                    ) : (
                        <div className="text-3xl font-bold">{formatCurrency(product.price)}</div>
                    )}

                    {/* Color Variants */}
                    <div className="my-4 space-y-2">
                        <h3 className="font-semibold">Color</h3>
                        <div className="flex space-x-2">
                            {product.variants.map(variant => (
                                <TooltipProvider delayDuration={0} key={variant.id}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div key={variant.id} className="size-10 cursor-pointer rounded-full border" style={{ backgroundColor: variant.name }} />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-foreground font-medium capitalize">{GetColorName(variant.name)}</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="my-4 flex items-center space-x-4">
                        <label className="font-semibold" htmlFor="quantity">
                            Quantity:
                        </label>
                        <div className="flex items-center gap-1">
                            <button type="button" className="grid size-10 place-items-center leading-10 text-gray-600 transition hover:opacity-75">
                                <Minus className="size-4" />
                            </button>

                            <Input type="number" id="Quantity" value="1" className="h-10 w-24 rounded border-gray-200 sm:text-sm" />

                            <button type="button" className="grid size-10 place-items-center leading-10 text-gray-600 transition hover:opacity-75">
                                <Plus className="size-4" />
                            </button>
                        </div>
                    </div>

                    {/* Button */}
                    <Button>ADD TO CART</Button>

                    {/* Details */}
                    <div className="mt-4">
                        <h3 className="font-semibold">Product Detail</h3>
                        <p className="">{product.description}</p>
                    </div>
                </div>
            </div>

            {/* Other section */}
            {/* <div className="mt-8">
                <h2 className="text-xl font-bold">SIMILAR ITEMS</h2>
                <div className="grid grid-cols-4 gap-4">
                    <img
                        alt="Similar item"
                        className="w-full"
                        height="300"
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: '200/300',
                            objectFit: 'cover',
                        }}
                        width="200"
                    />
                    <img
                        alt="Similar item"
                        className="w-full"
                        height="300"
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: '200/300',
                            objectFit: 'cover',
                        }}
                        width="200"
                    />
                    <img
                        alt="Similar item"
                        className="w-full"
                        height="300"
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: '200/300',
                            objectFit: 'cover',
                        }}
                        width="200"
                    />
                    <img
                        alt="Similar item"
                        className="w-full"
                        height="300"
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: '200/300',
                            objectFit: 'cover',
                        }}
                        width="200"
                    />
                </div>
            </div> */}
        </div>
    )
}

export default ProductPage
