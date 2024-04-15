'use client'
import { toast } from 'sonner'
import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next13-progressbar'
import type { Category } from '@prisma/client'
import { Button } from '@/components/ui/button'
import AlertModal from '@/components/ui/alert-modal'
import { onDeleteCategory } from '@/app/(dashboard)/dashboard/categories/_actions/category'
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

type CellActionsProps = {
    data: Category
}

const CellActions: React.FC<CellActionsProps> = ({ data }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)
            await onDeleteCategory(data.id)
            toast.success('Category deleted successfully')
        } catch (error) {
            console.error(error)
            toast.error('An error occurred while deleting the category')
        } finally {
            setLoading(false)
            setDeleteModalOpen(false)
        }
    }

    return (
        <>
            <AlertModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={onDelete} loading={loading} />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/categories/${data.id}`)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeleteModalOpen(true)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CellActions
