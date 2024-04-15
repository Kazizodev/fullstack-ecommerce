export default function MarketingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex min-h-screen flex-col">
            <section className="grid grow place-items-center">{children}</section>
        </main>
    )
}
