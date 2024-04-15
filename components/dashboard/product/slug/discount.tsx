import { z } from 'zod'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'
import productSchema from '@/lib/schemas/product'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const ProductDiscount = ({ form, loading }: { form: UseFormReturn<z.infer<typeof productSchema>>; loading: boolean }) => {
    const isDiscount = form.watch('isDiscount')

    useEffect(() => {
        if (!isDiscount) {
            form.setValue('discount.amount', undefined)
            form.setValue('discount.isPercentage', false)
            form.setValue('discount.startDate', undefined)
            form.setValue('discount.endDate', undefined)
        }
    }, [form, isDiscount])

    return (
        <>
            <Card className="">
                <CardHeader>
                    <FormField
                        control={form.control}
                        name="isDiscount"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-row items-start space-x-3 space-y-0 rounded-md ">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={loading} />
                                </FormControl>
                                <div>
                                    <FormLabel className="space-y-2 leading-none">
                                        <CardTitle>Discount</CardTitle>
                                        <CardDescription className="font-normal">Add a discount to this product to attract more customers</CardDescription>
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                </CardHeader>

                {form.watch('isDiscount') && (
                    <CardContent>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="discount.isPercentage"
                                render={({ field }) => (
                                    <FormItem className="flex w-full flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={loading} />
                                        </FormControl>
                                        <div className="space-y-2 leading-none">
                                            <FormLabel>Percentage?</FormLabel>
                                            <FormDescription>The amount will be calculated as a percentage</FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="discount.amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="discount.amount"
                                                placeholder="Enter the amount"
                                                type="number"
                                                className="w-full"
                                                min={1}
                                                max={form.getValues('discount.isPercentage') ? 100 : undefined}
                                                disabled={loading}
                                                {...field}
                                                onChange={e =>
                                                    field.onChange(form.getValues('discount.isPercentage') ? Math.min(100, Math.max(1, parseInt(e.target.value))) : parseInt(e.target.value))
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="discount.startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full"
                                                disabled={loading}
                                                type="datetime-local"
                                                id="discount.startDate"
                                                {...field}
                                                value={field.value ? format(new Date(field.value), "yyyy-MM-dd'T'HH:mm") : ''}
                                                onChange={e => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="discount.endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full"
                                                disabled={loading}
                                                id="discount.endDate"
                                                type="datetime-local"
                                                {...field}
                                                value={field.value ? format(new Date(field.value), "yyyy-MM-dd'T'HH:mm") : ''}
                                                onChange={e => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                )}
            </Card>
        </>
    )
}

export default ProductDiscount
