"use client"

import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { menuItems } from "./sidebar"

export default function Header() {
    const pathname = usePathname()
    const activePage = menuItems.find((item) => pathname.indexOf(item.href) != -1)?.label || ""

    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-6 shadow-sm">
            <div className="text-xl font-bold text-primary">{activePage}</div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src="https://picsum.photos/200" alt="Profile" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem onClick={() => alert("Logging out")}>
                        {/* <LogOut className="mr-2 h-4 w-4" /> Logout */}
                        <div>Logout</div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}
