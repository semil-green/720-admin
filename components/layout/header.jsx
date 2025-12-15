"use client"

import { usePathname, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut, StoreIcon } from "lucide-react"
import { fullMenuItems } from "./sidebar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BellIcon } from "lucide-react"
import { FishIcon } from "lucide-react"
import { SunMoon } from "lucide-react"
export default function Header() {
    const router = useRouter()
    const pathname = usePathname()
    const activePage = fullMenuItems.find((item) => pathname.indexOf(item.href) != -1)?.label || ""

    const changeTheme = () => {
        const body = document.body;
        body.classList.toggle("dark");
    };

    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-6 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-primary">{activePage}</div>
            </div>

            <div className="flex items-center gap-3">
                {/* <SunMoon className='size-7 cursor-pointer' onClick={changeTheme} /> */}

                {/* <Popover>
                    <PopoverTrigger variant="outline">
                        <div className="border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground p-2 rounded-full cursor-pointer relative">
                            <BellIcon className="size-5" />
                            <div className="absolute rounded-full bg-primary size-2 top-0 right-1"></div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto'>
                        <div className="grid gap-3">
                            <div className="flex items-center gap-2">
                                <FishIcon className="size-6 text-primary" />
                                <div>
                                    <div className="text-[10px] text-gray-400">11-07-2025 08:30 AM</div>
                                    <div className="text-sm">You have new order</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FishIcon className="size-6 text-primary" />
                                <div>
                                    <div className="text-[10px] text-gray-400">11-07-2025 08:30 AM</div>
                                    <div className="text-sm">You have new order</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FishIcon className="size-6 text-primary" />
                                <div>
                                    <div className="text-[10px] text-gray-400">11-07-2025 08:30 AM</div>
                                    <div className="text-sm">You have new order</div>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover> */}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer size-12">
                            <AvatarImage src="https://picsum.photos/200" alt="Profile" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem onClick={() => {
                            // window.location.href = "/login";
                            router.push("/")
                        }}>
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
