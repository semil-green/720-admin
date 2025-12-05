"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Users, StoreIcon, ShoppingBagIcon,
  ChartColumnStacked, ShoppingCartIcon, FileDown,
  Truck, Wallet, ArrowDownUp, ShoppingBasket,
  UsersRound, BookText, ClockArrowUp, CirclePercent,
  Menu, MapPin, PencilLine, SlidersHorizontal, Globe, Building2, FileText,
  Proportions
} from "lucide-react";
import { useEffect, useState } from "react";

export const fullMenuItems = [
  { label: "Home", href: "/dashboard", icon: Home },

];

export default function Sidebar() {
  const pathname = usePathname();
  const [filteredMenuItems, setFilteredMenuItems] = useState(fullMenuItems);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) return;

    let allowedLabels = [];

    if (role === "admin") {
      setFilteredMenuItems(fullMenuItems);
      return;
    }

    if (role === "DSManager") {
      allowedLabels = [
        "Customer Orders",
        "Order Request",
        "Inventories",
        "Customer",
        "Dashboard"
      ];
    } else if (role === "PCManager") {
      allowedLabels = [
        "Customer Orders",
        "Store Orders",
        "Inventories",
        "Customer",
        "Dashboard",
        "Inward Materials"
      ];
    }

    const filtered = fullMenuItems.filter((item) =>
      allowedLabels.includes(item.label)
    );
    setFilteredMenuItems(filtered);
  }, []);

  return (
    <>
      {/* Sticky Top Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b h-16 px-4 py-3 flex items-center justify-between lg:hidden">
        <div className="text-xl font-bold"> <img src={'/images/DGF_LOGO_NEW_VARIATION.png'} alt='logo' className="size-10" /></div>
        <button onClick={() => setSidebarOpen((prev) => !prev)}>
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      </div>


      {/* Sidebar for Desktop */}
      <aside className="hidden lg:block w-64 h-screen border-r bg-white px-4 pt-4 shadow-sm overflow-y-auto">
        <div className='pt-3 pb-8 px-3'>
          {/* <div className="flex justify-center">
            <img src={'/images/DGF_LOGO_NEW_VARIATION.png'} alt='logo' className="size-10" />
          </div> */}
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
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          {/* Overlay Background */}
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setSidebarOpen(false)}></div>

          {/* Slide-Out Sidebar */}
          <aside
            className="relative z-50 w-64 h-full bg-white p-4 shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-bold">Menu</div>
              <button onClick={() => setSidebarOpen(false)}>✕</button>
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
                      : "text-gray-700 hover:bg-gray-100"
                      }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      <div className="lg:hidden h-16" />
    </>
  );
}
