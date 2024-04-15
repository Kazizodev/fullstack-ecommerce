'use client'
import { toast } from 'sonner'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { Category } from '@prisma/client'
import { useRouter } from 'next13-progressbar'
import { useAction } from 'next-safe-action/hooks'
import { z, useForm, zodResolver } from '@/lib/zod'
import categorySchema from '@/lib/schemas/category'
import FormHeader from '@/components/ui/form-header'
import { addSafeCategory } from '@/app/(dashboard)/dashboard/categories/_actions/category'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const CategoryForm = ({ initialData, callback }: { initialData?: Category; callback: string | string[] | undefined }) => {
    const router = useRouter()

    const form = useForm<z.infer<typeof categorySchema>>({ resolver: zodResolver(categorySchema), defaultValues: { id: initialData?.id, name: initialData?.name || '' } })

    const { execute, status } = useAction(addSafeCategory, {
        onSuccess: data => {
            if (data.error) toast.error(data.error)
            if (data.success) {
                toast.success(`Category ${initialData?.id ? 'updated' : 'added'} successfully`)
                router.push('/dashboard/categories')
            }
        },
    })

    const onSubmit = async (values: z.infer<typeof categorySchema>) => execute(values)

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormHeader callback={callback} loading={status === 'executing'} title={initialData ? initialData.name : 'Create Category'} />

                    <Card>
                        <CardHeader>
                            <CardTitle>Product Details</CardTitle>
                            <CardDescription>Manage product details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input id="name" autoFocus placeholder="Electronics" className="w-full" disabled={status === 'executing'} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </>
    )
}

export default CategoryForm
