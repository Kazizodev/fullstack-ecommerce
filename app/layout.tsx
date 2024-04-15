import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import NextProgress from '@/components/next-progress'
import SessionProvider from '@/components/session-provider'
import { TailwindIndicator } from '@/components/tailwind-indicator'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = { title: 'Ecommerce App', description: 'A simple ecommerce app made by Hamza Hajar' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <SessionProvider>{children}</SessionProvider>
                    <Toaster richColors />
                    <NextProgress />
                    <TailwindIndicator />
                </ThemeProvider>
            </body>
        </html>
    )
}
