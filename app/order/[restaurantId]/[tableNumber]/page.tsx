'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Minus, Plus, ShoppingCart, Clock, MapPin } from 'lucide-react'

type MenuItem = {
  id: number
  name: string
  description: string
  price: number
  image: string
  categoryName: string
  rating: number
  prepTime: string
  popular?: boolean
  spicy?: boolean
}

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  note?: string
}

export default function OrderPage() {
  const { restaurantId, tableNumber } = useParams() as {
    restaurantId: string
    tableNumber: string
  }

  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [tableValid, setTableValid] = useState(true)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    note: ''
  })

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const exists = prev.find((x) => x.id === item.id)
      if (exists) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
        )
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }]
    })
  }

  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((x) => (x.id === id ? { ...x, quantity: x.quantity + 1 } : x))
    )
  }

  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, quantity: x.quantity - 1 } : x))
        .filter((x) => x.quantity > 0)
    )
  }

  const filterItemsByCategory = (category: string) => {
    if (category === 'all') return menuItems
    return menuItems.filter((item) => item.categoryName === category)
  }

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(
          `https://localhost:7082/api/Menu/${restaurantId}/menu`
        )
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

        const data = await res.json()
        const normalized = data.map((item: any) => ({
          id: item.itemId,
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.imageUrl || '/placeholder.svg',
          categoryName: item.categoryName || 'Khác',
          rating: 4.5,
          prepTime: '15 phút'
        }))

        const categorySet = new Set<string>()
        normalized.forEach((item: MenuItem) => categorySet.add(item.categoryName))
        setCategories(Array.from(categorySet))

        setMenuItems(normalized)
      } catch (error) {
        console.error('Lỗi lấy menu:', error)
      }
    }

    const fetchTable = async () => {
      try {
        const res = await fetch(
          `https://localhost:7082/api/Menu/${restaurantId}/tables/${tableNumber}`
        )
        if (!res.ok) setTableValid(false)
      } catch {
        setTableValid(false)
      }
    }

    fetchMenu()
    fetchTable()
  }, [restaurantId, tableNumber])

  if (!tableValid) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-red-600 text-xl font-semibold">
        Bàn không hợp lệ hoặc không tồn tại trong nhà hàng này!
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nhà hàng #{restaurantId}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Bàn {tableNumber}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Mở cửa: 8:00 - 22:00</span>
              </div>
            </div>
          </div>

          {/* Cart Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600 relative">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Giỏ hàng
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Giỏ hàng - Bàn {tableNumber}</DialogTitle>
                <DialogDescription>Xem lại đơn hàng của bạn</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Giỏ hàng trống</p>
                ) : (
                  <>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-500">{formatCurrency(item.price)}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={() => decreaseQuantity(item.id)} className="h-8 w-8 p-0">
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button variant="outline" size="sm" onClick={() => increaseQuantity(item.id)} className="h-8 w-8 p-0">
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="customerName">Tên khách hàng</Label>
                        <Input id="customerName" value={customerInfo.name} onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customerPhone">Số điện thoại</Label>
                        <Input id="customerPhone" value={customerInfo.phone} onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="orderNote">Ghi chú</Label>
                        <Textarea id="orderNote" rows={2} value={customerInfo.note} onChange={(e) => setCustomerInfo({ ...customerInfo, note: e.target.value })} />
                      </div>
                    </div>

                    <div className="pt-4 border-t flex justify-between items-center">
                      <span className="text-lg font-semibold">Tổng tiền: {formatCurrency(calculateTotal())}</span>
                      <Button onClick={() => alert('Chức năng đặt món chưa được triển khai')} disabled={cart.length === 0 || !customerInfo.name || !customerInfo.phone} className="bg-green-600 hover:bg-green-700">
                        Đặt món
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="flex-wrap gap-2">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <MenuList
              items={filterItemsByCategory('all')}
              onAddToCart={addToCart}
              formatCurrency={formatCurrency}
            />
          </TabsContent>
          {categories.map((cat) => (
            <TabsContent key={cat} value={cat}>
              <MenuList
                items={filterItemsByCategory(cat)}
                onAddToCart={addToCart}
                formatCurrency={formatCurrency}
              />
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  )
}

// Component con để hiển thị danh sách món ăn
function MenuList({
  items,
  onAddToCart,
  formatCurrency
}: {
  items: MenuItem[]
  onAddToCart: (item: MenuItem) => void
  formatCurrency: (amount: number) => string
}) {
  if (items.length === 0)
    return (
      <p className="text-center text-gray-500 py-12">
        Không có món trong danh mục này.
      </p>
    )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <Card key={item.id} className="shadow hover:shadow-lg transition-shadow">
          <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-t-md" />
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <span className="font-semibold text-orange-600">
              {formatCurrency(item.price)}
            </span>
            <Button size="sm" onClick={() => onAddToCart(item)}>
              Thêm
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
