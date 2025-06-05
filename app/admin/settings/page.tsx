"use client"

import { useState } from "react"
import AdminSidebar from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Save, Upload, Shield, Mail, Database, Trash2, Plus, Download } from "lucide-react"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    company: {
      name: "SmartQR Dine",
      email: "admin@smartqrdine.com",
      phone: "1900 xxxx",
      address: "123 Đường ABC, Quận XYZ, TP.HCM",
      website: "https://smartqrdine.com",
      description: "Giải pháp đặt món thông minh qua QR code cho nhà hàng",
    },
    system: {
      maintenanceMode: false,
      allowRegistration: true,
      requireEmailVerification: true,
      maxCustomersPerPlan: 1000,
      sessionTimeout: 30,
      backupFrequency: "daily",
    },
    email: {
      smtpHost: "smtp.gmail.com",
      smtpPort: 587,
      smtpUser: "noreply@smartqrdine.com",
      smtpPassword: "********",
      fromName: "SmartQR Dine",
      fromEmail: "noreply@smartqrdine.com",
    },
    security: {
      twoFactorAuth: true,
      passwordMinLength: 8,
      passwordRequireSpecial: true,
      loginAttempts: 5,
      lockoutDuration: 15,
      sessionSecurity: true,
    },
  })

  const [admins] = useState([
    {
      id: 1,
      name: "Super Admin",
      email: "admin@smartqrdine.com",
      role: "super_admin",
      lastLogin: "2024-01-15 14:30",
      status: "active",
    },
    {
      id: 2,
      name: "Nguyễn Văn A",
      email: "support1@smartqrdine.com",
      role: "support",
      lastLogin: "2024-01-15 10:20",
      status: "active",
    },
    {
      id: 3,
      name: "Trần Thị B",
      email: "support2@smartqrdine.com",
      role: "support",
      lastLogin: "2024-01-14 16:45",
      status: "active",
    },
  ])

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return <Badge className="bg-red-500">Super Admin</Badge>
      case "admin":
        return <Badge className="bg-orange-500">Admin</Badge>
      case "support":
        return <Badge className="bg-blue-500">Support</Badge>
      default:
        return <Badge variant="outline">User</Badge>
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Cài đặt hệ thống</h1>
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
              <TabsTrigger value="system">Hệ thống</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="security">Bảo mật</TabsTrigger>
              <TabsTrigger value="admins">Quản trị viên</TabsTrigger>
              <TabsTrigger value="backup">Sao lưu</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin công ty</CardTitle>
                    <CardDescription>Cập nhật thông tin cơ bản của công ty</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Tên công ty</Label>
                      <Input
                        id="companyName"
                        value={settings.company.name}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            company: { ...settings.company, name: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">Email</Label>
                      <Input
                        id="companyEmail"
                        type="email"
                        value={settings.company.email}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            company: { ...settings.company, email: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyPhone">Số điện thoại</Label>
                      <Input
                        id="companyPhone"
                        value={settings.company.phone}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            company: { ...settings.company, phone: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyAddress">Địa chỉ</Label>
                      <Textarea
                        id="companyAddress"
                        value={settings.company.address}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            company: { ...settings.company, address: e.target.value },
                          })
                        }
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyWebsite">Website</Label>
                      <Input
                        id="companyWebsite"
                        value={settings.company.website}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            company: { ...settings.company, website: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyDescription">Mô tả</Label>
                      <Textarea
                        id="companyDescription"
                        value={settings.company.description}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            company: { ...settings.company, description: e.target.value },
                          })
                        }
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Logo và hình ảnh</CardTitle>
                    <CardDescription>Tải lên logo và hình ảnh công ty</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Logo công ty</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">Kéo thả hoặc click để tải logo lên</p>
                        <p className="text-xs text-gray-400">PNG, JPG tối đa 2MB</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Favicon</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">Tải favicon 32x32px</p>
                        <p className="text-xs text-gray-400">ICO, PNG tối đa 1MB</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="system">
              <Card>
                <CardHeader>
                  <CardTitle>Cài đặt hệ thống</CardTitle>
                  <CardDescription>Cấu hình các tham số hệ thống</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Chế độ bảo trì</Label>
                      <p className="text-sm text-gray-500">Tạm dừng hệ thống để bảo trì</p>
                    </div>
                    <Switch
                      checked={settings.system.maintenanceMode}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          system: { ...settings.system, maintenanceMode: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Cho phép đăng ký mới</Label>
                      <p className="text-sm text-gray-500">Khách hàng có thể tự đăng ký tài khoản</p>
                    </div>
                    <Switch
                      checked={settings.system.allowRegistration}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          system: { ...settings.system, allowRegistration: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Yêu cầu xác thực email</Label>
                      <p className="text-sm text-gray-500">Bắt buộc xác thực email khi đăng ký</p>
                    </div>
                    <Switch
                      checked={settings.system.requireEmailVerification}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          system: { ...settings.system, requireEmailVerification: checked },
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxCustomers">Số khách hàng tối đa/gói</Label>
                      <Input
                        id="maxCustomers"
                        type="number"
                        value={settings.system.maxCustomersPerPlan}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            system: { ...settings.system, maxCustomersPerPlan: Number.parseInt(e.target.value) },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Thời gian hết phiên (phút)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={settings.system.sessionTimeout}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            system: { ...settings.system, sessionTimeout: Number.parseInt(e.target.value) },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backupFrequency">Tần suất sao lưu</Label>
                    <Select value={settings.system.backupFrequency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Mỗi giờ</SelectItem>
                        <SelectItem value="daily">Hàng ngày</SelectItem>
                        <SelectItem value="weekly">Hàng tuần</SelectItem>
                        <SelectItem value="monthly">Hàng tháng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email">
              <Card>
                <CardHeader>
                  <CardTitle>Cài đặt Email</CardTitle>
                  <CardDescription>Cấu hình SMTP để gửi email</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input
                        id="smtpHost"
                        value={settings.email.smtpHost}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            email: { ...settings.email, smtpHost: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        type="number"
                        value={settings.email.smtpPort}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            email: { ...settings.email, smtpPort: Number.parseInt(e.target.value) },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpUser">SMTP Username</Label>
                      <Input
                        id="smtpUser"
                        value={settings.email.smtpUser}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            email: { ...settings.email, smtpUser: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPassword">SMTP Password</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        value={settings.email.smtpPassword}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            email: { ...settings.email, smtpPassword: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fromName">Tên người gửi</Label>
                      <Input
                        id="fromName"
                        value={settings.email.fromName}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            email: { ...settings.email, fromName: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fromEmail">Email người gửi</Label>
                      <Input
                        id="fromEmail"
                        type="email"
                        value={settings.email.fromEmail}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            email: { ...settings.email, fromEmail: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Gửi email test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Cài đặt bảo mật</CardTitle>
                  <CardDescription>Cấu hình các tham số bảo mật hệ thống</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Xác thực 2 bước</Label>
                      <p className="text-sm text-gray-500">Bắt buộc xác thực 2 bước cho admin</p>
                    </div>
                    <Switch
                      checked={settings.security.twoFactorAuth}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          security: { ...settings.security, twoFactorAuth: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Yêu cầu ký tự đặc biệt trong mật khẩu</Label>
                      <p className="text-sm text-gray-500">Mật khẩu phải chứa ký tự đặc biệt</p>
                    </div>
                    <Switch
                      checked={settings.security.passwordRequireSpecial}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          security: { ...settings.security, passwordRequireSpecial: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Bảo mật phiên nâng cao</Label>
                      <p className="text-sm text-gray-500">Kiểm tra IP và thiết bị đăng nhập</p>
                    </div>
                    <Switch
                      checked={settings.security.sessionSecurity}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          security: { ...settings.security, sessionSecurity: checked },
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="passwordMinLength">Độ dài mật khẩu tối thiểu</Label>
                      <Input
                        id="passwordMinLength"
                        type="number"
                        value={settings.security.passwordMinLength}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            security: { ...settings.security, passwordMinLength: Number.parseInt(e.target.value) },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loginAttempts">Số lần đăng nhập sai tối đa</Label>
                      <Input
                        id="loginAttempts"
                        type="number"
                        value={settings.security.loginAttempts}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            security: { ...settings.security, loginAttempts: Number.parseInt(e.target.value) },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lockoutDuration">Thời gian khóa (phút)</Label>
                      <Input
                        id="lockoutDuration"
                        type="number"
                        value={settings.security.lockoutDuration}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            security: { ...settings.security, lockoutDuration: Number.parseInt(e.target.value) },
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admins">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Quản trị viên</CardTitle>
                      <CardDescription>Quản lý tài khoản quản trị viên hệ thống</CardDescription>
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <Plus className="mr-2 h-4 w-4" />
                      Thêm admin
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tên</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Vai trò</TableHead>
                        <TableHead>Đăng nhập cuối</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {admins.map((admin) => (
                        <TableRow key={admin.id}>
                          <TableCell className="font-medium">{admin.name}</TableCell>
                          <TableCell>{admin.email}</TableCell>
                          <TableCell>{getRoleBadge(admin.role)}</TableCell>
                          <TableCell>{admin.lastLogin}</TableCell>
                          <TableCell>
                            <Badge variant={admin.status === "active" ? "default" : "secondary"}>
                              {admin.status === "active" ? "Hoạt động" : "Tạm dừng"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm">
                                Sửa
                              </Button>
                              {admin.role !== "super_admin" && (
                                <Button variant="outline" size="sm" className="text-red-600">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="backup">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Sao lưu dữ liệu</CardTitle>
                    <CardDescription>Quản lý sao lưu và khôi phục dữ liệu</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Sao lưu tự động</span>
                        <Badge className="bg-green-500">Đang hoạt động</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Lần sao lưu cuối</span>
                        <span className="text-sm text-gray-500">15/01/2024 02:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Kích thước backup</span>
                        <span className="text-sm text-gray-500">2.4 GB</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Số bản sao lưu</span>
                        <span className="text-sm text-gray-500">30 bản</span>
                      </div>
                    </div>
                    <div className="space-y-2 pt-4">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        <Database className="mr-2 h-4 w-4" />
                        Tạo backup ngay
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Tải backup mới nhất
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Khôi phục dữ liệu</CardTitle>
                    <CardDescription>Khôi phục hệ thống từ bản sao lưu</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="backupFile">Chọn file backup</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn bản sao lưu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="backup-20240115">backup-20240115-02:00.sql</SelectItem>
                          <SelectItem value="backup-20240114">backup-20240114-02:00.sql</SelectItem>
                          <SelectItem value="backup-20240113">backup-20240113-02:00.sql</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-yellow-600 mr-2" />
                        <div>
                          <h4 className="font-medium text-yellow-800">Cảnh báo</h4>
                          <p className="text-sm text-yellow-700">
                            Việc khôi phục sẽ ghi đè toàn bộ dữ liệu hiện tại. Hãy chắc chắn bạn đã sao lưu dữ liệu mới
                            nhất.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                      <Database className="mr-2 h-4 w-4" />
                      Khôi phục dữ liệu
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
