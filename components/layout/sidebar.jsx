"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Settings, Users } from "lucide-react"

export const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Users", href: "/users", icon: Users },
  { label: "Packaging Stores", href: "/packaging-stores", icon: Settings },
  { label: "Dark Stores", href: "/stores", icon: Settings },
  { label: "Categories", href: "/categories", icon: Settings },
  { label: "Items", href: "/items", icon: Settings },
  { label: "Collections", href: "/collections", icon: Settings },
  { label: "Inward Items", href: "/inward-items", icon: Settings },
  { label: "Orders", href: "/orders", icon: Settings }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-full border-r bg-white shadow-sm px-4">
      <div className='pt-4 pb-6 px-2'>
        <img src={'/logo.png'} alt='logo' className="w-22 rounded" />
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

    </aside>
  )
}
