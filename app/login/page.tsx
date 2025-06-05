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

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setError("")
    try {
      const { token, role: userRole, userId, fullName } = await loginApi(email, password)

      // ✅ Lưu vào localStorage (nếu bạn cần dùng sau này)
      localStorage.setItem("token", token)
      localStorage.setItem("role", userRole)
      localStorage.setItem("email", email)
      localStorage.setItem("userId", userId.toString())
      localStorage.setItem("fullName", fullName)

      // ✅ Lưu vào cookie để middleware đọc được
      document.cookie = `token=${token}; path=/`

      // ✅ Chuyển trang theo role
      if (userRole?.toLowerCase() === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/restaurant/dashboard")
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="h-8 w-8 bg-orange-500 rounded-md flex items-center justify-center">
              {/* Icon */}
            </div>
            <span className="text-xl font-bold">SmartQR Dine</span>
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
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button onClick={handleLogin} className="w-full bg-orange-500 hover:bg-orange-600">
              Đăng nhập
            </Button>
            <div className="text-center text-sm">
              Chưa có tài khoản?{" "}
              <Link href="/register" className="text-orange-600 hover:underline">
                Đăng ký ngay
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
