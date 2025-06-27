"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, QrCode } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl">
        <Link href="/" className="flex items-center space-x-2 hover-scale">
          <QrCode className="h-8 w-8 text-orange-500" />
          <span className="text-xl font-bold gradient-text">Quét là xong</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/features" className="text-gray-600 hover:text-orange-600 transition-colors hover-scale">
            Tính năng
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-orange-600 transition-colors hover-scale">
            Bảng giá
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-orange-600 transition-colors hover-scale">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-orange-600 transition-colors hover-scale">
            Liên hệ
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost" className="hover-scale">
              Đăng nhập
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-orange-500 hover:bg-orange-600 hover-lift hover-glow">Đăng ký</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden hover-scale" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white animate-slide-in-bottom">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/features"
              className="block text-gray-600 hover:text-orange-600 transition-colors animate-fade-in-up"
              onClick={() => setIsMenuOpen(false)}
            >
              Tính năng
            </Link>
            <Link
              href="/pricing"
              className="block text-gray-600 hover:text-orange-600 transition-colors animate-fade-in-up stagger-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Bảng giá
            </Link>
            <Link
              href="/blog"
              className="block text-gray-600 hover:text-orange-600 transition-colors animate-fade-in-up stagger-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block text-gray-600 hover:text-orange-600 transition-colors animate-fade-in-up stagger-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Liên hệ
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t animate-fade-in-up stagger-4">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Đăng nhập
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Đăng ký</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
