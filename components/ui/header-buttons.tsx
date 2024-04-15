'use client'
import { useRouter } from 'next13-progressbar'
import { Button } from '@/components/ui/button'
import { File, PlusCircle } from 'lucide-react'
import { createAndDownloadCSV } from '@/lib/csv'

type HeaderButtonsProps = {
    href: string
    data?: any[]
}

const HeaderButtons: React.FC<HeaderButtonsProps> = ({ href, data }) => {
    const router = useRouter()

    const onExport = () => createAndDownloadCSV(data || [])

    return (
        <div className="flex justify-end gap-2">
            {data && (
                <Button size="sm" variant="outline" className="h-7 gap-1" onClick={onExport}>
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                </Button>
            )}

            <Button onClick={() => router.push(href)} size="sm" className="h-7 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
            </Button>
        </div>
    )
}

export default HeaderButtons
