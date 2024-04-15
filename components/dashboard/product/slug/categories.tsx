'use client'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next13-progressbar'
import type { Category } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Combobox } from '@/components/ui/combobox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProductCategories({ form, categories, loading }: { form: any; categories: Category[]; loading: boolean }) {
    const router = useRouter()
    const pathname = usePathname()
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    const data = categories.map(category => ({ label: category.name, value: category.name })) || []

    const onSelectCategory = (selected: string[]) => {
        const selectedIds = selected.map(categoryName => categories.find(category => category.name === categoryName)?.id).filter(Boolean)
        setSelectedCategories(selected)
        form.setValue('categories', selectedIds)
    }

    const onRemoveCategory = (category: string) => {
        form.setValue(
            'categories',
            form.getValues('categories').filter((categoryId: string) => categories.find(category => category.id === categoryId)?.name !== category)
        )
        setSelectedCategories(prevCategories => prevCategories.filter(selectedCategory => selectedCategory !== category))
    }

    useEffect(() => {
        const initialValues = form.getValues('categories')
        const selectedCategoryNames = initialValues.map((categoryId: string) => categories.find(category => category.id === categoryId)?.name)
        setSelectedCategories(selectedCategoryNames)
    }, [form, categories])

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <CardTitle>Product Category</CardTitle>
                        <CardDescription>Manage product categories</CardDescription>
                    </div>
                    <Button onClick={() => router.push(`/dashboard/categories/new?callback=${pathname}`)} disabled={loading} type="button" variant="link" size="sm">
                        Add Categories
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="category">Categories</Label>

                        <div className="flex flex-wrap items-center gap-2">
                            {selectedCategories.map((category, index) => (
                                <Badge key={index} className="flex cursor-pointer select-none items-center gap-2 capitalize" onClick={() => !loading && onRemoveCategory(category)}>
                                    {category}
                                    <X className="size-3" />
                                </Badge>
                            ))}
                        </div>

                        {selectedCategories.length < categories.length && <Combobox loading={loading} title="categories" data={data} selected={selectedCategories} setSelected={onSelectCategory} />}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
