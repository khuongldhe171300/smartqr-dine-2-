"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    restaurantPhone: "",
    restaurantEmail: "",
    website: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function handleChange(e: any) {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    if (!form.agree) {
      setError("Bạn phải đồng ý với điều khoản!");
      return;
    }
    if (!form.email || !form.password || !form.firstName || !form.lastName || !form.name) {
      setError("Vui lòng nhập đầy đủ các trường bắt buộc.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Auth/register-customer`, {
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        phoneNumber: form.phoneNumber,
        name: form.name,
        description: form.description,
        address: form.address,
        city: form.city,
        state: form.state,
        country: form.country,
        postalCode: form.postalCode,
        restaurantPhone: form.restaurantPhone,
        restaurantEmail: form.restaurantEmail,
        website: form.website,
      });

      // Thành công: Hiện alert và chuyển trang
      window.alert("Đăng ký thành công! Bạn sẽ được chuyển tới trang quản lý nhà hàng.");
      router.push("/restaurant/dashboard");

    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        "Đăng ký thất bại. Email có thể đã tồn tại hoặc lỗi máy chủ."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="h-8 w-8 bg-orange-500 rounded-md flex items-center justify-center">
              {/* Icon */}
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
            <CardTitle>Đăng ký tài khoản</CardTitle>
            <CardDescription>Tạo tài khoản để bắt đầu sử dụng Quét là xong</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Họ *</Label>
                  <Input id="firstName" value={form.firstName} onChange={handleChange} placeholder="Nhập họ" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Tên *</Label>
                  <Input id="lastName" value={form.lastName} onChange={handleChange} placeholder="Nhập tên" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Số điện thoại</Label>
                <Input id="phoneNumber" type="tel" value={form.phoneNumber} onChange={handleChange} placeholder="0123 456 789" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Tên nhà hàng *</Label>
                <Input id="name" value={form.name} onChange={handleChange} placeholder="Tên nhà hàng của bạn" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả nhà hàng</Label>
                <Input id="description" value={form.description} onChange={handleChange} placeholder="Mô tả về nhà hàng" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input id="address" value={form.address} onChange={handleChange} placeholder="Địa chỉ cụ thể" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Thành phố</Label>
                  <Input id="city" value={form.city} onChange={handleChange} placeholder="TP. Hồ Chí Minh" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Tỉnh/Bang</Label>
                  <Input id="state" value={form.state} onChange={handleChange} placeholder="" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Quốc gia</Label>
                  <Input id="country" value={form.country} onChange={handleChange} placeholder="Vietnam" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Mã bưu chính</Label>
                  <Input id="postalCode" value={form.postalCode} onChange={handleChange} placeholder="700000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="restaurantPhone">Số ĐT nhà hàng</Label>
                <Input id="restaurantPhone" value={form.restaurantPhone} onChange={handleChange} placeholder="0912 345 678" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="restaurantEmail">Email nhà hàng</Label>
                <Input id="restaurantEmail" value={form.restaurantEmail} onChange={handleChange} placeholder="info@yourrestaurant.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" value={form.website} onChange={handleChange} placeholder="https://yourrestaurant.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu *</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="Nhập mật khẩu" />
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="agree" checked={form.agree} onCheckedChange={(v) => setForm(f => ({ ...f, agree: !!v }))} />
                <Label htmlFor="agree" className="text-sm">
                  Tôi đồng ý với{" "}
                  <Link href="/terms" className="text-orange-600 hover:underline">
                    Điều khoản sử dụng
                  </Link>{" "}
                  và{" "}
                  <Link href="/privacy" className="text-orange-600 hover:underline">
                    Chính sách bảo mật
                  </Link>
                </Label>
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={loading}>
                {loading ? "Đang đăng ký..." : "Đăng ký"}
              </Button>
              <div className="text-center text-sm">
                Đã có tài khoản?{" "}
                <Link href="/login" className="text-orange-600 hover:underline">
                  Đăng nhập ngay
                </Link>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
