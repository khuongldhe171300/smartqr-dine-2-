import AdminSidebar from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, DollarSign, Building2, Users, Download, Calendar } from "lucide-react"

export default function AdminReports() {
  const revenueData = [

    { month: "Tháng 6", revenue: 2485000, customers: 16, growth: 160 },
  ]

  const topCustomers = [
    { name: "Chuỗi FastFood", plan: "Premium", revenue: 23940000, restaurants: 15, growth: 28 },
    { name: "Nhà hàng ABC", plan: "Premium", revenue: 19980000, restaurants: 8, growth: 15 },
    { name: "Coffee Chain XYZ", plan: "Standard", revenue: 14985000, restaurants: 12, growth: 22 },
    { name: "Restaurant Group", plan: "Premium", revenue: 11988000, restaurants: 6, growth: 8 },
    { name: "Local Bistro", plan: "Standard", revenue: 8991000, restaurants: 9, growth: 35 },
  ]

  const planPerformance = [
    { plan: "Basic", customers: 234, revenue: 116766000, avgRevenue: 499000, retention: 85 },
    { plan: "Standard", customers: 456, revenue: 455544000, avgRevenue: 999000, retention: 92 },
    { plan: "Premium", customers: 123, revenue: 245877000, avgRevenue: 1999000, retention: 96 },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Báo cáo tổng quan</h1>
            <div className="flex items-center space-x-4">
              <Select defaultValue="6months">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">1 tháng</SelectItem>
                  <SelectItem value="3months">3 tháng</SelectItem>
                  <SelectItem value="6months">6 tháng</SelectItem>
                  <SelectItem value="1year">1 năm</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Tùy chỉnh
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Download className="mr-2 h-4 w-4" />
                Xuất báo cáo
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₫2.485.000</div>
                <p className="text-xs text-muted-foreground">+16.8% so với tháng trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng khách hàng</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">16</div>
                <p className="text-xs text-muted-foreground">+160% so với tháng trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Khách hàng hoạt động</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">44.5% tổng khách hàng</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tăng trưởng trung bình</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+16.8%</div>
                <p className="text-xs text-muted-foreground">Doanh thu hàng tháng</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="revenue" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
              <TabsTrigger value="customers">Khách hàng</TabsTrigger>
              <TabsTrigger value="plans">Gói dịch vụ</TabsTrigger>
              <TabsTrigger value="growth">Tăng trưởng</TabsTrigger>
            </TabsList>

            <TabsContent value="revenue">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Doanh thu theo tháng</CardTitle>
                    <CardDescription>Thống kê doanh thu 6 tháng gần đây</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {revenueData.map((month, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{month.month}</p>
                            <p className="text-sm text-gray-500">{month.customers} khách hàng</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-orange-600">{formatCurrency(month.revenue)}</p>
                            <div
                              className={`flex items-center text-sm ${month.growth >= 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {month.growth >= 0 ? "+" : ""}
                              {month.growth}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Phân tích doanh thu</CardTitle>
                    <CardDescription>Chi tiết cơ cấu doanh thu</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Doanh thu trung bình/tháng</span>
                        <span className="font-bold">{formatCurrency(207083)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Doanh thu/khách hàng TB</span>
                        <span className="font-bold">{formatCurrency(155312)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Tăng trưởng tháng 6</span>
                        <Badge className="bg-green-500">+160%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Dự báo tháng tới</span>
                        <span className="font-bold text-green-600">{formatCurrency(12500000)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="customers">
              <Card>
                <CardHeader>
                  <CardTitle>Top khách hàng theo doanh thu</CardTitle>
                  <CardDescription>Danh sách khách hàng đóng góp doanh thu cao nhất</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tên khách hàng</TableHead>
                        <TableHead>Gói dịch vụ</TableHead>
                        <TableHead>Số nhà hàng</TableHead>
                        <TableHead>Doanh thu</TableHead>
                        <TableHead>Tăng trưởng</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topCustomers.map((customer, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{customer.plan}</Badge>
                          </TableCell>
                          <TableCell>{customer.restaurants}</TableCell>
                          <TableCell className="font-bold">{formatCurrency(customer.revenue)}</TableCell>
                          <TableCell>
                            <div className="flex items-center text-green-600">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              <span>+{customer.growth}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="plans">
              <Card>
                <CardHeader>
                  <CardTitle>Hiệu suất gói dịch vụ</CardTitle>
                  <CardDescription>Phân tích hiệu quả từng gói dịch vụ</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Gói dịch vụ</TableHead>
                        <TableHead>Số khách hàng</TableHead>
                        <TableHead>Tổng doanh thu</TableHead>
                        <TableHead>Doanh thu TB/KH</TableHead>
                        <TableHead>Tỷ lệ giữ chân</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {planPerformance.map((plan, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            <Badge
                              variant={
                                plan.plan === "Premium" ? "default" : plan.plan === "Standard" ? "secondary" : "outline"
                              }
                            >
                              {plan.plan}
                            </Badge>
                          </TableCell>
                          <TableCell>{plan.customers}</TableCell>
                          <TableCell className="font-bold">{formatCurrency(plan.revenue)}</TableCell>
                          <TableCell>{formatCurrency(plan.avgRevenue)}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-green-500 h-2 rounded-full"
                                  style={{ width: `${plan.retention}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{plan.retention}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="growth">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Xu hướng tăng trưởng</CardTitle>
                    <CardDescription>Phân tích xu hướng phát triển</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Tăng trưởng khách hàng mới</span>
                        <Badge className="bg-green-500">+15%/tháng</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Tăng trưởng doanh thu</span>
                        <Badge className="bg-green-500">+18%/tháng</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Tỷ lệ churn</span>
                        <Badge variant="outline">2.3%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Customer Lifetime Value</span>
                        <span className="font-bold">{formatCurrency(15600000)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Dự báo 6 tháng tới</CardTitle>
                    <CardDescription>Dự đoán dựa trên xu hướng hiện tại</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Dự báo khách hàng mới</span>
                        <span className="font-bold text-green-600">+450</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Dự báo doanh thu</span>
                        <span className="font-bold text-green-600">{formatCurrency(12500000000)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Tăng trưởng dự kiến</span>
                        <Badge className="bg-green-500">+25%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>ROI dự kiến</span>
                        <span className="font-bold text-green-600">340%</span>
                      </div>
                    </div>
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
