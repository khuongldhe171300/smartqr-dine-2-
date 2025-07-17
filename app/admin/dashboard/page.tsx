"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, DollarSign, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { fetchDashboardStats, DashboardStats } from "@/lib/adminApi";

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats()
      .then((res) => {
        setStats(res);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải dữ liệu thống kê");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Xuất báo cáo</Button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="text-sm font-medium">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Thông báo lỗi hoặc đang tải */}
          {loading && (
            <div className="mb-4 text-center text-gray-600">Đang tải dữ liệu...</div>
          )}
          {error && (
            <div className="mb-4 text-center text-red-500">{error}</div>
          )}

          {/* Stats Cards */}
          {!loading && !error && stats && (
            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng khách hàng</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.monthlyGrowth >= 0 ? "+" : ""}
                    {stats.monthlyGrowth}% so với tháng trước
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Khách hàng hoạt động</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.onlineToday.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.onlineYesterday > 0
                      ? `${((stats.onlineToday - stats.onlineYesterday) / stats.onlineYesterday * 100).toFixed(1)}% so với hôm qua`
                      : "Không có dữ liệu hôm qua"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Online hôm qua</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.onlineYesterday.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Số người dùng online hôm qua
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tăng trưởng tháng</CardTitle>
                  {stats.monthlyGrowth >= 0
                    ? <TrendingUp className="h-4 w-4 text-green-500" />
                    : <TrendingDown className="h-4 w-4 text-red-500" />}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.monthlyGrowth >= 0 ? "+" : ""}
                    {stats.monthlyGrowth}%
                  </div>
                  <p className="text-xs text-muted-foreground">So với tháng trước</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Recent Customers & Support Tickets */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent Customers */}
            <Card>
              <CardHeader>
                <CardTitle>Khách hàng mới</CardTitle>
                <CardDescription>Danh sách khách hàng đăng ký gần đây</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Bún Bò Hoàng Huế", plan: "Normal", date: "2025-06-16", status: "active" },
                    { name: "Quán Nhậu Mạnh Hùng", plan: "Basic", date: "2025-06-16", status: "active" },
                    { name: "Phở bò Nam Định", plan: "Basic", date: "2025-06-14", status: "active" },
                    { name: "Vượng Quán", plan: "Vip", date: "2025-06-14", status: "active" },
                  ].map((customer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-500">{customer.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{customer.plan}</Badge>
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
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Support Tickets */}
            <Card>
              <CardHeader>
                <CardTitle>Yêu cầu hỗ trợ</CardTitle>
                <CardDescription>Các ticket hỗ trợ cần xử lý</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Không thể cập nhật menu",
                      customer: "Cơm Việt",
                      priority: "high",
                      time: "12 giờ trước",
                    },
                    {
                      title: "Yêu cầu nâng cấp gói",
                      customer: "Cơm Tấm Sài Gòn",
                      priority: "medium",
                      time: "14 giờ trước",
                    },
                    {
                      title: "Hướng dẫn sử dụng QR",
                      customer: "Chuỗi FastFood",
                      priority: "low",
                      time: "1 ngày trước",
                    },
                  ].map((ticket, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <AlertCircle
                        className={`h-5 w-5 mt-0.5 ${ticket.priority === "high"
                          ? "text-red-500"
                          : ticket.priority === "medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                          }`}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{ticket.title}</p>
                        <p className="text-sm text-gray-500">{ticket.customer}</p>
                        <p className="text-xs text-gray-400">{ticket.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
