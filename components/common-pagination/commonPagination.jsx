"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export function CommonPagination({ pagination, onPageChange }) {
    if (!pagination || pagination.totalPages <= 1) return null;

    const { page, totalPages } = pagination;

    return (
        <Pagination className="mt-6">
            <PaginationContent>

                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => page > 1 && onPageChange(page - 1)}
                        className={
                            page === 1 ? "pointer-events-none opacity-40" : ""
                        }
                    />
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink isActive className={"hover:text-white"}>
                        {page}
                    </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext
                        onClick={() =>
                            page < totalPages && onPageChange(page + 1)
                        }
                        className={
                            page === totalPages
                                ? "pointer-events-none opacity-40"
                                : ""
                        }
                    />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    );
}
