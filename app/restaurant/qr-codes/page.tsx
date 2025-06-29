"use client"

import { useEffect, useState } from "react"
import RestaurantSidebar from "@/components/restaurant-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { QrCode, Download, PrinterIcon as Print, Eye, Edit, Trash2, Plus } from "lucide-react"

interface QrCodeData {
  tableId: number;
  tableNumber: string;
  qrcodeData: string;
  qrcodeUrl: string;
  createdAt: string;
  updatedAt: string;
  scans?: number;
  lastScan?: string;
  active: boolean;
}

export default function RestaurantQRCodes() {
  const [qrCodes, setQrCodes] = useState<QrCodeData[]>([])
  const [newTableNumber, setNewTableNumber] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)

  useEffect(() => {
    const fetchQrCodes = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Tables`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if (!res.ok) throw new Error("Không thể tải danh sách bàn")
        const data = await res.json()
        const formatted = data.map((t: any) => ({
          tableId: t.tableId,
          tableNumber: t.tableNumber,
          qrcodeData: t.qrcodeData,
          qrcodeUrl: t.qrcodeUrl,
          createdAt: t.createdAt,
          updatedAt: t.updatedAt,
          scans: Math.floor(Math.random() * 100),
          lastScan: new Date().toLocaleString(),
          active: !!t.qrcodeUrl,
        }))
        setQrCodes(formatted)
      } catch (err) {
        console.error("Lỗi tải QR Codes:", err)
      }
    }

    fetchQrCodes()
  }, [])

  const handleCreateQr = async () => {
    try {
      const formData = new FormData()
      formData.append("tbId", newTableNumber)

      const res = await fetch(`https://localhost:7082/api/Tables/qr-code-create/${newTableNumber}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      })

      if (!res.ok) throw new Error("Không thể tạo mã QR")

      const result = await res.json()
      alert(result.message)
      setShowAddDialog(false)
      window.location.reload()
    } catch (err: any) {
      alert("Lỗi: " + err.message)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <RestaurantSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Quản lý mã QR</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Tải tất cả QR
              </Button>
              <Button variant="outline">
                <Print className="mr-2 h-4 w-4" />
                In tất cả
              </Button>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Tạo QR mới
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tạo mã QR mới</DialogTitle>
                    <DialogDescription>Tạo mã QR cho bàn ăn mới</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="tableNumber">Số bàn</Label>
                      <Input
                        id="tableNumber"
                        placeholder="Nhập số bàn"
                        value={newTableNumber}
                        onChange={(e) => setNewTableNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>Hủy</Button>
                    <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleCreateQr}>Tạo QR</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Tổng mã QR</CardTitle>
                <QrCode className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{qrCodes.length}</div>
                <p className="text-xs text-muted-foreground">Đã tạo</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">QR đang hoạt động</CardTitle>
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{qrCodes.filter(qr => qr.active).length}</div>
                <p className="text-xs text-muted-foreground">Có thể sử dụng</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Lượt quét hôm nay</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{qrCodes.reduce((total, qr) => total + (qr.scans || 0), 0)}</div>
                <p className="text-xs text-muted-foreground">+12% so với hôm qua</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">QR phổ biến nhất</CardTitle>
                <QrCode className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {qrCodes.length > 0 && (
                  <>
                    <div className="text-2xl font-bold">
                      Bàn {
                        qrCodes.reduce((a, b) => (a?.scans ?? 0) > (b?.scans ?? 0) ? a : b).tableNumber
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {qrCodes.reduce((a, b) => (a?.scans ?? 0) > (b?.scans ?? 0) ? a : b).scans} lượt quét
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {qrCodes.map((qr) => (
              <Card key={qr.tableId} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Bàn {qr.tableNumber}</CardTitle>
                    <Badge variant={qr.active ? "default" : "secondary"}>{qr.active ? "Hoạt động" : "Tạm dừng"}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">Mã: {qr.tableNumber}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-4">
                    <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      {/* <QrCode className="h-16 w-16 text-gray-400" /> */}
                      {qr.qrcodeUrl ? (
                        <img
                          src={`https://localhost:7082${qr.qrcodeUrl}`} // hoặc domain thật nếu đã deploy
                          alt={`QR bàn ${qr.tableNumber}`}
                          className="h-32 w-32 object-contain"
                        />
                      ) : (
                        <QrCode className="h-16 w-16 text-gray-400" />
                      )}

                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">URL:</p>
                      <p className="text-xs text-gray-500 break-all">{qr.qrcodeData}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Lượt quét</p>
                        <p className="text-lg font-bold text-orange-600">{qr.scans}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Quét cuối</p>
                        <p className="text-xs text-gray-500">{qr.lastScan}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-3 border-t">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-1 h-3 w-3" />
                        Xem
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Print className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="mr-1 h-3 w-3" />
                        Sửa
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
        </main>
      </div>
    </div>
  )
}
