'use client'
import { Button } from '../ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next13-progressbar'

const UserDashboardTitle = () => {
    const router = useRouter()

    return (
        <header className="mx-auto grid w-full max-w-7xl gap-2">
            <div className="flex items-center gap-4">
                <Button type="button" onClick={() => router.push('/')} variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>

                <h1 className="text-3xl font-semibold">Settings</h1>
            </div>
        </header>
    )
}

export default UserDashboardTitle
