"use client"

import { useState } from "react"
import RestaurantSidebar from "@/components/restaurant-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Users, Clock, Star, Search } from "lucide-react"

export default function RestaurantStaff() {
  const [staff] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nva@restaurant.com",
      phone: "0123456789",
      role: "manager",
      department: "Quản lý",
      salary: 15000000,
      startDate: "2023-01-15",
      status: "active",
      rating: 4.8,
      totalOrders: 1250,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "ttb@restaurant.com",
      phone: "0987654321",
      role: "waiter",
      department: "Phục vụ",
      salary: 8000000,
      startDate: "2023-03-20",
      status: "active",
      rating: 4.6,
      totalOrders: 890,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "lvc@restaurant.com",
      phone: "0111222333",
      role: "chef",
      department: "Bếp",
      salary: 12000000,
      startDate: "2023-02-10",
      status: "active",
      rating: 4.9,
      totalOrders: 2100,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "ptd@restaurant.com",
      phone: "0444555666",
      role: "cashier",
      department: "Thu ngân",
      salary: 7000000,
      startDate: "2023-06-01",
      status: "inactive",
      rating: 4.3,
      totalOrders: 450,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "manager":
        return <Badge className="bg-purple-500">Quản lý</Badge>
      case "chef":
        return <Badge className="bg-orange-500">Đầu bếp</Badge>
      case "waiter":
        return <Badge className="bg-blue-500">Phục vụ</Badge>
      case "cashier":
        return <Badge className="bg-green-500">Thu ngân</Badge>
      default:
        return <Badge variant="outline">Khác</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Đang làm việc</Badge>
      case "inactive":
        return <Badge variant="secondary">Nghỉ việc</Badge>
      case "on_leave":
        return <Badge className="bg-yellow-500">Nghỉ phép</Badge>
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <RestaurantSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Quản lý nhân viên</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm nhân viên
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Thêm nhân viên mới</DialogTitle>
                  <DialogDescription>Thêm thông tin nhân viên mới vào hệ thống</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="staffName">Họ và tên</Label>
                      <Input id="staffName" placeholder="Nhập họ và tên" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="staffEmail">Email</Label>
                      <Input id="staffEmail" type="email" placeholder="email@example.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="staffPhone">Số điện thoại</Label>
                      <Input id="staffPhone" placeholder="0123456789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="staffRole">Vị trí</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn vị trí" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manager">Quản lý</SelectItem>
                          <SelectItem value="chef">Đầu bếp</SelectItem>
                          <SelectItem value="waiter">Phục vụ</SelectItem>
                          <SelectItem value="cashier">Thu ngân</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="staffSalary">Lương (VND)</Label>
                      <Input id="staffSalary" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Ngày bắt đầu</Label>
                      <Input id="startDate" type="date" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="active" defaultChecked />
                    <Label htmlFor="active">Đang hoạt động</Label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Hủy</Button>
                  <Button className="bg-orange-500 hover:bg-orange-600">Thêm nhân viên</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng nhân viên</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{staff.length}</div>
                <p className="text-xs text-muted-foreground">Tất cả nhân viên</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đang làm việc</CardTitle>
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{staff.filter((s) => s.status === "active").length}</div>
                <p className="text-xs text-muted-foreground">Nhân viên hoạt động</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đánh giá trung bình</CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(staff.reduce((sum, s) => sum + s.rating, 0) / staff.length).toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">Trên 5 sao</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng lương tháng</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(staff.filter((s) => s.status === "active").reduce((sum, s) => sum + s.salary, 0))}
                </div>
                <p className="text-xs text-muted-foreground">Chi phí nhân sự</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tìm kiếm và lọc</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Tìm kiếm theo tên, email..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Vị trí" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="manager">Quản lý</SelectItem>
                    <SelectItem value="chef">Đầu bếp</SelectItem>
                    <SelectItem value="waiter">Phục vụ</SelectItem>
                    <SelectItem value="cashier">Thu ngân</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="active">Đang làm việc</SelectItem>
                    <SelectItem value="inactive">Nghỉ việc</SelectItem>
                    <SelectItem value="on_leave">Nghỉ phép</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Staff Table */}
          <Card>
            <CardHeader>
              <CardTitle>Danh sách nhân viên</CardTitle>
              <CardDescription>Quản lý thông tin và hiệu suất nhân viên</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nhân viên</TableHead>
                    <TableHead>Vị trí</TableHead>
                    <TableHead>Liên hệ</TableHead>
                    <TableHead>Lương</TableHead>
                    <TableHead>Ngày vào</TableHead>
                    <TableHead>Đánh giá</TableHead>
                    <TableHead>Đơn hàng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
                            <span className="text-white font-medium">{member.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.department}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(member.role)}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{member.email}</p>
                          <p className="text-sm text-gray-500">{member.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{formatCurrency(member.salary)}</TableCell>
                      <TableCell>{member.startDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{member.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>{member.totalOrders}</TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
