"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Minus, Plus, ShoppingCart, Clock, MapPin } from "lucide-react"
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation"

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
    name: "",
    phone: "",
    note: "",
  })

  const headerAnimation = useScrollAnimation()
  const menuAnimation = useStaggeredAnimation(12, 100)

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)

  const calculateTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const exists = prev.find((x) => x.id === item.id)
      if (exists) {
        return prev.map((x) => (x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x))
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }]
    })
  }

  const increaseQuantity = (id: number) => {
    setCart((prev) => prev.map((x) => (x.id === id ? { ...x, quantity: x.quantity + 1 } : x)))
  }

  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((x) => (x.id === id ? { ...x, quantity: x.quantity - 1 } : x)).filter((x) => x.quantity > 0),
    )
  }

  const filterItemsByCategory = (category: string) => {
    if (category === "all") return menuItems
    return menuItems.filter((item) => item.categoryName === category)
  }

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Menu/${restaurantId}/menu`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        })

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

        const data = await res.json()
        const normalized = data.map((item: any) => ({
          id: item.itemId,
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.imageUrl || "/placeholder.svg",
          categoryName: item.categoryName || "Khác",
          rating: 4.5,
          prepTime: "15 phút",
        }))

        const categorySet = new Set<string>()
        normalized.forEach((item: MenuItem) => categorySet.add(item.categoryName))
        setCategories(Array.from(categorySet))

        setMenuItems(normalized)
      } catch (error) {
        console.error("Lỗi lấy menu:", error)
      }
    }

    const fetchTable = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Menu/${restaurantId}/tables/${tableNumber}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          },
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
      <div className="min-h-screen flex items-center justify-center text-center text-red-600 text-xl font-semibold animate-fade-in-scale">
        Bàn không hợp lệ hoặc không tồn tại trong nhà hàng này!
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div
            ref={headerAnimation.ref}
            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-1000 ${
              headerAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
          >
            <div className="animate-fade-in-left">
              <h1 className="text-2xl font-bold text-gray-900 gradient-text">Nhà hàng #{restaurantId}</h1>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 mt-1">
                <div className="flex items-center animate-fade-in-up stagger-1">
                  <MapPin className="h-4 w-4 mr-1 hover-rotate" />
                  <span>Bàn {tableNumber}</span>
                </div>
                <div className="flex items-center animate-fade-in-up stagger-2">
                  <Clock className="h-4 w-4 mr-1 hover-rotate" />
                  <span>Mở cửa: 8:00 - 22:00</span>
                </div>
              </div>
            </div>

            {/* Cart Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600 relative w-full sm:w-auto hover-lift hover-glow animate-fade-in-right">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Giỏ hàng
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs animate-bounce-slow">
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="animate-fade-in-up">Giỏ hàng - Bàn {tableNumber}</DialogTitle>
                  <DialogDescription className="animate-fade-in-up stagger-1">
                    Xem lại đơn hàng của bạn
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-gray-500 py-8 animate-fade-in-scale">Giỏ hàng trống</p>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {cart.map((item, index) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-500">{formatCurrency(item.price)}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => decreaseQuantity(item.id)}
                                className="h-8 w-8 p-0 hover-scale"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => increaseQuantity(item.id)}
                                className="h-8 w-8 p-0 hover-scale"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-4 space-y-3">
                        <div className="space-y-2 animate-fade-in-up stagger-1">
                          <Label htmlFor="customerName">Tên khách hàng</Label>
                          <Input
                            id="customerName"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                            className="hover:border-orange-300 transition-colors"
                          />
                        </div>
                        <div className="space-y-2 animate-fade-in-up stagger-2">
                          <Label htmlFor="customerPhone">Số điện thoại</Label>
                          <Input
                            id="customerPhone"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                            className="hover:border-orange-300 transition-colors"
                          />
                        </div>
                        <div className="space-y-2 animate-fade-in-up stagger-3">
                          <Label htmlFor="orderNote">Ghi chú</Label>
                          <Textarea
                            id="orderNote"
                            rows={2}
                            value={customerInfo.note}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, note: e.target.value })}
                            className="hover:border-orange-300 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in-up stagger-4">
                        <span className="text-lg font-semibold gradient-text">
                          Tổng tiền: {formatCurrency(calculateTotal())}
                        </span>
                        <Button
                          onClick={() => alert("Chức năng đặt món chưa được triển khai")}
                          disabled={cart.length === 0 || !customerInfo.name || !customerInfo.phone}
                          className="bg-green-600 hover:bg-green-700 w-full sm:w-auto hover-lift hover-glow"
                        >
                          Đặt món
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="flex flex-wrap gap-2 h-auto p-1 animate-fade-in-up">
            <TabsTrigger value="all" className="mb-2 hover-scale">
              Tất cả
            </TabsTrigger>
            {categories.map((cat, index) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="mb-2 hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <MenuList
              items={filterItemsByCategory("all")}
              onAddToCart={addToCart}
              formatCurrency={formatCurrency}
              animationRef={menuAnimation.ref}
              visibleItems={menuAnimation.visibleItems}
            />
          </TabsContent>
          {categories.map((cat) => (
            <TabsContent key={cat} value={cat}>
              <MenuList
                items={filterItemsByCategory(cat)}
                onAddToCart={addToCart}
                formatCurrency={formatCurrency}
                animationRef={menuAnimation.ref}
                visibleItems={menuAnimation.visibleItems}
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
  formatCurrency,
  animationRef,
  visibleItems,
}: {
  items: MenuItem[]
  onAddToCart: (item: MenuItem) => void
  formatCurrency: (amount: number) => string
  animationRef: React.RefObject<HTMLDivElement | null>
  visibleItems: number[]
}) {
  if (items.length === 0)
    return <p className="text-center text-gray-500 py-12 animate-fade-in-scale">Không có món trong danh mục này.</p>

  return (
    <div ref={animationRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <Card
          key={item.id}
          className={`shadow hover:shadow-lg transition-all duration-500 flex flex-col hover-lift hover-glow ${
            visibleItems.includes(index) ? "animate-fade-in-scale" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative w-full h-40 overflow-hidden rounded-t-md">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <CardHeader className="flex-1">
            <CardTitle className="text-lg leading-tight hover:text-orange-600 transition-colors">{item.name}</CardTitle>
            <CardDescription className="line-clamp-2">{item.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center pt-0">
            <span className="font-semibold text-orange-600 gradient-text">{formatCurrency(item.price)}</span>
            <Button size="sm" onClick={() => onAddToCart(item)} className="hover-lift hover-glow">
              Thêm
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
