import Link from 'next/link'
import { Button } from '../ui/button'

const DashboardButton = ({ role }: { role: string }) => {
    return (
        <>
            {role === 'admin' ? (
                <Button variant="outline" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
            ) : (
                <Button variant="outline" asChild>
                    <Link href="/d">Dashboard</Link>
                </Button>
            )}
        </>
    )
}

export default DashboardButton
