"use client";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export function BlogsPagination({ page, setPage, pagination }) {
    if (pagination?.totalPages <= 1) return null;

    const totalPages = pagination.totalPages;

    return (
        <Pagination className="mt-6">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => page > 1 && setPage(page - 1)}
                        className={page === 1 ? "pointer-events-none opacity-40" : ""}
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink isActive className="hover:text-white">
                        {page}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        onClick={() => page < totalPages && setPage(page + 1)}
                        className={page === totalPages ? "pointer-events-none opacity-40" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
