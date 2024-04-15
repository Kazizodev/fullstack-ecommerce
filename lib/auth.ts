import db from './db'
import bcrypt from 'bcrypt'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,
    jwt: { maxAge: 60 * 60 },
    session: { maxAge: 60 * 60 * 24 * 7 },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: { email: { label: 'email', type: 'email', required: true }, password: { label: 'Password', type: 'password', required: true } },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null
                const { email, password } = credentials

                const user = await db.user.findFirst({ where: { email } })
                if (!user) return null

                const match = await bcrypt.compare(password, user.password!)
                if (!match) return null

                return user
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === 'update') return { ...token, ...session.user }
            return { ...token, ...user }
        },
        async session({ session, token }) {
            session.user = token as any
            return session
        },
    },
}
