import AdminSidebar from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, CreditCard, DollarSign, TrendingUp, AlertCircle } from "lucide-react"

export default function AdminPayments() {
  const payments = [
    {
      id: "PAY001",
      customer: "Nhà hàng ABC",
      plan: "Premium",
      amount: 1999000,
      status: "completed",
      method: "bank_transfer",
      date: "2024-01-15",
      invoiceId: "INV001",
    },
    {
      id: "PAY002",
      customer: "Quán cà phê XYZ",
      plan: "Standard",
      amount: 999000,
      status: "pending",
      method: "credit_card",
      date: "2024-01-14",
      invoiceId: "INV002",
    },
    {
      id: "PAY003",
      customer: "Chuỗi FastFood",
      plan: "Premium",
      amount: 1999000,
      status: "completed",
      method: "e_wallet",
      date: "2024-01-13",
      invoiceId: "INV003",
    },
    {
      id: "PAY004",
      customer: "Quán ăn 123",
      plan: "Basic",
      amount: 499000,
      status: "failed",
      method: "credit_card",
      date: "2024-01-12",
      invoiceId: "INV004",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Thành công</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Đang xử lý</Badge>
      case "failed":
        return <Badge className="bg-red-500">Thất bại</Badge>
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }

  const getMethodText = (method: string) => {
    switch (method) {
      case "bank_transfer":
        return "Chuyển khoản"
      case "credit_card":
        return "Thẻ tín dụng"
      case "e_wallet":
        return "Ví điện tử"
      default:
        return "Khác"
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Quản lý thanh toán</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Xuất báo cáo
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600">Làm mới</Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Doanh thu tháng</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₫4.5M</div>
                <p className="text-xs text-muted-foreground">+12% so với tháng trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Giao dịch thành công</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{payments.filter((p) => p.status === "completed").length}</div>
                <p className="text-xs text-muted-foreground">Trong tháng này</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đang xử lý</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{payments.filter((p) => p.status === "pending").length}</div>
                <p className="text-xs text-muted-foreground">Cần xử lý</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tỷ lệ thành công</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((payments.filter((p) => p.status === "completed").length / payments.length) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">Tháng này</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="completed">Thành công</TabsTrigger>
              <TabsTrigger value="pending">Đang xử lý</TabsTrigger>
              <TabsTrigger value="failed">Thất bại</TabsTrigger>
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
                    <Input placeholder="Tìm kiếm theo mã giao dịch, khách hàng..." className="pl-10" />
                  </div>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Lọc theo ngày
                  </Button>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Lọc theo phương thức
                  </Button>
                </div>
              </CardContent>
            </Card>

            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Tất cả giao dịch</CardTitle>
                  <CardDescription>Danh sách tất cả giao dịch thanh toán</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã giao dịch</TableHead>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Gói dịch vụ</TableHead>
                        <TableHead>Số tiền</TableHead>
                        <TableHead>Phương thức</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Ngày</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.customer}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{payment.plan}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>{getMethodText(payment.method)}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm">
                                Chi tiết
                              </Button>
                              <Button variant="outline" size="sm">
                                Hóa đơn
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

            <TabsContent value="completed">
              <Card>
                <CardHeader>
                  <CardTitle>Giao dịch thành công</CardTitle>
                  <CardDescription>Danh sách giao dịch đã hoàn thành</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã giao dịch</TableHead>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Gói dịch vụ</TableHead>
                        <TableHead>Số tiền</TableHead>
                        <TableHead>Phương thức</TableHead>
                        <TableHead>Ngày</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments
                        .filter((payment) => payment.status === "completed")
                        .map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>{payment.customer}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{payment.plan}</Badge>
                            </TableCell>
                            <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                            <TableCell>{getMethodText(payment.method)}</TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm">
                                  Chi tiết
                                </Button>
                                <Button variant="outline" size="sm">
                                  Hóa đơn
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

            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>Giao dịch đang xử lý</CardTitle>
                  <CardDescription>Danh sách giao dịch cần xử lý</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã giao dịch</TableHead>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Gói dịch vụ</TableHead>
                        <TableHead>Số tiền</TableHead>
                        <TableHead>Phương thức</TableHead>
                        <TableHead>Ngày</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments
                        .filter((payment) => payment.status === "pending")
                        .map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>{payment.customer}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{payment.plan}</Badge>
                            </TableCell>
                            <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                            <TableCell>{getMethodText(payment.method)}</TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                  Xác nhận
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-600">
                                  Từ chối
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

            <TabsContent value="failed">
              <Card>
                <CardHeader>
                  <CardTitle>Giao dịch thất bại</CardTitle>
                  <CardDescription>Danh sách giao dịch không thành công</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã giao dịch</TableHead>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Gói dịch vụ</TableHead>
                        <TableHead>Số tiền</TableHead>
                        <TableHead>Phương thức</TableHead>
                        <TableHead>Ngày</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments
                        .filter((payment) => payment.status === "failed")
                        .map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>{payment.customer}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{payment.plan}</Badge>
                            </TableCell>
                            <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                            <TableCell>{getMethodText(payment.method)}</TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm">
                                  Chi tiết lỗi
                                </Button>
                                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                                  Thử lại
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
          </Tabs>
        </main>
      </div>
    </div>
  )
}
