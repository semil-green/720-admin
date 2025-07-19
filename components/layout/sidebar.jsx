"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Users, SunMoon, StoreIcon, ShoppingBagIcon,
  ChartColumnStacked, ShoppingCartIcon, FileDown, Truck,
  Wallet, ArrowDownUp, ShoppingBasket, UsersRound, BookText,
  ClockArrowUp, CirclePercent
} from "lucide-react";
import { useEffect, useState } from "react";

export const fullMenuItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Customer Orders", href: "/orders", icon: ShoppingBasket },
  { label: "Product", href: "/items", icon: ShoppingCartIcon },
  { label: "Collections", href: "/collections", icon: BookText },
  { label: "Categories", href: "/categories", icon: ChartColumnStacked },
  { label: "Inventories", href: "/inventories", icon: ArrowDownUp },
  { label: "Inward Materials", href: "/inward-items", icon: FileDown },
  { label: "Order Request", href: "/order-request", icon: Truck },
  { label: "Store Orders", href: "/store-orders", icon: ClockArrowUp },
  { label: "Discount", href: "/discount", icon: CirclePercent },
  { label: "Customer", href: "/customer", icon: UsersRound },
  { label: "Wallet Configuration", href: "/wallet-configuration", icon: Wallet },
  { label: "Dark Stores", href: "/stores", icon: StoreIcon },
  { label: "Packaging Center", href: "/packaging-stores", icon: ShoppingBagIcon },
  { label: "Users", href: "/users", icon: Users },

];

export default function Sidebar() {
  const pathname = usePathname();
  const [filteredMenuItems, setFilteredMenuItems] = useState(fullMenuItems);

  useEffect(() => {
    const email = localStorage.getItem("user_email");

    if (!email) return;

    let allowedLabels = [];

    if (email === "admin@gmail.com") {
      setFilteredMenuItems(fullMenuItems);
      return;
    }

    if (email === "store@gmail.com") {
      allowedLabels = [
        "Customer Orders",
        "Order Request",
        "Inventories",
        "Customer",
        "Dashboard"
      ];
    } else if (email === "pc@gmail.com") {
      allowedLabels = [
        "Customer Orders",
        "Store Orders",
        "Inventories",
        "Customer",
        "Dashboard"
      ];
    }

    const filtered = fullMenuItems.filter((item) =>
      allowedLabels.includes(item.label)
    );
    setFilteredMenuItems(filtered);
  }, []);

  return (
    <aside className="w-64 h-full border-r bg-sidebar shadow-sm px-4 relative overflow-x-auto">
      <div className='pt-3 pb-8 px-3'>
        <div className="flex justify-center">
          <img src={'/images/DGF_LOGO_NEW_VARIATION.png'} alt='logo' className="size-10" />
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {filteredMenuItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.indexOf(href) !== -1;
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
          );
        })}
      </nav>

    </aside>
  );
}
