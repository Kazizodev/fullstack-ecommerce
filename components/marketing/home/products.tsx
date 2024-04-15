import Link from 'next/link'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import type { Product } from '@prisma/client'
import { formatCurrency } from '@/lib/formatters'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const Products = ({ data }: { data: Product[] }) => {
    return (
        <section>
            <div className="mx-auto max-w-screen-xl py-8 sm:py-12">
                <header>
                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>

                    <p className="mt-4 max-w-md text-gray-500">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit natus?
                    </p>
                </header>

                <div className="mt-8 block lg:hidden">
                    <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                        <span className="text-sm font-medium"> Filters & Sorting </span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>

                <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
                    <div className="hidden space-y-4 lg:block">
                        <div>
                            <Label htmlFor="SortBy">Sort By</Label>

                            <Select>
                                <SelectTrigger className="mt-1 rounded text-sm">
                                    <SelectValue placeholder="Select value" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="latest">Sort by latest</SelectItem>
                                    <SelectItem value="popularity">Sort by popularity</SelectItem>
                                    <SelectItem value="price-desc">Sort by Price: low to high</SelectItem>
                                    <SelectItem value="price-asc">Sort by Price: high to low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <p className="block text-xs font-medium text-gray-700">Filters</p>

                            <div className="mt-1 space-y-2">
                                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                                        <span className="text-sm font-medium"> Availability </span>

                                        <span className="transition group-open:-rotate-180">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </span>
                                    </summary>

                                    <div className="border-t border-gray-200 bg-white">
                                        <header className="flex items-center justify-between p-4">
                                            <span className="text-sm text-gray-700"> 0 Selected </span>

                                            <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                Reset
                                            </button>
                                        </header>

                                        <ul className="space-y-1 border-t border-gray-200 p-4">
                                            <li>
                                                <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterInStock" className="size-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> In Stock (5+) </span>
                                                </label>
                                            </li>

                                            <li>
                                                <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterPreOrder" className="size-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
                                                </label>
                                            </li>

                                            <li>
                                                <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterOutOfStock" className="size-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </details>

                                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                                        <span className="text-sm font-medium"> Price </span>

                                        <span className="transition group-open:-rotate-180">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </span>
                                    </summary>

                                    <div className="border-t border-gray-200 bg-white">
                                        <header className="flex items-center justify-between p-4">
                                            <span className="text-sm text-gray-700"> The highest price is $600 </span>

                                            <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                Reset
                                            </button>
                                        </header>

                                        <div className="border-t border-gray-200 p-4">
                                            <div className="flex justify-between gap-4">
                                                <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-600">$</span>

                                                    <input type="number" id="FilterPriceFrom" placeholder="From" className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
                                                </label>

                                                <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-600">$</span>

                                                    <input type="number" id="FilterPriceTo" placeholder="To" className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </details>

                                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                                        <span className="text-sm font-medium"> Colors </span>

                                        <span className="transition group-open:-rotate-180">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </span>
                                    </summary>

                                    <div className="border-t border-gray-200 bg-white">
                                        <header className="flex items-center justify-between p-4">
                                            <span className="text-sm text-gray-700"> 0 Selected </span>

                                            <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                Reset
                                            </button>
                                        </header>

                                        <ul className="space-y-1 border-t border-gray-200 p-4">
                                            <li>
                                                <label htmlFor="FilterRed" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterRed" className="size-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Red </span>
                                                </label>
                                            </li>

                                            <li>
                                                <label htmlFor="FilterBlue" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterBlue" className="size-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Blue </span>
                                                </label>
                                            </li>

                                            <li>
                                                <label htmlFor="FilterGreen" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterGreen" className="size-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Green </span>
                                                </label>
                                            </li>

                                            <li>
                                                <label htmlFor="FilterOrange" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterOrange" className="size-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Orange </span>
                                                </label>
                                            </li>

                                            <li>
                                                <label htmlFor="FilterPurple" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterPurple" className="size-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Purple </span>
                                                </label>
                                            </li>

                                            <li>
                                                <label htmlFor="FilterTeal" className="inline-flex items-center gap-2">
                                                    <input type="checkbox" id="FilterTeal" className="size-5 rounded border-gray-300" />

                                                    <span className="text-sm font-medium text-gray-700"> Teal </span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {data.map(product => (
                                <li key={product.id}>
                                    <Link href={`/p/${product.slug}`} className="group block overflow-hidden">
                                        <Image
                                            width={500}
                                            height={500}
                                            alt={product.name}
                                            className="aspect-square h-auto w-full object-cover transition duration-500 group-hover:scale-105"
                                            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                        />

                                        <div className="relative bg-background pt-3">
                                            <h3 className="text-xs text-muted-foreground group-hover:underline group-hover:underline-offset-4">{product.name}</h3>

                                            <p className="mt-2">
                                                <span className="sr-only">Regular Price</span>
                                                <span className="tracking-wider">{formatCurrency(product.price)}</span>
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Products
