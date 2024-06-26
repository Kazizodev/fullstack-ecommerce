import React from 'react'
import { Button } from './button'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next13-progressbar'
import { ChevronLeft, Loader2 } from 'lucide-react'

type FormHeaderProps = {
    title: string
    loading?: boolean
    callback?: string | string[] | undefined
}

const FormHeader: React.FC<FormHeaderProps> = ({ callback, title, loading }) => {
    const router = useRouter()
    const pathname = usePathname()

    // ? pathname but without last segment
    const url = pathname.split('/').slice(0, -1).join('/')
    const backUrl = callback ? callback.toString() : url

    return (
        <div className="flex items-center gap-4">
            <Button type="button" onClick={() => router.push(backUrl)} disabled={loading} variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Button>

            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold capitalize tracking-tight sm:grow-0">{title}</h1>

            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button type="button" onClick={() => router.push(url)} disabled={loading} variant="outline" size="sm">
                    Discard
                </Button>
                <Button type="submit" size="sm" disabled={loading}>
                    {loading && <Loader2 className="mr-2 size-4 animate-spin" />} Save Product
                </Button>
            </div>
        </div>
    )
}

export default FormHeader
