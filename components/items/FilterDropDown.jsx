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



export default function FilterDropdown({ onSortChange, columns }) {
    const [sortDirection, setSortDirection] = useState("ASC")

    const handleSort = (column) => {
        const direction = sortDirection === "ASC" ? "DESC" : "ASC"
        setSortDirection(direction)
        onSortChange({ sortBy: column, sortOrder: direction })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="px-10"><ListFilter /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {columns?.map((col) => (
                    <DropdownMenuItem key={col.value} onClick={() => handleSort(col.value)}>
                        {col.label}
                        {sortDirection === "ASC" ? (
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
