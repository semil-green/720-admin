"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Users, Menu, Layers, UserCircle
} from "lucide-react";
import { useEffect, useState } from "react";

export const fullMenuItems = [
  { label: "Blogs", href: "/blogs", icon: Home },
  { label: "Category", href: "/category", icon: Layers },
  { label: "Author", href: "/author", icon: Users },
  { label: "Team Member", href: "/team-member", icon: UserCircle },
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

    if (role === "writer") {
      allowedLabels = [
        "Blogs",
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
        <div className="text-xl font-bold"> <img src={'/logo.png'} alt='logo' className="w-28 h-20" /></div>
        <button onClick={() => setSidebarOpen((prev) => !prev)}>
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      </div>


      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 h-screen border-r bg-white px-4 shadow-sm">

        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b mb-4">
          <img src="/logo.png" alt="logo" className="w-32 object-contain" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {filteredMenuItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-md font-semibold transition-all
            ${isActive
                    ? "bg-cyan-100 text-cyan-700 border-l-4 border-cyan-500"
                    : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
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
          <aside className="relative z-50 w-64 h-full bg-white p-4 shadow-xl overflow-y-auto">

            <div className="flex items-center justify-between h-14 border-b mb-4">
              <img src="/logo.png" alt="logo" className="w-28" />
              <button onClick={() => setSidebarOpen(false)} className="text-xl">✕</button>
            </div>

            <nav className="flex flex-col gap-1">
              {filteredMenuItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname.startsWith(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-all
            ${isActive
                        ? "bg-cyan-50 text-cyan-700 border-l-4  border-cyan-500"
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

        </div>
      )}

      <div className="lg:hidden h-16" />
    </>
  );
}
