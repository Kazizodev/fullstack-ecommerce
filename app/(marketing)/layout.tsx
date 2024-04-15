import Footer from '@/components/nav/footer'
import TopNav from '@/components/nav/top-nav'
import Container from '@/components/ui/container'

export default function MarketingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex min-h-screen flex-col">
            <TopNav />
            <div className="grow">
                <Container>{children}</Container>
            </div>
            <Footer />
        </main>
    )
}
