import AdminSidebar from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdminCustomers() {
  const customers = [
    {
      id: 1,
      name: "Nhà hàng ABC",
      email: "abc@restaurant.com",
      phone: "0123456789",
      plan: "Premium",
      status: "active",
      joinDate: "2024-01-15",
      revenue: "₫15,000,000",
    },
    {
      id: 2,
      name: "Quán cà phê XYZ",
      email: "xyz@coffee.com",
      phone: "0987654321",
      plan: "Standard",
      status: "trial",
      joinDate: "2024-01-14",
      revenue: "₫8,500,000",
    },
    {
      id: 3,
      name: "Chuỗi FastFood",
      email: "contact@fastfood.com",
      phone: "0111222333",
      plan: "Premium",
      status: "active",
      joinDate: "2024-01-13",
      revenue: "₫25,000,000",
    },
    {
      id: 4,
      name: "Quán ăn 123",
      email: "quan123@email.com",
      phone: "0444555666",
      plan: "Basic",
      status: "pending",
      joinDate: "2024-01-12",
      revenue: "₫0",
    },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Quản lý khách hàng</h1>
            <Button className="bg-orange-500 hover:bg-orange-600">Thêm khách hàng</Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
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
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Lọc
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Customers Table */}
          <Card>
            <CardHeader>
              <CardTitle>Danh sách khách hàng</CardTitle>
              <CardDescription>Quản lý tất cả khách hàng sử dụng dịch vụ</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên nhà hàng</TableHead>
                    <TableHead>Liên hệ</TableHead>
                    <TableHead>Gói dịch vụ</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày tham gia</TableHead>
                    <TableHead>Doanh thu</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{customer.email}</p>
                          <p className="text-xs text-gray-500">{customer.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{customer.plan}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            customer.status === "active"
                              ? "default"
                              : customer.status === "trial"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {customer.status === "active"
                            ? "Hoạt động"
                            : customer.status === "trial"
                              ? "Dùng thử"
                              : "Chờ duyệt"}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.joinDate}</TableCell>
                      <TableCell>{customer.revenue}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
