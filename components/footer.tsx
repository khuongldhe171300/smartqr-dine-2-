import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
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
              <span className="text-xl font-bold">SmartQR Dine</span>
            </div>
            <p className="text-gray-500">
              Giải pháp đặt món thông minh qua QR code cho nhà hàng, quán ăn, chuỗi cà phê.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-orange-500">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-orange-500">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-orange-500">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Sản phẩm</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-gray-500 hover:text-orange-500">
                  Tính năng
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-500 hover:text-orange-500">
                  Bảng giá
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-gray-500 hover:text-orange-500">
                  Dùng thử
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-500 hover:text-orange-500">
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-orange-500">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-500 hover:text-orange-500">
                  Trung tâm hỗ trợ
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-gray-500 hover:text-orange-500">
                  Tài liệu hướng dẫn
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-500 hover:text-orange-500">
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="text-gray-500">Email: contact@smartqrdine.com</li>
              <li className="text-gray-500">Hotline: 1900 xxxx</li>
              <li className="text-gray-500">Địa chỉ: 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 text-center text-gray-500">
          <p>© 2024 SmartQR Dine. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
