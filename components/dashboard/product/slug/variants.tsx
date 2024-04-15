import { useState } from 'react'
import { cn, randomColor } from '@/lib/utils'
import { PlusCircle, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProductVariants({ form, loading }: { form: any; loading: boolean }) {
    const [variants, setVariants] = useState(form.getValues('variants').length)

    const addVariant = () => {
        setVariants(variants + 1)
        form.setValue('variants', [...form.getValues('variants'), { name: randomColor(), quantity: 0 }])
    }
    const removeVariant = (index: number) => {
        if (variants === 1) return

        setVariants(variants - 1)
        form.setValue(
            'variants',
            form.getValues('variants').filter((_: any, i: number) => i !== index)
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Color Variants</CardTitle>
                <CardDescription>Manage product color variants</CardDescription>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Color</TableHead>
                            <TableHead>Quantity</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {[...Array(variants)].map((_, index) => (
                            <TableRow key={`${index}-${form.getValues('variants')[index].name}`}>
                                <TableCell className="col-span-[0] sr-only hidden">
                                    <FormField
                                        control={form.control}
                                        name={`variants[${index}].id`}
                                        render={({ field }) => (
                                            <FormItem className="sr-only">
                                                <FormControl>
                                                    <Input id={`id-${index}`} disabled={loading} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Label htmlFor={`name-${index}`} className="sr-only">
                                        Color
                                    </Label>
                                    <FormField
                                        control={form.control}
                                        name={`variants[${index}].name`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        id={`name-${index}`}
                                                        type="color"
                                                        className="w-full"
                                                        disabled={loading}
                                                        {...field}
                                                        onChange={e => {
                                                            const value = e.target.value
                                                            const isValidColor = /^#[0-9A-Fa-f]{6}$/i.test(value)
                                                            if (isValidColor) field.onChange(e)
                                                            else console.error('Invalid color format. Please use "#rrggbb" format.')
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TableCell>

                                <TableCell>
                                    <Label htmlFor={`quantity-${index}`} className="sr-only">
                                        Quantity
                                    </Label>
                                    <FormField
                                        control={form.control}
                                        name={`variants[${index}].quantity`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        id={`quantity-${index}`}
                                                        type="number"
                                                        min={0}
                                                        placeholder="20"
                                                        className="w-full"
                                                        disabled={loading}
                                                        {...field}
                                                        onChange={e => {
                                                            const value = parseInt(e.target.value, 10)
                                                            field.onChange(value)
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TableCell>

                                <TableCell>
                                    <Button type="button" variant="ghost" className={cn(index === 0 && variants === 1 && 'invisible')} disabled={loading} onClick={() => removeVariant(index)}>
                                        <X className="size-4 text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>

            <CardFooter className="justify-center border-t p-4">
                <Button size="sm" variant="ghost" type="button" className="w-full gap-1" disabled={loading} onClick={addVariant}>
                    <PlusCircle className="h-3.5 w-3.5" />
                    Add Variant
                </Button>
            </CardFooter>
        </Card>
    )
}
