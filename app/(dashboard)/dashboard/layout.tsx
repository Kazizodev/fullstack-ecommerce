import SideNav from '@/components/nav/side-nav'
import { getCurrentUser } from '@/lib/server-session'
import { redirect } from 'next/navigation'

// export const dynamic = 'force-dynamic'

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const user = await getCurrentUser()

    if (user?.role !== 'admin') redirect('/d')
    return (
        <main className="flex">
            <SideNav user={user?.email} />
            <div className="ml-16 min-h-screen grow bg-muted/40 px-2 py-8 md:px-4 lg:px-8">{children}</div>
        </main>
    )
}
