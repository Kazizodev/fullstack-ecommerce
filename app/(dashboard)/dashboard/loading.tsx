import { Loader2 } from 'lucide-react'

const AdminLoading = () => {
    return (
        <div className="ml-16 flex items-center justify-center">
            <Loader2 className="size-14 animate-spin text-primary" />
        </div>
    )
}

export default AdminLoading
