import RestaurantSidebar from "@/components/restaurant-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, DollarSign, ShoppingCart, Clock, Users, Download, Calendar } from "lucide-react"

export default function RestaurantReports() {
  const salesData = [
    { date: "2024-01-15", orders: 47, revenue: 2400000, avgTime: 18 },
    { date: "2024-01-14", orders: 42, revenue: 2100000, avgTime: 20 },
    { date: "2024-01-13", orders: 38, revenue: 1950000, avgTime: 22 },
    { date: "2024-01-12", orders: 45, revenue: 2300000, avgTime: 19 },
    { date: "2024-01-11", orders: 41, revenue: 2050000, avgTime: 21 },
  ]

  const topItems = [
    { name: "Pizza Hải Sản", orders: 45, revenue: 8505000, percentage: 15.2 },
    { name: "Burger Bò", orders: 38, revenue: 5510000, percentage: 12.8 },
    { name: "Pasta Carbonara", orders: 32, revenue: 4640000, percentage: 10.5 },
    { name: "Steak Bò Úc", orders: 28, revenue: 8400000, percentage: 9.8 },
    { name: "Cà phê Espresso", orders: 67, revenue: 3015000, percentage: 8.3 },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <RestaurantSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Báo cáo & Thống kê</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Chọn khoảng thời gian
              </Button>
              <Button variant="outline">
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
                <CardTitle className="text-sm font-medium">Doanh thu tuần</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₫16.8M</div>
                <p className="text-xs text-muted-foreground">+12% so với tuần trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đơn hàng tuần</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">213</div>
                <p className="text-xs text-muted-foreground">+8% so với tuần trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Thời gian phục vụ TB</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">20 phút</div>
                <p className="text-xs text-muted-foreground">-2 phút so với tuần trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Khách hàng mới</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">34</div>
                <p className="text-xs text-muted-foreground">+15% so với tuần trước</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="sales" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="sales">Doanh thu</TabsTrigger>
              <TabsTrigger value="items">Món ăn</TabsTrigger>
              <TabsTrigger value="customers">Khách hàng</TabsTrigger>
              <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
            </TabsList>

            <TabsContent value="sales">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Doanh thu theo ngày</CardTitle>
                    <CardDescription>Thống kê doanh thu 5 ngày gần đây</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {salesData.map((day, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{day.date}</p>
                            <p className="text-sm text-gray-500">{day.orders} đơn hàng</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-orange-600">{formatCurrency(day.revenue)}</p>
                            <div className="flex items-center text-green-600 text-sm">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {index === 0 ? "+14%" : index === 1 ? "+8%" : "+5%"}
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
                        <span>Doanh thu trung bình/ngày</span>
                        <span className="font-bold">{formatCurrency(2160000)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Giá trị đơn hàng trung bình</span>
                        <span className="font-bold">{formatCurrency(101408)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Tăng trưởng tuần này</span>
                        <Badge className="bg-green-500">+12%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Dự báo tuần tới</span>
                        <span className="font-bold text-green-600">{formatCurrency(18816000)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="items">
              <Card>
                <CardHeader>
                  <CardTitle>Món ăn bán chạy nhất</CardTitle>
                  <CardDescription>Top 5 món ăn được đặt nhiều nhất tuần này</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tên món</TableHead>
                        <TableHead>Số đơn</TableHead>
                        <TableHead>Doanh thu</TableHead>
                        <TableHead>Tỷ lệ</TableHead>
                        <TableHead>Xu hướng</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.orders}</TableCell>
                          <TableCell>{formatCurrency(item.revenue)}</TableCell>
                          <TableCell>{item.percentage}%</TableCell>
                          <TableCell>
                            <div className="flex items-center text-green-600">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              <span className="text-sm">+{Math.floor(Math.random() * 20 + 5)}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customers">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Thống kê khách hàng</CardTitle>
                    <CardDescription>Phân tích hành vi khách hàng</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Tổng khách hàng</span>
                        <span className="font-bold">1,234</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Khách hàng mới tuần này</span>
                        <span className="font-bold text-green-600">34</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Khách hàng quay lại</span>
                        <span className="font-bold">67%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Đánh giá trung bình</span>
                        <Badge className="bg-yellow-500">4.8/5</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Giờ cao điểm</CardTitle>
                    <CardDescription>Thống kê theo khung giờ</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { time: "11:00 - 13:00", orders: 89, percentage: 42 },
                        { time: "18:00 - 21:00", orders: 76, percentage: 36 },
                        { time: "13:00 - 17:00", orders: 32, percentage: 15 },
                        { time: "21:00 - 22:00", orders: 16, percentage: 7 },
                      ].map((slot, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{slot.time}</p>
                            <p className="text-sm text-gray-500">{slot.orders} đơn hàng</p>
                          </div>
                          <div className="flex items-center">
                            <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                              <div
                                className="bg-orange-500 h-2 rounded-full"
                                style={{ width: `${slot.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{slot.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Hiệu suất phục vụ</CardTitle>
                    <CardDescription>Thống kê thời gian và chất lượng phục vụ</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Thời gian phục vụ trung bình</span>
                        <span className="font-bold">20 phút</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Thời gian chờ tối đa</span>
                        <span className="font-bold">35 phút</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Tỷ lệ phục vụ đúng giờ</span>
                        <Badge className="bg-green-500">94%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Đơn hàng bị hủy</span>
                        <span className="font-bold text-red-600">2.3%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hiệu quả nhân viên</CardTitle>
                    <CardDescription>Thống kê năng suất làm việc</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Số nhân viên đang làm</span>
                        <span className="font-bold">8</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Đơn hàng/nhân viên/giờ</span>
                        <span className="font-bold">5.3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Hiệu suất tổng thể</span>
                        <Badge className="bg-green-500">Tốt</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Đánh giá nhân viên TB</span>
                        <span className="font-bold">4.6/5</span>
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
