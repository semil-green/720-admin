"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Settings, Users, SunMoon } from "lucide-react"

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

  const changeTheme = () => {
    const body = document.getElementsByTagName('body')[0];
    if (!body.classList.contains('dark'))
      body.classList.add("dark");
    else
      body.classList.remove("dark");
  }

  return (
    <aside className="w-64 h-full border-r bg-sidebar shadow-sm px-4 relative">
      <div className='pt-4 pb-6 px-2'>
        <img src={'/logo.png'} alt='logo' className="w-22 rounded" />
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.indexOf(href) != -1
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                ? "bg-primary text-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      <SunMoon className='absolute bottom-8 left-8 size-8 cursor-pointer' onClick={changeTheme} />
    </aside>
  )
}
