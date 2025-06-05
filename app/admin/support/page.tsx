"use client"

import { useState } from "react"
import AdminSidebar from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, MessageSquare, Clock, CheckCircle, AlertCircle, Plus, Eye } from "lucide-react"

export default function AdminSupport() {
  const [tickets] = useState([
    {
      id: "TK001",
      title: "Không thể cập nhật menu",
      customer: "Nhà hàng ABC",
      email: "abc@restaurant.com",
      priority: "high",
      status: "open",
      category: "technical",
      created: "2024-01-15 14:30",
      updated: "2024-01-15 16:45",
      assignee: "Nguyễn Văn A",
      description: "Khách hàng báo cáo không thể cập nhật menu sau khi nâng cấp hệ thống.",
    },
    {
      id: "TK002",
      title: "Yêu cầu nâng cấp gói Premium",
      customer: "Quán cà phê XYZ",
      email: "xyz@coffee.com",
      priority: "medium",
      status: "in_progress",
      category: "billing",
      created: "2024-01-14 10:15",
      updated: "2024-01-15 09:20",
      assignee: "Trần Thị B",
      description: "Khách hàng muốn nâng cấp từ gói Standard lên Premium.",
    },
    {
      id: "TK003",
      title: "Hướng dẫn sử dụng QR code",
      customer: "Chuỗi FastFood",
      email: "contact@fastfood.com",
      priority: "low",
      status: "resolved",
      category: "general",
      created: "2024-01-13 16:20",
      updated: "2024-01-14 11:30",
      assignee: "Lê Văn C",
      description: "Khách hàng cần hướng dẫn chi tiết cách tạo và in QR code.",
    },
    {
      id: "TK004",
      title: "Lỗi thanh toán qua ví điện tử",
      customer: "Restaurant Group",
      email: "support@resgroup.com",
      priority: "high",
      status: "open",
      category: "technical",
      created: "2024-01-15 11:45",
      updated: "2024-01-15 11:45",
      assignee: null,
      description: "Khách hàng báo cáo lỗi khi thanh toán qua MoMo và ZaloPay.",
    },
  ])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-red-500">Mở</Badge>
      case "in_progress":
        return <Badge className="bg-yellow-500">Đang xử lý</Badge>
      case "resolved":
        return <Badge className="bg-green-500">Đã giải quyết</Badge>
      case "closed":
        return <Badge variant="outline">Đã đóng</Badge>
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case "technical":
        return "Kỹ thuật"
      case "billing":
        return "Thanh toán"
      case "general":
        return "Tổng quát"
      case "feature":
        return "Tính năng"
      default:
        return "Khác"
    }
  }

  const filterTicketsByStatus = (status: string) => {
    if (status === "all") return tickets
    return tickets.filter((ticket) => ticket.status === status)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Hỗ trợ khách hàng</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo ticket mới
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Tạo ticket hỗ trợ mới</DialogTitle>
                  <DialogDescription>Tạo ticket hỗ trợ cho khách hàng</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer">Khách hàng</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn khách hàng" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="abc">Nhà hàng ABC</SelectItem>
                          <SelectItem value="xyz">Quán cà phê XYZ</SelectItem>
                          <SelectItem value="fastfood">Chuỗi FastFood</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Độ ưu tiên</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn độ ưu tiên" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Thấp</SelectItem>
                          <SelectItem value="medium">Trung bình</SelectItem>
                          <SelectItem value="high">Cao</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Danh mục</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Kỹ thuật</SelectItem>
                        <SelectItem value="billing">Thanh toán</SelectItem>
                        <SelectItem value="general">Tổng quát</SelectItem>
                        <SelectItem value="feature">Tính năng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Tiêu đề</Label>
                    <Input id="title" placeholder="Nhập tiêu đề ticket" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Mô tả chi tiết</Label>
                    <Textarea id="description" placeholder="Mô tả chi tiết vấn đề..." rows={4} />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Hủy</Button>
                  <Button className="bg-orange-500 hover:bg-orange-600">Tạo ticket</Button>
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
                <CardTitle className="text-sm font-medium">Tổng tickets</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tickets.length}</div>
                <p className="text-xs text-muted-foreground">Tất cả tickets</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đang mở</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tickets.filter((t) => t.status === "open").length}</div>
                <p className="text-xs text-muted-foreground">Cần xử lý</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đang xử lý</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tickets.filter((t) => t.status === "in_progress").length}</div>
                <p className="text-xs text-muted-foreground">Đang giải quyết</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đã giải quyết</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tickets.filter((t) => t.status === "resolved").length}</div>
                <p className="text-xs text-muted-foreground">Hoàn thành</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="open">Đang mở</TabsTrigger>
              <TabsTrigger value="in_progress">Đang xử lý</TabsTrigger>
              <TabsTrigger value="resolved">Đã giải quyết</TabsTrigger>
            </TabsList>

            {/* Filters */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Tìm kiếm và lọc</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Tìm kiếm theo ID, khách hàng, tiêu đề..." className="pl-10" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Độ ưu tiên" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="high">Cao</SelectItem>
                      <SelectItem value="medium">Trung bình</SelectItem>
                      <SelectItem value="low">Thấp</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="technical">Kỹ thuật</SelectItem>
                      <SelectItem value="billing">Thanh toán</SelectItem>
                      <SelectItem value="general">Tổng quát</SelectItem>
                      <SelectItem value="feature">Tính năng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {["all", "open", "in_progress", "resolved"].map((status) => (
              <TabsContent key={status} value={status}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {status === "all"
                        ? "Tất cả tickets"
                        : status === "open"
                          ? "Tickets đang mở"
                          : status === "in_progress"
                            ? "Tickets đang xử lý"
                            : "Tickets đã giải quyết"}
                    </CardTitle>
                    <CardDescription>Quản lý và theo dõi các yêu cầu hỗ trợ</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Tiêu đề</TableHead>
                          <TableHead>Khách hàng</TableHead>
                          <TableHead>Danh mục</TableHead>
                          <TableHead>Độ ưu tiên</TableHead>
                          <TableHead>Trạng thái</TableHead>
                          <TableHead>Người xử lý</TableHead>
                          <TableHead>Cập nhật</TableHead>
                          <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filterTicketsByStatus(status).map((ticket) => (
                          <TableRow key={ticket.id}>
                            <TableCell className="font-medium">{ticket.id}</TableCell>
                            <TableCell className="max-w-xs">
                              <div>
                                <p className="font-medium truncate">{ticket.title}</p>
                                <p className="text-sm text-gray-500 truncate">{ticket.description}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{ticket.customer}</p>
                                <p className="text-sm text-gray-500">{ticket.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{getCategoryText(ticket.category)}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-2 ${getPriorityColor(ticket.priority)}`}></div>
                                <span className="capitalize">
                                  {ticket.priority === "high"
                                    ? "Cao"
                                    : ticket.priority === "medium"
                                      ? "Trung bình"
                                      : "Thấp"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                            <TableCell>{ticket.assignee || "Chưa phân công"}</TableCell>
                            <TableCell className="text-sm text-gray-500">{ticket.updated}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  Phản hồi
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
    </div>
  )
}
