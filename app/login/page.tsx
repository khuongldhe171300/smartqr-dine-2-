"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginApi } from "@/lib/loginApi"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    try {
      const { token, role: userRole, userId, fullName } = await loginApi(email, password)

      localStorage.setItem("token", token)
      localStorage.setItem("role", userRole)
      localStorage.setItem("email", email)
      localStorage.setItem("userId", userId.toString())
      localStorage.setItem("fullName", fullName)
      document.cookie = `token=${token}; path=/`

      toast.success("✅ Đăng nhập thành công!")

      setTimeout(() => {
        if (userRole?.toLowerCase() === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/restaurant/dashboard")
        }
      }, 1000)
    } catch (err: any) {
      toast.error(err.message || "❌ Đăng nhập thất bại")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="h-8 w-8 bg-orange-500 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <rect width="6" height="6" x="3" y="3" rx="1" />
                <rect width="6" height="6" x="15" y="3" rx="1" />
                <rect width="6" height="6" x="3" y="15" rx="1" />
                <path d="M15 15h6v6h-6z" />
                <path d="M10 3v18" />
                <path d="M3 10h18" />
              </svg>
            </div>
            <span className="text-xl font-bold">Quét là xong</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Đăng nhập</CardTitle>
            <CardDescription>Đăng nhập vào hệ thống</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Mật khẩu</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button onClick={handleLogin} className="w-full bg-orange-500 hover:bg-orange-600">
              Đăng nhập
            </Button>
            <div className="text-center text-sm">
              Chưa có tài khoản?{" "}
              <Link href="/register" className="text-orange-600 hover:underline">
                Đăng ký ngay
              </Link>
            </div>
            <div className="text-center mt-4">
              <Link href="/">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-orange-400 text-orange-600 hover:bg-orange-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-2 2v6a2 2 0 01-2 2h-3m-4 0H7a2 2 0 01-2-2v-6m0 0L3 12" />
                  </svg>
                  Quay về trang chủ
                </Button>
              </Link>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
