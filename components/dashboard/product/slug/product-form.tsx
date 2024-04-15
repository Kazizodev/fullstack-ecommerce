'use client'
import { toast } from 'sonner'
import ProductState from './state'
import ProductDetails from './details'
import ProductVariants from './variants'
import ProductDiscount from './discount'
import { Form } from '@/components/ui/form'
import ProductCategories from './categories'
import { useRouter } from 'next13-progressbar'
import productSchema from '@/lib/schemas/product'
import { useAction } from 'next-safe-action/hooks'
import { z, useForm, zodResolver } from '@/lib/zod'
import FormHeader from '@/components/ui/form-header'
// import ProductImages from '@/components/dashboard/product/slug/images'
import type { Category, Discount, Product, Variant } from '@prisma/client'
import { addSafeProduct } from '@/app/(dashboard)/dashboard/products/_actions/product'

type ProductWithVariants = Product & {
    variants: Variant[]
    categories: Category[]
    discount?: Discount
}
interface ProductFormProps {
    initialData?: ProductWithVariants
    categories: Category[]
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, categories }) => {
    const router = useRouter()

    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            id: initialData?.id || '',
            name: initialData?.name || '',
            price: initialData?.price || 1,
            description: initialData?.description || '',
            categories: initialData?.categories.map(category => category.id) || [],
            state: initialData?.state ? (initialData.state as 'draft' | 'published') : 'draft',
            variants: initialData ? initialData.variants.map(variant => ({ id: variant.id, name: variant.name, quantity: variant.quantity })) : [{ id: '', name: '#000000', quantity: 0 }],
            isDiscount: initialData?.discount ? true : false,
            discount: {
                id: initialData?.discount?.id || undefined,
                amount: initialData?.discount?.amount || 0,
                isPercentage: initialData?.discount?.isPercentage || false,
                startDate: initialData?.discount?.startDate ? new Date(initialData.discount.startDate) : undefined,
                endDate: initialData?.discount?.endDate ? new Date(initialData.discount.endDate) : undefined,
            },
        },
    })

    const { execute, status } = useAction(addSafeProduct, {
        onSuccess: data => {
            if (data.error) toast.error(data.error)
            if (data.success) {
                toast.success(`Product ${initialData?.id ? 'updated' : 'added'} successfully`)
                router.push('/dashboard/products')
            }
        },
    })
    const onSubmit = async (values: z.infer<typeof productSchema>) => execute(values)

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormHeader loading={status === 'executing'} title={initialData ? initialData.name : 'Create Product'} />

                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            <ProductDetails loading={status === 'executing'} form={form} />

                            <ProductVariants loading={status === 'executing'} form={form} />

                            <ProductCategories loading={status === 'executing'} form={form} categories={categories} />
                        </div>

                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                            <ProductState loading={status === 'executing'} form={form} />

                            <ProductDiscount loading={status === 'executing'} form={form} />

                            {/* <ProductImages /> */}
                        </div>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default ProductForm
