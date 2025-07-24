'use client'

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, ListFilter } from "lucide-react"
import { useState } from "react"

const columns = [
    { label: "Product", value: "Title" },
    { label: "Category", value: "CategoryId" },
    { label: "Serve Person", value: "ServePerson" },
    { label: "Pieces", value: "Pieces" },
    { label: "Quantity", value: "Quantity" }
]

export default function FilterDropdown({ onSortChange }) {
    const [sortDirection, setSortDirection] = useState("asc")

    const handleSort = (column) => {
        const direction = sortDirection === "asc" ? "desc" : "asc"
        setSortDirection(direction)
        onSortChange({ id: column, desc: direction === "desc" })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="px-10"><ListFilter /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {columns.map((col) => (
                    <DropdownMenuItem key={col.value} onClick={() => handleSort(col.value)}>
                        {col.label}
                        {sortDirection === "asc" ? (
                            <ArrowUp className="ml-auto h-4 w-4" />
                        ) : (
                            <ArrowDown className="ml-auto h-4 w-4" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
