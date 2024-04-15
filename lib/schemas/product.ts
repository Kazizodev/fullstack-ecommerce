import { z } from 'zod'

const discountSchema = z
    .object({
        endDate: z.date().optional(),
        startDate: z.date().optional(),
        isPercentage: z.boolean().optional(),
        id: z.optional(z.string()).optional(),
        amount: z.number().min(0, 'Amount must be at least 0').optional(),
    })
    .refine(data => data.endDate === undefined || data.startDate === undefined || data.endDate > data.startDate, {
        message: 'End date must be larger than start date.',
        path: ['endDate'],
    })
    .refine(data => data.endDate === undefined || data.startDate === undefined || data.endDate >= new Date(), {
        message: 'End date must be larger than current date.',
        path: ['endDate'],
    })

const productSchema = z
    .object({
        id: z.optional(z.string()),
        state: z.enum(['draft', 'published']),
        name: z.string().min(3, 'Name must be at least 3 characters'),
        price: z.coerce.number().min(0.5, 'Price must be at least 0.5').default(0.5),
        description: z.string().min(10, 'Description must be at least 10 characters'),
        categories: z.array(z.string()),
        variants: z.array(z.object({ id: z.optional(z.string()), name: z.string(), quantity: z.number().min(0, 'Quantity must be at least 0') })),

        isDiscount: z.boolean().default(false),
        discount: discountSchema,
    })
    .refine(
        data =>
            data.isDiscount !== true ||
            (data.discount.endDate !== undefined && data.discount.startDate !== undefined && data.discount.isPercentage !== undefined && data.discount.amount !== undefined),
        {
            message: 'Please fill in all discount fields.',
            path: ['isDiscount'],
        }
    )

export default productSchema
