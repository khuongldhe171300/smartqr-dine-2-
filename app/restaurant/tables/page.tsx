"use client"

import { useEffect, useState } from "react"
import RestaurantSidebar from "@/components/restaurant-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, Plus, Edit, Trash2, Users, Clock } from "lucide-react"
import { de } from "date-fns/locale"

interface TableData {
  tableId: number
  tableNumber: string
  capacity: number
  location: string
  status: string
  qrcodeData: string
  qrcodeUrl: string
  createdAt: string
  updatedAt: string
  currentOrder?: {
    orderId: number
    customerName: string
    status: string
    createdAt: string
  } | null
}

export default function RestaurantTables() {
  const [tables, setTables] = useState<TableData[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [tableNumber, setTableNumber] = useState("")
  const [capacity, setCapacity] = useState(0)
  const [locations, setLocation] = useState("")
  const [status, setStatus] = useState("Available")


  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Tables`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "ngrok-skip-browser-warning": "true"
          },
        })
        if (!res.ok) throw new Error("Không thể tải danh sách bàn")
        const data = await res.json()
        setTables(data)
      } catch (err) {
        console.error("Lỗi tải bàn:", err)
      }
    }
    fetchTables()
  }, [])


  const handleAddTable = async () => {
    try {
      const formData = new FormData()
      formData.append("TableNumber", tableNumber)
      formData.append("Capacity", capacity.toString())
      formData.append("Location", locations)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Tables`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "ngrok-skip-browser-warning": "true"
        },
        body: formData,
      })

      if (!res.ok) throw new Error("Không thể thêm bàn")

      const result = await res.json()
      alert(result.message)
      setShowAddDialog(false)
      location.reload()
    } catch (err: any) {
      alert("Lỗi: " + err.message)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 border-green-300 text-green-800"
      case "Occupied":
        return "bg-red-100 border-red-300 text-red-800"
      case "Reserved":
        return "bg-yellow-100 border-yellow-300 text-yellow-800"
      case "Cleaning":
        return "bg-gray-100 border-gray-300 text-gray-800"
      default:
        return "bg-gray-100 border-gray-300 text-gray-800"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return <Badge className="bg-green-500">Trống</Badge>
      case "Occupied":
        return <Badge className="bg-red-500">Có khách</Badge>
      case "Reserved":
        return <Badge className="bg-yellow-500">Đã đặt</Badge>
      case "Cleaning":
        return <Badge variant="secondary">Dọn dẹp</Badge>
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <RestaurantSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Quản lý bàn ăn</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <QrCode className="mr-2 h-4 w-4" />
                In mã QR
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm bàn mới
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Thêm bàn mới</DialogTitle>
                    <DialogDescription>Tạo bàn ăn mới cho nhà hàng</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="tableNumber">Số bàn</Label>
                      <Input id="tableNumber" placeholder="Nhập số bàn" value={tableNumber} onChange={e => setTableNumber(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Số chỗ ngồi</Label>
                      <Input id="capacity" type="number" placeholder="Số người tối đa" value={capacity} onChange={e => setCapacity(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Khu vực</Label>
                      <Input id="location" placeholder="Nhập vị trí bàn" value={locations} onChange={e => setLocation(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Trạng thái</Label>
                      <select id="status" className="w-full border rounded p-2" value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="Available">Trống</option>
                        <option value="Occupied">Có khách</option>
                        <option value="Reserved">Đã đặt</option>
                        <option value="Cleaning">Dọn dẹp</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>Hủy</Button>
                    <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddTable}>Thêm bàn</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng số bàn</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tables.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bàn trống</CardTitle>
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {tables.filter((t) => t.status === "Available").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bàn có khách</CardTitle>
                <div className="h-3 w-3 rounded-full bg-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {tables.filter((t) => t.status === "Occupied").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bàn đã đặt</CardTitle>
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {tables.filter((t) => t.status === "Reserved").length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sơ đồ bàn ăn</CardTitle>
              <CardDescription>Quản lý trạng thái và thông tin các bàn ăn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tables.map((table) => (
                  <Card
                    key={table.tableId}
                    className={`relative ${getStatusColor(table.status)} border-2`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Bàn {table.tableNumber}</CardTitle>
                        {getStatusBadge(table.status)}
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Users className="h-4 w-4" />
                        <span>{table.capacity} chỗ</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {table.status === "occupied" && table.currentOrder && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="h-4 w-4" />
                            <span>Bắt đầu: {new Date(table.currentOrder.createdAt).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-sm">Khách: {table.currentOrder.customerName}</p>
                          <p className="text-sm">Đơn: #{table.currentOrder.orderId}</p>
                        </div>
                      )}
                      {table.status === "reserved" && table.currentOrder && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="h-4 w-4" />
                            <span>Đặt lúc: {new Date(table.currentOrder.createdAt).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-sm">Khách: {table.currentOrder.customerName}</p>
                        </div>
                      )}
                      {table.status === "Available" && <p className="text-sm text-gray-600">Sẵn sàng phục vụ</p>}
                      {table.status === "Cleaning" && <p className="text-sm text-gray-600">Đang dọn dẹp</p>}

                      <div className="flex flex-col items-center justify-between mt-4 pt-3 border-t">
                        <div className="flex items-center space-x-1 text-xs">
                          <QrCode className="h-3 w-3" />
                          <span>{table.qrcodeData}</span>
                        </div>
                        <div style={{ paddingTop: "40px" }} className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <QrCode className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
