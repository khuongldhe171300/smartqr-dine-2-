"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Star,
  Clock,
  Users,
  ChefHat,
  Flame,
  Leaf,
  Plus,
  Minus,
  ShoppingCart,
  Heart,
  Share2,
  MapPin,
} from "lucide-react"

// Định nghĩa kiểu dữ liệu cho món ăn chi tiết
type DetailedMenuItem = {
  id: number
  name: string
  description: string
  price: number
  images: string[]
  category: string
  rating: number
  reviewCount: number
  prepTime: string
  servingSize: number
  calories: number
  popular?: boolean
  spicy?: boolean
  vegetarian?: boolean
  ingredients: string[]
  allergens: string[]
  nutritionFacts: {
    calories: number
    protein: string
    carbs: string
    fat: string
    fiber: string
    sodium: string
  }
  reviews: {
    id: number
    customerName: string
    rating: number
    comment: string
    date: string
    avatar?: string
  }[]
  customizations: {
    id: string
    name: string
    options: { id: string; name: string; price: number }[]
    required: boolean
    maxSelections?: number
  }[]
}

// Định nghĩa kiểu dữ liệu cho món ăn liên quan
type RelatedItem = {
  id: number
  name: string
  price: number
  image: string
  rating: number
}

export default function ItemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const tableId = params.tableId as string
  const itemId = Number.parseInt(params.itemId as string)

  const [quantity, setQuantity] = useState(1)
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, string[]>>({})
  const [specialNote, setSpecialNote] = useState("")
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  // Dữ liệu món ăn chi tiết (trong thực tế sẽ fetch từ API)
  const itemDetail: DetailedMenuItem = {
    id: itemId,
    name: "Pizza Hải Sản Đặc Biệt",
    description:
      "Pizza với tôm, mực, cua, phô mai Mozzarella và sốt cà chua đặc biệt. Được làm từ bột pizza tươi mỗi ngày với nguyên liệu hải sản tươi sống nhập khẩu.",
    price: 189000,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    category: "pizza",
    rating: 4.8,
    reviewCount: 127,
    prepTime: "15-20 phút",
    servingSize: 2,
    calories: 320,
    popular: true,
    spicy: false,
    vegetarian: false,
    ingredients: [
      "Bột pizza tươi",
      "Sốt cà chua đặc biệt",
      "Phô mai Mozzarella",
      "Tôm tươi",
      "Mực tươi",
      "Thịt cua",
      "Ớt chuông",
      "Hành tây",
      "Rau thơm",
    ],
    allergens: ["Gluten", "Hải sản", "Sữa"],
    nutritionFacts: {
      calories: 320,
      protein: "18g",
      carbs: "35g",
      fat: "12g",
      fiber: "3g",
      sodium: "680mg",
    },
    reviews: [
      {
        id: 1,
        customerName: "Nguyễn Văn A",
        rating: 5,
        comment: "Pizza rất ngon, hải sản tươi và đế bánh giòn tan. Sẽ quay lại lần sau!",
        date: "2024-01-15",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 2,
        customerName: "Trần Thị B",
        rating: 4,
        comment: "Món ăn ngon, phục vụ nhanh. Chỉ có điều hơi mặn một chút.",
        date: "2024-01-10",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 3,
        customerName: "Lê Văn C",
        rating: 5,
        comment: "Tuyệt vời! Đây là pizza hải sản ngon nhất tôi từng ăn.",
        date: "2024-01-08",
      },
    ],
    customizations: [
      {
        id: "size",
        name: "Kích thước",
        options: [
          { id: "small", name: "Nhỏ (20cm)", price: 0 },
          { id: "medium", name: "Vừa (25cm)", price: 30000 },
          { id: "large", name: "Lớn (30cm)", price: 60000 },
        ],
        required: true,
        maxSelections: 1,
      },
      {
        id: "crust",
        name: "Loại đế",
        options: [
          { id: "thin", name: "Đế mỏng", price: 0 },
          { id: "thick", name: "Đế dày", price: 15000 },
          { id: "cheese", name: "Đế phô mai", price: 25000 },
        ],
        required: true,
        maxSelections: 1,
      },
      {
        id: "toppings",
        name: "Topping thêm",
        options: [
          { id: "cheese", name: "Phô mai thêm", price: 20000 },
          { id: "mushroom", name: "Nấm", price: 15000 },
          { id: "pineapple", name: "Thơm", price: 10000 },
          { id: "olives", name: "Ô liu", price: 12000 },
        ],
        required: false,
        maxSelections: 3,
      },
    ],
  }

  // Món ăn liên quan
  const relatedItems: RelatedItem[] = [
    {
      id: 2,
      name: "Pizza Pepperoni",
      price: 159000,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
    },
    {
      id: 9,
      name: "Pizza Margherita",
      price: 139000,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
    },
    {
      id: 10,
      name: "Pizza Thập Cẩm",
      price: 179000,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
    },
  ]

  // Format số tiền thành VND
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
  }

  // Tính giá cuối cùng với customizations
  const calculateFinalPrice = () => {
    let totalPrice = itemDetail.price * quantity

    Object.entries(selectedCustomizations).forEach(([customizationId, optionIds]) => {
      const customization = itemDetail.customizations.find((c) => c.id === customizationId)
      if (customization) {
        optionIds.forEach((optionId) => {
          const option = customization.options.find((o) => o.id === optionId)
          if (option) {
            totalPrice += option.price * quantity
          }
        })
      }
    })

    return totalPrice
  }

  // Xử lý chọn customization
  const handleCustomizationChange = (customizationId: string, optionId: string) => {
    const customization = itemDetail.customizations.find((c) => c.id === customizationId)
    if (!customization) return

    setSelectedCustomizations((prev) => {
      const current = prev[customizationId] || []

      if (customization.maxSelections === 1) {
        return { ...prev, [customizationId]: [optionId] }
      } else {
        if (current.includes(optionId)) {
          return { ...prev, [customizationId]: current.filter((id) => id !== optionId) }
        } else {
          const maxSelections = customization.maxSelections || current.length + 1
          if (current.length < maxSelections) {
            return { ...prev, [customizationId]: [...current, optionId] }
          }
          return prev
        }
      }
    })
  }

  // Thêm vào giỏ hàng
  const addToCart = () => {
    // Logic thêm vào giỏ hàng với customizations
    console.log("Added to cart:", {
      item: itemDetail,
      quantity,
      customizations: selectedCustomizations,
      specialNote,
      finalPrice: calculateFinalPrice(),
    })

    // Quay lại trang order
    router.back()
  }

  // Render sao đánh giá
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Chi tiết món ăn</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>Bàn {tableId}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={itemDetail.images[activeImageIndex] || "/placeholder.svg"}
                alt={itemDetail.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4 flex space-x-2">
                {itemDetail.popular && <Badge className="bg-red-500">Phổ biến</Badge>}
                {itemDetail.spicy && <Badge className="bg-orange-500">🌶️ Cay</Badge>}
                {itemDetail.vegetarian && <Badge className="bg-green-500">🌱 Chay</Badge>}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {itemDetail.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                    activeImageIndex === index ? "border-orange-500" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${itemDetail.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Item Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{itemDetail.name}</h1>
              <p className="text-gray-600 mb-4">{itemDetail.description}</p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(itemDetail.rating)}
                  <span className="text-sm font-medium">{itemDetail.rating}</span>
                  <span className="text-sm text-gray-500">({itemDetail.reviewCount} đánh giá)</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{itemDetail.prepTime}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{itemDetail.servingSize} người</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Flame className="h-4 w-4" />
                  <span>{itemDetail.calories} cal</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-orange-600 mb-6">{formatCurrency(calculateFinalPrice())}</div>
            </div>

            {/* Customizations */}
            <div className="space-y-4">
              {itemDetail.customizations.map((customization) => (
                <div key={customization.id} className="space-y-2">
                  <Label className="text-base font-medium">
                    {customization.name}
                    {customization.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <div className="space-y-2">
                    {customization.options.map((option) => (
                      <div
                        key={option.id}
                        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedCustomizations[customization.id]?.includes(option.id)
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleCustomizationChange(customization.id, option.id)}
                      >
                        <span className="font-medium">{option.name}</span>
                        <span className="text-orange-600">
                          {option.price > 0 ? `+${formatCurrency(option.price)}` : "Miễn phí"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Special Note */}
            <div className="space-y-2">
              <Label htmlFor="specialNote">Ghi chú đặc biệt</Label>
              <Textarea
                id="specialNote"
                placeholder="Yêu cầu đặc biệt (không cay, ít đường...)"
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                rows={3}
              />
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label>Số lượng:</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button onClick={addToCart} className="flex-1 bg-orange-500 hover:bg-orange-600 h-12">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Thêm vào giỏ - {formatCurrency(calculateFinalPrice())}
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="ingredients" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ingredients">Thành phần</TabsTrigger>
              <TabsTrigger value="nutrition">Dinh dưỡng</TabsTrigger>
              <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
            </TabsList>

            <TabsContent value="ingredients" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ChefHat className="mr-2 h-5 w-5" />
                    Thành phần
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Nguyên liệu chính:</h4>
                    <div className="flex flex-wrap gap-2">
                      {itemDetail.ingredients.map((ingredient, index) => (
                        <Badge key={index} variant="secondary">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2 text-red-600">Chất gây dị ứng:</h4>
                    <div className="flex flex-wrap gap-2">
                      {itemDetail.allergens.map((allergen, index) => (
                        <Badge key={index} variant="destructive">
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nutrition" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Leaf className="mr-2 h-5 w-5" />
                    Thông tin dinh dưỡng (1 phần)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{itemDetail.nutritionFacts.calories}</div>
                      <div className="text-sm text-gray-600">Calories</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{itemDetail.nutritionFacts.protein}</div>
                      <div className="text-sm text-gray-600">Protein</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{itemDetail.nutritionFacts.carbs}</div>
                      <div className="text-sm text-gray-600">Carbs</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{itemDetail.nutritionFacts.fat}</div>
                      <div className="text-sm text-gray-600">Fat</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{itemDetail.nutritionFacts.fiber}</div>
                      <div className="text-sm text-gray-600">Fiber</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{itemDetail.nutritionFacts.sodium}</div>
                      <div className="text-sm text-gray-600">Sodium</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Đánh giá từ khách hàng</CardTitle>
                  <CardDescription>
                    {itemDetail.reviewCount} đánh giá • Điểm trung bình {itemDetail.rating}/5
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {itemDetail.reviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <Avatar>
                          <AvatarImage src={review.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium">{review.customerName}</span>
                            <div className="flex items-center">{renderStars(review.rating)}</div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Items */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Món ăn liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedItems.map((item) => (
              <Link key={item.id} href={`/order/${tableId}/item/${item.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-48 w-full object-cover" />
                  <CardHeader>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-orange-600">{formatCurrency(item.price)}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{item.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
