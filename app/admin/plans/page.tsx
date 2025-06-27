"use client"
import AdminSidebar from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Users, DollarSign } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { fetchAllSubscriptionPlans, updateSubscriptionPlan } from "@/lib/subscriptionPlansApi"

interface SubscriptionPlan {
  planId: number
  planName: string
  description: string
  price: number
  billingCycle: string
  maxTables: number
  maxMenuItems: number
  IsActive: boolean
  features: string[]
  createdAt: string
}

export default function AdminPlans() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [featuresText, setFeaturesText] = useState("")


  useEffect(() => {
    if (editingPlan) {
      setSelectedFeatures(editingPlan.features)
    }
  }, [editingPlan])


  useEffect(() => {
    loadPlans()
  }, [])

  const loadPlans = async () => {
    try {
      const data = await fetchAllSubscriptionPlans()
      const parsedData = data.map((plan: any) => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features :
          (plan.features ? JSON.parse(plan.features) : [])
      }))
      setPlans(parsedData)
    } catch (err) {
      console.error("Lỗi tải danh sách gói:", err)
      toast.error("Không thể tải danh sách gói")
    }
  }

  const handleEdit = (plan: SubscriptionPlan) => {
    setEditingPlan(plan)
    setIsEditDialogOpen(true)
  }

  const handleUpdatePlan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingPlan) return

    const formData = new FormData(e.currentTarget)
    const updatedPlan = {
      planName: formData.get('planName') as string,
      description: editingPlan.description,
      price: Number(formData.get('price')),
      billingCycle: editingPlan.billingCycle,
      maxTables: Number(formData.get('maxTables')),
      maxMenuItems: Number(formData.get('maxMenuItems')),
      features: Array.from(formData.getAll('features')) as string[]
    }

    try {
      await updateSubscriptionPlan(editingPlan.planId, updatedPlan)
      toast.success("Cập nhật gói thành công")
      setIsEditDialogOpen(false)
      loadPlans()
    } catch (error) {
      console.error("Lỗi cập nhật gói:", error)
      toast.error("Không thể cập nhật gói")
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Quản lý gói dịch vụ</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo gói mới
                </Button>
              </DialogTrigger>

            </Dialog>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
            {/* Stats cards remain unchanged */}
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.planId} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{plan.planName}</CardTitle>
                    <Badge variant={plan.IsActive ? "default" : "default"}>
                      {plan.IsActive ? "Hoạt động" : "Hoạt động"}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-orange-600">{formatCurrency(plan.price)}</div>
                  <p className="text-sm text-gray-500">/tháng</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Số bàn tối đa:</p>
                      <p className="text-lg">{plan.maxTables === -1 ? "Không giới hạn" : plan.maxTables}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Tính năng:</p>
                      <ul className="text-sm space-y-1 mt-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-gray-500">Doanh thu</p>
                        <p className="text-lg font-bold">{formatCurrency(plan.price * 3)}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleEdit(plan)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Chỉnh sửa gói dịch vụ</DialogTitle>
                <DialogDescription>Cập nhật thông tin gói dịch vụ</DialogDescription>
              </DialogHeader>

              {editingPlan && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)

                    const updatedPlan = {
                      planName: formData.get("planName") as string,
                      price: Number(formData.get("price")),
                      maxTables: Number(formData.get("maxTables")),
                      maxMenuItems: Number(formData.get("maxMenuItems")),
                      billingCycle: editingPlan.billingCycle,
                      description: editingPlan.description,
                      features: selectedFeatures,
                    }

                    updateSubscriptionPlan(editingPlan.planId, updatedPlan)
                      .then(() => {
                        toast.success("Cập nhật gói thành công")
                        setIsEditDialogOpen(false)
                        loadPlans()
                      })
                      .catch((err) => {
                        console.error("Lỗi cập nhật gói:", err)
                        toast.error("Không thể cập nhật gói")
                      })
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="planName">Tên gói</Label>
                      <Input id="planName" name="planName" defaultValue={editingPlan.planName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Giá (VND/tháng)</Label>
                      <Input id="price" name="price" type="number" defaultValue={editingPlan.price} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxTables">Số bàn tối đa</Label>
                      <Input id="maxTables" name="maxTables" type="number" defaultValue={editingPlan.maxTables} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxMenuItems">Số món tối đa</Label>
                      <Input id="maxMenuItems" name="maxMenuItems" type="number" defaultValue={editingPlan.maxMenuItems} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="features">Tính năng (mỗi dòng 1 tính năng)</Label>


                    <ul className="text-sm space-y-1 mt-2">
                      {selectedFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>


                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Hủy
                    </Button>
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                      Cập nhật
                    </Button>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>



          <Card>
            <CardHeader>
              <CardTitle>Chi tiết gói dịch vụ</CardTitle>
              <CardDescription>Quản lý và theo dõi hiệu suất các gói dịch vụ</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên gói</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Số bàn</TableHead>
                    <TableHead>Số Món</TableHead>
                    <TableHead>Doanh thu</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan) => (
                    <TableRow key={plan.planId}>
                      <TableCell className="font-medium">{plan.planName}</TableCell>
                      <TableCell>{formatCurrency(plan.price)}</TableCell>
                      <TableCell>{plan.maxTables === -1 ? "Không giới hạn" : plan.maxTables}</TableCell>
                      <TableCell>{plan.maxMenuItems === -1 ? "Không giới hạn" : plan.maxMenuItems}</TableCell>
                      <TableCell>{formatCurrency(plan.price * 3)}</TableCell>
                      <TableCell>
                        <Badge variant={plan.IsActive ? "default" : "default"}>
                          {plan.IsActive ? "Hoạt động" : "Hoạt động"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(plan)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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
