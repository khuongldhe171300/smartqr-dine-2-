"use client"

import { useState } from "react"
import RestaurantSidebar from "@/components/restaurant-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react"

export default function RestaurantOrders() {
    const [orders] = useState([
        {
            id: "#001",
            table: "Bàn 5",
            customer: "Nguyễn Văn A",
            items: [
                { name: "Pizza Hải Sản", quantity: 1, price: 169000 },
                { name: "Cà phê đen", quantity: 2, price: 35000 },
            ],
            total: 239000,
            status: "preparing",
            time: "14:30",
            note: "Không hành",
        },
        {
            id: "#002",
            table: "Bàn 12",
            customer: "Trần Thị B",
            items: [
                { name: "Burger Bò", quantity: 2, price: 145000 },
                { name: "Nước ngọt", quantity: 2, price: 25000 },
            ],
            total: 340000,
            status: "ready",
            time: "14:25",
            note: "",
        },
        {
            id: "#003",
            table: "Bàn 3",
            customer: "Lê Văn C",
            items: [
                { name: "Pasta Carbonara", quantity: 1, price: 150000 },
                { name: "Salad Caesar", quantity: 1, price: 89000 },
            ],
            total: 239000,
            status: "completed",
            time: "14:15",
            note: "Ít muối",
        },
        {
            id: "#004",
            table: "Bàn 8",
            customer: "Phạm Thị D",
            items: [
                { name: "Steak Bò Úc", quantity: 1, price: 300000 },
                { name: "Rượu vang đỏ", quantity: 1, price: 150000 },
            ],
            total: 450000,
            status: "cancelled",
            time: "14:10",
            note: "Khách hủy",
        },
    ])

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "preparing":
                return <Clock className="h-4 w-4" />
            case "ready":
                return <AlertCircle className="h-4 w-4" />
            case "completed":
                return <CheckCircle className="h-4 w-4" />
            case "cancelled":
                return <XCircle className="h-4 w-4" />
            default:
                return <Clock className="h-4 w-4" />
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "preparing":
                return <Badge variant="destructive">Đang chế biến</Badge>
            case "ready":
                return <Badge variant="secondary">Sẵn sàng</Badge>
            case "completed":
                return <Badge variant="default">Hoàn thành</Badge>
            case "cancelled":
                return <Badge variant="outline">Đã hủy</Badge>
            default:
                return <Badge variant="outline">Không xác định</Badge>
        }
    }

    const filterOrdersByStatus = (status: string) => {
        if (status === "all") return orders
        return orders.filter((order) => order.status === status)
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <RestaurantSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="flex items-center justify-between px-6 py-4">
                        <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
                        <div className="flex items-center space-x-4">
                            <Button variant="outline">Xuất báo cáo</Button>
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
                                <CardTitle className="text-sm font-medium">Đang chế biến</CardTitle>
                                <Clock className="h-4 w-4 text-orange-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{filterOrdersByStatus("preparing").length}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Sẵn sàng</CardTitle>
                                <AlertCircle className="h-4 w-4 text-blue-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{filterOrdersByStatus("ready").length}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Hoàn thành</CardTitle>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{filterOrdersByStatus("completed").length}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Đã hủy</CardTitle>
                                <XCircle className="h-4 w-4 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{filterOrdersByStatus("cancelled").length}</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Orders Tabs */}
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="mb-6">
                            <TabsTrigger value="all">Tất cả</TabsTrigger>
                            <TabsTrigger value="preparing">Đang chế biến</TabsTrigger>
                            <TabsTrigger value="ready">Sẵn sàng</TabsTrigger>
                            <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
                            <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
                        </TabsList>

                        {["all", "preparing", "ready", "completed", "cancelled"].map((status) => (
                            <TabsContent key={status} value={status}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            {status === "all"
                                                ? "Tất cả đơn hàng"
                                                : status === "preparing"
                                                    ? "Đơn hàng đang chế biến"
                                                    : status === "ready"
                                                        ? "Đơn hàng sẵn sàng"
                                                        : status === "completed"
                                                            ? "Đơn hàng hoàn thành"
                                                            : "Đơn hàng đã hủy"}
                                        </CardTitle>
                                        <CardDescription>Quản lý và theo dõi trạng thái các đơn hàng</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {filterOrdersByStatus(status).map((order) => (
                                                <Card key={order.id} className="p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-4 mb-3">
                                                                <div className="flex items-center space-x-2">
                                                                    {getStatusIcon(order.status)}
                                                                    <span className="font-bold text-lg">{order.id}</span>
                                                                </div>
                                                                <Badge variant="outline">{order.table}</Badge>
                                                                {getStatusBadge(order.status)}
                                                                <span className="text-sm text-gray-500">{order.time}</span>
                                                            </div>

                                                            <div className="mb-3">
                                                                <p className="text-sm text-gray-600">Khách hàng: {order.customer}</p>
                                                                {order.note && <p className="text-sm text-orange-600">Ghi chú: {order.note}</p>}
                                                            </div>

                                                            <div className="space-y-2">
                                                                {order.items.map((item, index) => (
                                                                    <div key={index} className="flex justify-between text-sm">
                                                                        <span>
                                                                            {item.quantity}x {item.name}
                                                                        </span>
                                                                        <span>{formatCurrency(item.price * item.quantity)}</span>
                                                                    </div>
                                                                ))}
                                                                <div className="border-t pt-2 flex justify-between font-bold">
                                                                    <span>Tổng cộng:</span>
                                                                    <span className="text-orange-600">{formatCurrency(order.total)}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col space-y-2 ml-4">
                                                            {order.status === "preparing" && (
                                                                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                                                                    Sẵn sàng
                                                                </Button>
                                                            )}
                                                            {order.status === "ready" && (
                                                                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                                                    Hoàn thành
                                                                </Button>
                                                            )}
                                                            {(order.status === "preparing" || order.status === "ready") && (
                                                                <Button size="sm" variant="outline" className="text-red-600">
                                                                    Hủy đơn
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
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
