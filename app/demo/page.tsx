"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Định nghĩa kiểu dữ liệu cho món ăn
type MenuItem = {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
}

// Định nghĩa kiểu dữ liệu cho món ăn trong giỏ hàng
type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  note?: string
}

export default function DemoPage() {
  // Danh sách các món ăn mẫu
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Pizza Hải Sản",
      description: "Pizza với hải sản tươi ngon, phô mai Mozzarella",
      price: 169000,
      image: "/placeholder.svg?height=200&width=200",
      category: "pizza",
    },
    {
      id: 2,
      name: "Pizza Bò",
      description: "Pizza với thịt bò xay, hành tây, ớt chuông",
      price: 159000,
      image: "/placeholder.svg?height=200&width=200",
      category: "pizza",
    },
    {
      id: 3,
      name: "Burger Gà",
      description: "Burger với thịt gà rán, rau xà lách, cà chua",
      price: 135000,
      image: "/placeholder.svg?height=200&width=200",
      category: "burger",
    },
    {
      id: 4,
      name: "Burger Bò",
      description: "Burger với thịt bò Úc, phô mai Cheddar, hành tây",
      price: 145000,
      image: "/placeholder.svg?height=200&width=200",
      category: "burger",
    },
    {
      id: 5,
      name: "Cà phê đen",
      description: "Cà phê đen đậm đà, hương vị truyền thống",
      price: 35000,
      image: "/placeholder.svg?height=200&width=200",
      category: "drink",
    },
    {
      id: 6,
      name: "Cà phê sữa",
      description: "Cà phê sữa ngọt ngào, béo ngậy",
      price: 39000,
      image: "/placeholder.svg?height=200&width=200",
      category: "drink",
    },
  ]

  // State cho giỏ hàng
  const [cart, setCart] = useState<CartItem[]>([])
  const [tableNumber, setTableNumber] = useState<string>("12")

  // Thêm món vào giỏ hàng
  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { id: item.id, name: item.name, price: item.price, quantity: 1 }]
      }
    })
  }

  // Giảm số lượng món trong giỏ hàng
  const decreaseQuantity = (id: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
      } else {
        return prevCart.filter((item) => item.id !== id)
      }
    })
  }

  // Tăng số lượng món trong giỏ hàng
  const increaseQuantity = (id: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    })
  }

  // Tính tổng tiền giỏ hàng
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Format số tiền thành VND
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex-1 container px-4 py-8 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Demo SmartQR Dine</h1>
          <p className="text-gray-500 mt-2">Trải nghiệm gọi món qua QR code như khách hàng của bạn</p>
          <div className="mt-4 flex items-center">
            <Label htmlFor="table" className="mr-2">
              Bàn số:
            </Label>
            <Input id="table" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} className="w-20" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Menu Section */}
          <div className="md:col-span-2">
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="pizza">Pizza</TabsTrigger>
                <TabsTrigger value="burger">Burger</TabsTrigger>
                <TabsTrigger value="drink">Đồ uống</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {menuItems.map((item) => (
                    <div key={item.id} className="rounded-lg border bg-card p-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-32 w-full rounded-md object-cover"
                      />
                      <div className="mt-3">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-lg font-bold text-orange-600">{formatCurrency(item.price)}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
                          >
                            Thêm
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="pizza" className="mt-0">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {menuItems
                    .filter((item) => item.category === "pizza")
                    .map((item) => (
                      <div key={item.id} className="rounded-lg border bg-card p-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-32 w-full rounded-md object-cover"
                        />
                        <div className="mt-3">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-lg font-bold text-orange-600">{formatCurrency(item.price)}</span>
                            <button
                              onClick={() => addToCart(item)}
                              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
                            >
                              Thêm
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="burger" className="mt-0">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {menuItems
                    .filter((item) => item.category === "burger")
                    .map((item) => (
                      <div key={item.id} className="rounded-lg border bg-card p-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-32 w-full rounded-md object-cover"
                        />
                        <div className="mt-3">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-lg font-bold text-orange-600">{formatCurrency(item.price)}</span>
                            <button
                              onClick={() => addToCart(item)}
                              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
                            >
                              Thêm
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="drink" className="mt-0">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {menuItems
                    .filter((item) => item.category === "drink")
                    .map((item) => (
                      <div key={item.id} className="rounded-lg border bg-card p-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-32 w-full rounded-md object-cover"
                        />
                        <div className="mt-3">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-lg font-bold text-orange-600">{formatCurrency(item.price)}</span>
                            <button
                              onClick={() => addToCart(item)}
                              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
                            >
                              Thêm
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Cart Section */}
          <div className="md:col-span-1">
            <div className="sticky top-20 rounded-lg border bg-card p-4">
              <h2 className="text-xl font-bold mb-4">Đơn hàng - Bàn {tableNumber}</h2>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Chưa có món nào được chọn</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">{formatCurrency(item.price)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold">Tổng cộng:</span>
                      <span className="text-lg font-bold text-orange-600">{formatCurrency(calculateTotal())}</span>
                    </div>
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium">
                      Đặt món
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
