'use client'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Navigations } from '@/context/navigations'

const SideNav = ({ user }: { user: string | null | undefined }) => {
    const pathname = usePathname()

    return (
        <div className="fixed left-0 top-0 flex h-screen w-16 flex-col justify-between border-e bg-background">
            <div>
                <div className="group relative inline-flex size-16 select-none items-center justify-center">
                    <span className="grid size-10 cursor-pointer place-content-center rounded-lg bg-muted text-xs capitalize text-foreground">{user?.charAt(0)}</span>

                    <span className="invisible absolute start-full top-1/2 ms-2 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">{user}</span>
                </div>

                <div className="border-t border-muted">
                    <div className="px-2">
                        <ul className="space-y-1 border-t border-muted pt-4">
                            {Navigations.map((nav, index) => (
                                <li key={index}>
                                    <Button
                                        variant="custom"
                                        size="custom"
                                        className={cn(nav.href !== '/dashboard' ? pathname.includes(nav.href) && 'bg-primary/10 text-primary' : pathname === nav.href && 'bg-primary/10 text-primary')}
                                        asChild>
                                        <Link href={nav.href}>
                                            {nav.icon}

                                            <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                                {nav.name}
                                            </span>
                                        </Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-muted bg-background p-2">
                <Button onClick={() => signOut()} type="button" variant="custom" size="custom" className=" hover:bg-destructive/10 hover:text-destructive">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                        />
                    </svg>

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">Logout</span>
                </Button>
            </div>
        </div>
    )
}

export default SideNav
