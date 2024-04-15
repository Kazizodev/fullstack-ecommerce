'use client'
import { CardFooter } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { usePathname } from 'next/navigation'

type TablePaginationProps = {
    title: string
    pageSize: number
    totalCount: number
    totalPages: number
    currentPage: number
}

const generatePaginationLinks = (link: string, currentPage: number, totalPages: number) => {
    const paginationLinks = []

    // ? Add previous page link
    paginationLinks.push(
        <PaginationItem key="prev" className="max-sm:hidden">
            <PaginationPrevious href={`${link}?page=${currentPage - 1}`} className={currentPage === 1 || currentPage > totalPages ? 'pointer-events-none opacity-60' : ''} />
        </PaginationItem>
    )

    // ? Add page links
    const maxPagesToShow = totalPages > 4 ? 4 : totalPages
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)
    const numButtons = Math.min(endPage - startPage + 1, maxPagesToShow)

    // ? Adjust startPage and endPage if there are not enough buttons to show
    if (numButtons < maxPagesToShow) {
        if (currentPage < Math.ceil(maxPagesToShow / 2)) endPage = maxPagesToShow
        else startPage = Math.max(1, totalPages - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationLinks.push(
            <PaginationItem key={i}>
                <PaginationLink isActive={i === currentPage} href={`${link}?page=${i}`}>
                    {i}
                </PaginationLink>
            </PaginationItem>
        )
    }

    // ? Add ellipsis before first page link if needed
    if (startPage > 2)
        paginationLinks.splice(
            1,
            0,
            <PaginationItem key="ellipsis1">
                <PaginationEllipsis />
            </PaginationItem>
        )

    // ? Add ellipsis after last page link if needed
    if (endPage < totalPages)
        paginationLinks.push(
            <PaginationItem key="ellipsis2">
                <PaginationEllipsis />
            </PaginationItem>
        )

    // ? Add next page link
    paginationLinks.push(
        <PaginationItem key="next" className="max-sm:hidden">
            <PaginationNext href={`${link}?page=${currentPage + 1}`} className={currentPage === totalPages || currentPage > totalPages ? 'pointer-events-none opacity-60' : ''} />
        </PaginationItem>
    )

    return paginationLinks
}

const TablePagination: React.FC<TablePaginationProps> = ({ title, totalCount, totalPages, currentPage, pageSize }) => {
    const pathname = usePathname()
    const link = pathname.split('?')[0]

    return (
        <CardFooter className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground">
                Showing{' '}
                <strong>
                    {Math.min(currentPage * pageSize - pageSize + 1, totalCount)}-{totalCount > pageSize * currentPage ? currentPage * pageSize : totalCount}
                </strong>{' '}
                of <strong>{totalCount}</strong> {title}
            </div>

            <div className="flex w-full items-center justify-center sm:w-auto">
                <Pagination>
                    <PaginationContent>{generatePaginationLinks(link, currentPage, totalPages)}</PaginationContent>
                </Pagination>
            </div>
        </CardFooter>
    )
}

export default TablePagination
