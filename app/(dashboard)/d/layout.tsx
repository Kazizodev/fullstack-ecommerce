import UserSideNav from '@/components/nav/user-side-nav'
import UserDashboardTitle from '@/components/nav/user-dashboard-title'

// export const dynamic = 'force-dynamic'

export default async function UserDashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex min-h-screen flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
            <UserDashboardTitle />

            <div className="mx-auto grid w-full max-w-7xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <UserSideNav />
                <div>{children}</div>
            </div>
        </main>
    )
}
