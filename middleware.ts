import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
    async function middleware(req) {
        const token = await getToken({ req })
        const isAuth = !!token
        const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register')
        const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/d')

        if (isAuthPage) {
            if (isAuth) return NextResponse.redirect(new URL('/dashboard', req.url))

            return null
        }

        if (!isAuth && isDashboardPage) {
            let from = req.nextUrl.pathname
            if (req.nextUrl.search) from += req.nextUrl.search

            return NextResponse.redirect(new URL(`/login`, req.url))
        }
    },
    {
        callbacks: {
            async authorized() {
                return true
            },
        },
    }
)

export const config = {
    matcher: ['/', '/dashboard', '/dashboard/:path*', '/login', '/register', '/d', '/d/:path*'],
}
