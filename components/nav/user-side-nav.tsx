'use client'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { UserNavigations } from '@/context/navigations'

const UserSideNav = () => {
    const pathname = usePathname()

    return (
        <nav>
            <ul className="grid gap-4 text-sm text-muted-foreground">
                {UserNavigations.map((nav, index) => (
                    <li key={index}>
                        <Link
                            href={nav.href}
                            className={cn(
                                nav.href !== '/d' ? pathname.includes(nav.href) && 'font-medium text-primary' : pathname === nav.href && 'font-medium text-primary',
                                'hover:font-medium hover:text-primary'
                            )}>
                            {nav.name}
                        </Link>
                    </li>
                ))}
                <li>
                    <button type="button" onClick={() => signOut()} className="hover:font-medium hover:text-destructive">
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default UserSideNav
