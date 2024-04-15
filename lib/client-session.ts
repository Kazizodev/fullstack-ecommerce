import { useSession } from 'next-auth/react'

export function GetCurrentUserClient() {
    const { data: session } = useSession()
    return session?.user
}

export function GetCurrentSession() {
    const session = useSession()
    return session
}
