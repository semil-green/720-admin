"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, SunMoon, StoreIcon, ShoppingBagIcon, ChartColumnStacked, ShoppingCartIcon, FileDown, Truck, Wallet, ArrowDownUp, ShoppingBasket, MoveDown, UsersRound, BookText, ClockArrowUp } from "lucide-react"

export const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Users", href: "/users", icon: Users },
  { label: "Packaging Center", href: "/packaging-stores", icon: ShoppingBagIcon },
  { label: "Dark Stores", href: "/stores", icon: StoreIcon },
  { label: "Store Orders", href: "/store-orders", icon: ClockArrowUp },
  { label: "Collections", href: "/collections", icon: BookText },
  { label: "Categories", href: "/categories", icon: ChartColumnStacked },
  { label: "Product", href: "/items", icon: ShoppingCartIcon },
  { label: "Inward Materials", href: "/inward-items", icon: FileDown },
  { label: "Customer Orders", href: "/orders", icon: ShoppingBasket },
  { label: "Order Request", href: "/store-orders", icon: Truck },
  { label: "Inventories", href: "/inventories", icon: ArrowDownUp },
  { label: "Wallet Configuration", href: "/wallet-configuration", icon: Wallet },
  { label: "Items", href: "/items", icon: ShoppingCartIcon },
  { label: "Inward Items", href: "/inward-items", icon: MoveDown },
  { label: "Orders", href: "/orders", icon: Truck },
  { label: "Customer", href: "/customer", icon: UsersRound }
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
      <div className='pt-3 pb-8 px-3'>
        <div className="flex justify-center">
          <img src={'/images/DGF_LOGO_NEW_VARIATION.png'} alt='logo' className="size-10" />
        </div>
      </div>
      {/* <div className='pt-3 pb-8 px-3'>
        <div className="flex items-center gap-2">
          <StoreIcon className="size-6" />
          <div className="flex flex-col">
            <div className="font-semibold">Delhi</div>
            <div className="text-secondary-foreground text-xs">381048</div>
          </div>
        </div>
      </div> */}

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
