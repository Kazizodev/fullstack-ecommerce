'use client'
import { toast } from 'sonner'
import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next13-progressbar'
import type { Product } from '@prisma/client'
import { Button } from '@/components/ui/button'
import AlertModal from '@/components/ui/alert-modal'
import { onDeleteProduct } from '@/app/(dashboard)/dashboard/products/_actions/product'
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

type CellActionsProps = {
    data: Product
}

const CellActions: React.FC<CellActionsProps> = ({ data }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)
            await onDeleteProduct(data.id)
            toast.success('Product deleted successfully')
        } catch (error) {
            console.error(error)
            toast.error('An error occurred while deleting the Product')
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
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/products/${data.id}`)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeleteModalOpen(true)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CellActions
