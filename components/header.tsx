"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    const name = localStorage.getItem("fullName")
    if (token && name) {
      setIsLoggedIn(true)
      setUsername(name)
    }
  }, [])


  const routes = [
    {
      href: "/",
      label: "Trang chủ",
      active: pathname === "/",
    },
    {
      href: "/features",
      label: "Tính năng",
      active: pathname === "/features",
    },
    {
      href: "/pricing",
      label: "Bảng giá",
      active: pathname === "/pricing",
    },
    {
      href: "/blog",
      label: "Tin tức",
      active: pathname === "/blog",
    },
    {
      href: "/contact",
      label: "Liên hệ",
      active: pathname === "/contact",
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <QrLogo />
            <span className="text-xl font-bold">Quét là xong</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "transition-colors hover:text-orange-500",
                route.active ? "text-orange-500" : "text-foreground",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <Link href="/restaurant/dashboard" className="text-sm font-medium text-gray-700">
              <span className="flex items-center space-x-1">
                <span>👤</span>
                <span className="text-sm font-medium text-gray-700">{username}</span>
              </span>
            </Link>

          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Đăng nhập</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-orange-500 hover:bg-orange-600">Đăng ký</Button>
              </Link>
            </>
          )}
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-6 pt-6">
              <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                <QrLogo />
                <span className="text-xl font-bold">SmartQR Dine</span>
              </Link>
              <nav className="flex flex-col space-y-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-orange-500",
                      route.active ? "text-orange-500" : "text-foreground",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col space-y-4 pt-4">
                {isLoggedIn ? (
                  <div className="text-sm font-medium text-gray-700 text-center">👋 Xin chào, {username}</div>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">Đăng nhập</Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">Đăng ký</Button>
                    </Link>
                  </>
                )}
              </div>

            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function QrLogo() {
  return (
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
  )
}
