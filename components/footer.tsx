"use client"

import Link from "next/link"
import { QrCode, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 animate-fade-in-up">
            <Link href="/" className="flex items-center space-x-2 hover-scale">
              <QrCode className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold">Quét là xong</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Giải pháp đặt món thông minh qua QR code cho nhà hàng. Tăng hiệu quả phục vụ và trải nghiệm khách hàng.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4 animate-fade-in-up stagger-1">
            <h3 className="text-lg font-semibold">Sản phẩm</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-gray-400 hover:text-orange-400 transition-colors hover-scale">
                  Tính năng
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-orange-400 transition-colors hover-scale">
                  Bảng giá
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-gray-400 hover:text-orange-400 transition-colors hover-scale">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4 animate-fade-in-up stagger-2">
            <h3 className="text-lg font-semibold">Công ty</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-orange-400 transition-colors hover-scale">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors hover-scale">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-orange-400 transition-colors hover-scale">
                  Hỗ trợ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 animate-fade-in-up stagger-3">
            <h3 className="text-lg font-semibold">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-500 hover-rotate" />
                <span className="text-gray-400">0329919200</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-500 hover-rotate" />
                <span className="text-gray-400">khuongld2909@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-orange-500 hover-rotate" />
                <span className="text-gray-400">Thôn 3, Thạch hòa, Thạch thất, Hà Nội</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400 animate-fade-in-up">
          <p>&copy; 2024 Quét là xong. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
