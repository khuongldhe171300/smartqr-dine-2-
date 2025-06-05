"use client"

import { useState } from "react"
import RestaurantSidebar from "@/components/restaurant-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Save, Upload, Shield, CreditCard } from "lucide-react"

export default function RestaurantSettings() {
  const [settings, setSettings] = useState({
    restaurantName: "Nhà hàng ABC",
    email: "abc@restaurant.com",
    phone: "0123456789",
    address: "123 Đường ABC, Quận XYZ, TP.HCM",
    description: "Nhà hàng phục vụ các món ăn Âu - Á với không gian sang trọng",
    website: "https://restaurant-abc.com",
    openTime: "08:00",
    closeTime: "22:00",
    currency: "VND",
    language: "vi",
    timezone: "Asia/Ho_Chi_Minh",
    notifications: {
      newOrder: true,
      orderReady: true,
      payment: true,
      review: false,
    },
    features: {
      onlinePayment: true,
      tableReservation: false,
      loyaltyProgram: true,
      multiLanguage: false,
    },
  })

  return (
    <div className="flex h-screen bg-gray-100">
      <RestaurantSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Cài đặt nhà hàng</h1>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Save className="mr-2 h-4 w-4" />
              Lưu thay đổi
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="general">Thông tin chung</TabsTrigger>
              <TabsTrigger value="business">Kinh doanh</TabsTrigger>
              <TabsTrigger value="notifications">Thông báo</TabsTrigger>
              <TabsTrigger value="features">Tính năng</TabsTrigger>
              <TabsTrigger value="billing">Thanh toán</TabsTrigger>
              <TabsTrigger value="security">Bảo mật</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin cơ bản</CardTitle>
                    <CardDescription>Cập nhật thông tin cơ bản của nhà hàng</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="restaurantName">Tên nhà hàng</Label>
                      <Input
                        id="restaurantName"
                        value={settings.restaurantName}
                        onChange={(e) => setSettings({ ...settings, restaurantName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input
                        id="phone"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Địa chỉ</Label>
                      <Textarea
                        id="address"
                        value={settings.address}
                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Mô tả</Label>
                      <Textarea
                        id="description"
                        value={settings.description}
                        onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={settings.website}
                        onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Logo và hình ảnh</CardTitle>
                    <CardDescription>Tải lên logo và hình ảnh đại diện</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Logo nhà hàng</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">Kéo thả hoặc click để tải logo lên</p>
                        <p className="text-xs text-gray-400">PNG, JPG tối đa 2MB</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Hình ảnh bìa</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">Tải hình ảnh bìa nhà hàng</p>
                        <p className="text-xs text-gray-400">PNG, JPG tối đa 5MB</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="business">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Giờ hoạt động</CardTitle>
                    <CardDescription>Cài đặt giờ mở cửa và đóng cửa</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="openTime">Giờ mở cửa</Label>
                        <Input
                          id="openTime"
                          type="time"
                          value={settings.openTime}
                          onChange={(e) => setSettings({ ...settings, openTime: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="closeTime">Giờ đóng cửa</Label>
                        <Input
                          id="closeTime"
                          type="time"
                          value={settings.closeTime}
                          onChange={(e) => setSettings({ ...settings, closeTime: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Ngày nghỉ trong tuần</Label>
                      <div className="grid grid-cols-7 gap-2">
                        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
                          <Button key={day} variant="outline" size="sm">
                            {day}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cài đặt khu vực</CardTitle>
                    <CardDescription>Múi giờ, ngôn ngữ và tiền tệ</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Múi giờ</Label>
                      <Select value={settings.timezone}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Ho_Chi_Minh">Việt Nam (GMT+7)</SelectItem>
                          <SelectItem value="Asia/Bangkok">Thái Lan (GMT+7)</SelectItem>
                          <SelectItem value="Asia/Singapore">Singapore (GMT+8)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Ngôn ngữ mặc định</Label>
                      <Select value={settings.language}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vi">Tiếng Việt</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="zh">中文</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Đơn vị tiền tệ</Label>
                      <Select value={settings.currency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="VND">VND (₫)</SelectItem>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Cài đặt thông báo</CardTitle>
                  <CardDescription>Chọn loại thông báo bạn muốn nhận</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Đơn hàng mới</Label>
                      <p className="text-sm text-gray-500">Nhận thông báo khi có đơn hàng mới</p>
                    </div>
                    <Switch
                      checked={settings.notifications.newOrder}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, newOrder: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Đơn hàng sẵn sàng</Label>
                      <p className="text-sm text-gray-500">Thông báo khi món ăn đã sẵn sàng phục vụ</p>
                    </div>
                    <Switch
                      checked={settings.notifications.orderReady}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, orderReady: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Thanh toán</Label>
                      <p className="text-sm text-gray-500">Thông báo về các giao dịch thanh toán</p>
                    </div>
                    <Switch
                      checked={settings.notifications.payment}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, payment: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Đánh giá mới</Label>
                      <p className="text-sm text-gray-500">Thông báo khi có đánh giá từ khách hàng</p>
                    </div>
                    <Switch
                      checked={settings.notifications.review}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, review: checked },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features">
              <Card>
                <CardHeader>
                  <CardTitle>Tính năng nâng cao</CardTitle>
                  <CardDescription>Bật/tắt các tính năng cho nhà hàng của bạn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Thanh toán trực tuyến</Label>
                      <p className="text-sm text-gray-500">Cho phép khách hàng thanh toán qua ứng dụng</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={settings.features.onlinePayment}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            features: { ...settings.features, onlinePayment: checked },
                          })
                        }
                      />
                      <Badge variant="outline">Premium</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Đặt bàn trước</Label>
                      <p className="text-sm text-gray-500">Cho phép khách hàng đặt bàn trước</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={settings.features.tableReservation}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            features: { ...settings.features, tableReservation: checked },
                          })
                        }
                      />
                      <Badge variant="outline">Premium</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Chương trình khách hàng thân thiết</Label>
                      <p className="text-sm text-gray-500">Hệ thống tích điểm và ưu đãi</p>
                    </div>
                    <Switch
                      checked={settings.features.loyaltyProgram}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          features: { ...settings.features, loyaltyProgram: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Menu đa ngôn ngữ</Label>
                      <p className="text-sm text-gray-500">Hiển thị menu bằng nhiều ngôn ngữ</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={settings.features.multiLanguage}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            features: { ...settings.features, multiLanguage: checked },
                          })
                        }
                      />
                      <Badge variant="outline">Premium</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin thanh toán</CardTitle>
                  <CardDescription>Quản lý gói dịch vụ và phương thức thanh toán</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Gói Premium</h3>
                      <p className="text-sm text-gray-500">₫1,999,000/tháng</p>
                      <p className="text-xs text-gray-400">Gia hạn vào 15/02/2024</p>
                    </div>
                    <Badge className="bg-green-500">Đang hoạt động</Badge>
                  </div>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Thay đổi phương thức thanh toán
                    </Button>
                    <Button variant="outline" className="w-full">
                      Nâng cấp/Hạ cấp gói
                    </Button>
                    <Button variant="outline" className="w-full">
                      Xem lịch sử thanh toán
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Bảo mật tài khoản</CardTitle>
                  <CardDescription>Cài đặt bảo mật và quyền truy cập</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Mật khẩu mới</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <Shield className="mr-2 h-4 w-4" />
                      Cập nhật mật khẩu
                    </Button>
                  </div>
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Xác thực 2 bước</Label>
                        <p className="text-sm text-gray-500">Tăng cường bảo mật với xác thực 2 bước</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
