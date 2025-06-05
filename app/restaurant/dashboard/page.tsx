"use client";

import { useEffect, useState } from "react";
import RestaurantSidebar from "@/components/restaurant-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, DollarSign, Clock, Users, TrendingUp, AlertCircle } from "lucide-react";

export default function RestaurantDashboard() {
  // State lưu số liệu
  const [stats, setStats] = useState<null | {
    ordersToday: number;
    ordersPercent: number;
    revenueToday: number;
    revenuePercent: number;
    successToday: number;
    successPercent: number;
    loyalToday: number;
    loyalPercent: number;
  }>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Lấy token từ localStorage hoặc nơi bạn lưu token khi login
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Bạn chưa đăng nhập!");

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Restaurant/stats-today`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          let msg = "Lỗi khi lấy dữ liệu Dashboard";
          try {
            const data = await res.json();
            if (data?.message) msg = data.message;
          } catch { }
          throw new Error(msg);
        }
        const data = await res.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message || "Lỗi không xác định");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Hàm format tiền tệ
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

  return (
    <div className="flex h-screen bg-gray-100">
      <RestaurantSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500">Nhà hàng ABC - Gói Premium</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Xem báo cáo</Button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">R</span>
                </div>
                <span className="text-sm font-medium">Restaurant Owner</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              <div className="col-span-4 text-center py-12">Đang tải dữ liệu...</div>
            ) : error ? (
              <div className="col-span-4 text-center text-red-500">{error}</div>
            ) : stats ? (
              <>
                {/* Đơn hàng hôm nay */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Đơn hàng hôm nay</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.ordersToday}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.ordersPercent >= 0 ? "+" : ""}
                      {stats.ordersPercent}% so với hôm qua
                    </p>
                  </CardContent>
                </Card>
                {/* Doanh thu hôm nay */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Doanh thu hôm nay</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(stats.revenueToday)}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.revenuePercent >= 0 ? "+" : ""}
                      {stats.revenuePercent}% so với hôm qua
                    </p>
                  </CardContent>
                </Card>
                {/* Đơn hàng thành công */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Đơn hàng thành công</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.successToday}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.successPercent >= 0 ? "+" : ""}
                      {stats.successPercent}% so với hôm qua
                    </p>
                  </CardContent>
                </Card>
                {/* Khách hàng thân thiết */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Khách hàng thân thiết</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.loyalToday}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.loyalPercent >= 0 ? "+" : ""}
                      {stats.loyalPercent} so với hôm qua
                    </p>
                  </CardContent>
                </Card>
              </>
            ) : null}
          </div>

          {/* Đơn hàng gần đây */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Đơn hàng gần đây</CardTitle>
                <CardDescription>Các đơn hàng mới nhất trong ngày</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "#001",
                      table: "Bàn 5",
                      items: "Pizza Hải Sản, Cà phê",
                      total: "₫234,000",
                      status: "preparing",
                    },
                    { id: "#002", table: "Bàn 12", items: "Burger Bò, Nước ngọt", total: "₫156,000", status: "ready" },
                    { id: "#003", table: "Bàn 3", items: "Pasta, Salad", total: "₫189,000", status: "completed" },
                    { id: "#004", table: "Bàn 8", items: "Steak, Rượu vang", total: "₫450,000", status: "preparing" },
                  ].map((order, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {order.id} - {order.table}
                        </p>
                        <p className="text-sm text-gray-500">{order.items}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.total}</p>
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "default"
                              : order.status === "ready"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {order.status === "completed"
                            ? "Hoàn thành"
                            : order.status === "ready"
                              ? "Sẵn sàng"
                              : "Đang chế biến"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Items */}
            <Card>
              <CardHeader>
                <CardTitle>Món ăn bán chạy</CardTitle>
                <CardDescription>Top món ăn được đặt nhiều nhất tuần này</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Pizza Hải Sản", orders: 45, revenue: "₫7,650,000", trend: "+15%" },
                    { name: "Burger Bò", orders: 38, revenue: "₫5,510,000", trend: "+8%" },
                    { name: "Pasta Carbonara", orders: 32, revenue: "₫4,800,000", trend: "+12%" },
                    { name: "Steak Bò Úc", orders: 28, revenue: "₫8,400,000", trend: "+5%" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.orders} đơn hàng</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.revenue}</p>
                        <div className="flex items-center text-green-600 text-sm">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {item.trend}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Button className="h-20 flex flex-col space-y-2">
                  <ShoppingCart className="h-6 w-6" />
                  <span>Xem đơn hàng</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col space-y-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>Báo cáo</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col space-y-2">
                  <Users className="h-6 w-6" />
                  <span>Quản lý bàn</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col space-y-2">
                  <AlertCircle className="h-6 w-6" />
                  <span>Hỗ trợ</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
