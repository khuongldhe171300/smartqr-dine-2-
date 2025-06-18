"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, BarChart3, Settings, HelpCircle, LogOut, Building2, CreditCard } from "lucide-react"
import LogoutButton from "./LogoutButton"


const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Khách hàng",
    href: "/admin/customers",
    icon: Building2,
  },
  {
    title: "Gói dịch vụ",
    href: "/admin/plans",
    icon: Package,
  },
  {
    title: "Tin tức",
    href: "/admin/blogPost",
    icon: CreditCard,
  },
  {
    title: "Báo cáo",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Hỗ trợ",
    href: "/admin/support",
    icon: HelpCircle,
  },
  {
    title: "Cài đặt",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-orange-500 rounded-md flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <rect width="6" height="6" x="3" y="3" rx="1" />
              <rect width="6" height="6" x="15" y="3" rx="1" />
              <rect width="6" height="6" x="3" y="15" rx="1" />
              <path d="M15 15h6v6h-6z" />
              <path d="M10 3v18" />
              <path d="M3 10h18" />
            </svg>
          </div>
          <span className="text-lg font-bold">Admin Panel</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-orange-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-gray-800 p-4">
        <LogoutButton />

      </div>
    </div>
  )
}
