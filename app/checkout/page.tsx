"use client"

import type React from "react"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, CheckCircle, Clock, ArrowLeft, Wallet, Construction, AlertCircle } from "lucide-react"
import Link from "next/link"
import { fetchSubscriptionPlanById } from "@/lib/subscriptionPlansApi"
import { toast } from "@/components/ui/use-toast"
import { useMomo } from "@/hooks/use-momo"
import { useVnPay } from "@/hooks/use-vnpay"

const mockOrder = {
  orderId: 1,
  items: [
    { id: 1, name: "Phở Bò Tái", price: 65000, quantity: 2, image: "/placeholder.svg?height=60&width=60" },
    { id: 2, name: "Gỏi Cuốn Tôm", price: 45000, quantity: 1, image: "/placeholder.svg?height=60&width=60" },
    { id: 3, name: "Cà Phê Sữa Đá", price: 25000, quantity: 2, image: "/placeholder.svg?height=60&width=60" },
  ],
  subtotal: 200000,
  tax: 20000,
  total: 220000,
  tableNumber: "B05",
  restaurantName: "Nhà Hàng Sài Gòn",
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("planId")
  const orderType = searchParams.get("type")
  const [paymentMethod, setPaymentMethod] = useState("bank") // Đặt bank làm mặc định
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [planData, setPlanData] = useState<any>(null)
  const [restaurant, setRestaurant] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const isSubscription = orderType === "subscription"
  const isOrder = orderType === "order"

  // MoMo hook
  const { createMomoPayment, isLoading: momoLoading, error: momoError } = useMomo()

  // VnPay hook
  const { createVnPayPayment, isLoading: vnpayLoading, error: vnpayError } = useVnPay()

  useEffect(() => {
    const loadPlan = async () => {
      if (isSubscription && planId) {
        try {
          const data = await fetchSubscriptionPlanById(Number(planId))
          setPlanData(data)
        } catch (err) {
          console.error("Lỗi khi tải gói đăng ký:", err)
          toast({
            title: "Lỗi",
            description: "Không thể tải thông tin gói đăng ký. Vui lòng thử lại sau.",
            variant: "destructive",
          })
        }
      }
    }
    loadPlan()
  }, [planId, isSubscription])

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          console.error("Không tìm thấy token")
          return
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Restaurant/owner`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
          },
        })
        if (res.ok) {
          const data = await res.json()
          setRestaurant(data)
        } else {
          throw new Error("Không thể tải thông tin nhà hàng")
        }
      } catch (err) {
        console.error("Không thể load nhà hàng:", err)
        toast({
          title: "Lỗi",
          description: "Không thể tải thông tin nhà hàng. Vui lòng thử lại sau.",
          variant: "destructive",
        })
      }
    }

    if (isSubscription) {
      fetchRestaurant()
    }
  }, [isSubscription])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreedToTerms) {
      toast({
        title: "Chú ý",
        description: "Vui lòng đồng ý với điều khoản sử dụng để tiếp tục.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Xử lý chuyển hướng cho MoMo
      if (paymentMethod === "momo") {
        // Lấy thông tin người dùng từ form
        const firstNameInput = document.getElementById("firstName") as HTMLInputElement
        const lastNameInput = document.getElementById("lastName") as HTMLInputElement
        const fullName = `${firstNameInput.value} ${lastNameInput.value}`.trim()

        // Tạo orderId unique
        const uniqueOrderId = isSubscription
          ? `SUB_MOMO_${Date.now()}_${planId}`
          : `ORDER_MOMO_${Date.now()}_${mockOrder.orderId}`

        // Tạo orderInfo
        const orderInfo = isSubscription
          ? `Thanh toan goi ${planData?.planName || "dich vu"}`
          : `Thanh toan don hang ban ${mockOrder.tableNumber}`

        // Số tiền
        const amount = isSubscription ? planData?.price || 0 : mockOrder.total

        console.log("Creating MoMo payment with:", { fullName, uniqueOrderId, orderInfo, amount })

        // Gọi API tạo payment URL
        const paymentUrl = await createMomoPayment(fullName, uniqueOrderId, orderInfo, amount)

        if (paymentUrl) {
          console.log("Redirecting to MoMo payment URL:", paymentUrl)
          window.location.href = paymentUrl
          return
        } else {
          throw new Error(momoError || "Không thể tạo URL thanh toán MoMo")
        }
      }

      // Xử lý cho VnPay
      if (paymentMethod === "vnpay") {
        // Lấy thông tin người dùng từ form
        const firstNameInput = document.getElementById("firstName") as HTMLInputElement
        const lastNameInput = document.getElementById("lastName") as HTMLInputElement
        const fullName = `${firstNameInput.value} ${lastNameInput.value}`.trim()

        // Tạo orderDescription và name
        const orderDescription = isSubscription
          ? `Thanh toan goi ${planData?.planName || "dich vu"}`
          : `Thanh toan don hang ban ${mockOrder.tableNumber}`

        const name = isSubscription
          ? `Goi dich vu ${planData?.planName || ""}`
          : `Don hang ban ${mockOrder.tableNumber}`

        // Số tiền
        const amount = isSubscription ? planData?.price || 0 : mockOrder.total

        // Loại đơn hàng
        const orderType = isSubscription ? "subscription" : "order"

        console.log("Creating VnPay payment with:", { orderType, amount, orderDescription, name })

        // Gọi API tạo payment URL
        const paymentUrl = await createVnPayPayment(orderType, amount, orderDescription, name)

        if (paymentUrl) {
          console.log("Redirecting to VnPay payment URL:", paymentUrl)
          window.location.href = paymentUrl
          return
        } else {
          throw new Error(vnpayError || "Không thể tạo URL thanh toán VnPay")
        }
      }

      // Xử lý cho VnPay
      if (paymentMethod === "vnpay") {
        toast({
          title: "Thông báo",
          description: "Tính năng thanh toán VnPay đang được phát triển. Vui lòng sử dụng chuyển khoản ngân hàng!",
          variant: "default",
        })
        setIsProcessing(false)
        return
      }

      // Xử lý cho chuyển khoản ngân hàng
      if (paymentMethod === "bank") {
        toast({
          title: "Thông báo",
          description: "Vui lòng chuyển khoản theo thông tin bên dưới và liên hệ hotline để xác nhận thanh toán.",
          variant: "default",
        })

        // Có thể redirect đến trang hướng dẫn thanh toán
        setTimeout(() => {
          if (isSubscription) {
            window.location.href = "/subscription-success"
          } else {
            window.location.href = "/restaurant/dashboard"
          }
        }, 2000)
      }
    } catch (error) {
      console.error("Lỗi xử lý thanh toán:", error)
      toast({
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Có lỗi xảy ra khi xử lý thanh toán",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)

  const isProcessingPayment = isProcessing || momoLoading || vnpayLoading

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 bg-gray-50 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <Link
                href={isSubscription ? "/pricing" : `/order/${mockOrder.tableNumber}`}
                className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại
              </Link>
              <h1 className="text-3xl font-bold">
                {isSubscription ? "Thanh toán đăng ký dịch vụ" : "Thanh toán đơn hàng"}
              </h1>
              <p className="text-gray-600 mt-2">
                {isSubscription
                  ? "Hoàn tất đăng ký để bắt đầu sử dụng SmartQR Dine"
                  : `Thanh toán cho đơn hàng tại bàn ${mockOrder.tableNumber}`}
              </p>
            </div>

            {/* Coming Soon Notice */}
            <div className="mb-8">
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Construction className="h-8 w-8 text-yellow-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-800">Tính năng đang phát triển</h3>
                      <p className="text-yellow-700">Chức năng thanh toán trực tuyến đang được hoàn thiện</p>
                    </div>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium mb-1">Thông báo quan trọng:</p>
                        <ul className="space-y-1">
                          <li>• Tính năng thanh toán VnPay đang được tích hợp</li>
                          <li>• Tính năng thanh toán MoMo đã sẵn sàng sử dụng</li>
                          <li>• Hiện tại hỗ trợ chuyển khoản ngân hàng và MoMo</li>
                          <li>• Dự kiến hoàn thành tất cả trong tuần tới</li>
                          <li>• Cảm ơn bạn đã kiên nhẫn chờ đợi!</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>{isSubscription ? "Thông tin gói dịch vụ" : "Chi tiết đơn hàng"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isSubscription && planData ? (
                      <>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">{planData.planName}</span>
                            <Badge variant="secondary">Phổ biến</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{planData.description}</p>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <h4 className="font-medium">Tính năng bao gồm:</h4>
                          <ul className="space-y-1">
                            {JSON.parse(planData.features || "[]").map((f: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Gói {planData.planName}</span>
                            <span>{formatPrice(planData.price)}</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Dùng thử miễn phí 14 ngày</span>
                            <span>-{formatPrice(0)}</span>
                          </div>

                          <Separator />
                          <div className="flex justify-between font-semibold text-lg">
                            <span>Tổng thanh toán hôm nay</span>
                            <span className="text-green-600">{formatPrice((planData.price))}</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Sau 14 ngày dùng thử, bạn sẽ bị tính {formatPrice(planData.price)}/tháng.
                          </p>
                        </div>
                      </>
                    ) : isSubscription ? (
                      <div className="text-center py-4">
                        <p className="text-gray-500">Đang tải thông tin gói dịch vụ...</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{mockOrder.restaurantName}</span>
                            <Badge variant="outline">Bàn {mockOrder.tableNumber}</Badge>
                          </div>

                          {mockOrder.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-12 h-12 rounded-md object-cover"
                              />
                              <div className="flex-1">
                                <div className="font-medium text-sm">{item.name}</div>
                                <div className="text-xs text-gray-500">SL: {item.quantity}</div>
                              </div>
                              <div className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</div>
                            </div>
                          ))}
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Tạm tính</span>
                            <span>{formatPrice(mockOrder.subtotal)}</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>VAT (10%)</span>
                            <span>{formatPrice(mockOrder.tax)}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-semibold text-lg">
                            <span>Tổng cộng</span>
                            <span className="text-orange-600">{formatPrice(mockOrder.total)}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Security Badge */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-green-700">
                    <Shield className="h-5 w-5" />
                    <span className="font-medium">Thanh toán bảo mật</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">Thông tin của bạn được mã hóa SSL 256-bit</p>
                </div>
              </div>

              {/* Payment Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin thanh toán</CardTitle>
                    <CardDescription>Vui lòng điền đầy đủ thông tin để hoàn tất thanh toán</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Contact Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Thông tin liên hệ</h3>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">Họ</Label>
                            <Input
                              id="firstName"
                              placeholder="Nguyễn"
                              required
                              defaultValue={restaurant?.ownerUser?.firstName || ""}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Tên</Label>
                            <Input
                              id="lastName"
                              placeholder="Văn A"
                              required
                              defaultValue={restaurant?.ownerUser?.lastName || ""}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="example@email.com"
                            required
                            defaultValue={restaurant?.email || restaurant?.ownerUser?.email || ""}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Số điện thoại</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="0901234567"
                            required
                            defaultValue={restaurant?.phoneNumber || ""}
                          />
                        </div>

                        {isSubscription && (
                          <div className="space-y-2">
                            <Label htmlFor="restaurant">Tên nhà hàng</Label>
                            <Input
                              id="restaurant"
                              placeholder="Nhà hàng ABC"
                              required
                              defaultValue={restaurant?.name || ""}
                            />
                          </div>
                        )}
                      </div>

                      <Separator />

                      {/* Payment Method */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Phương thức thanh toán</h3>
                        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg">
                            <RadioGroupItem value="vnpay" id="vnpay" />
                            <Label htmlFor="vnpay" className="flex items-center gap-2 cursor-pointer">
                              <Wallet className="h-5 w-5 text-blue-500" />
                              VnPay
                              <Badge variant="secondary" className="text-xs">
                                Khả dụng
                              </Badge>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg">
                            <RadioGroupItem value="bank" id="bank" />
                            <Label htmlFor="bank" className="cursor-pointer">
                              Chuyển khoản ngân hàng
                              <Badge variant="secondary" className="ml-2 text-xs">
                                Khả dụng
                              </Badge>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg">
                            <RadioGroupItem value="momo" id="momo" />
                            <Label htmlFor="momo" className="cursor-pointer">
                              Ví MoMo
                              <Badge variant="secondary" className="ml-2 text-xs">
                                Khả dụng
                              </Badge>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Bank Transfer Details */}
                      {paymentMethod === "bank" && (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900 mb-2">Thông tin chuyển khoản</h4>
                          <div className="space-y-1 text-sm text-blue-800">
                            <p>
                              <strong>Ngân hàng:</strong> BIDV Bank
                            </p>
                            <p>
                              <strong>Số tài khoản:</strong> 4271039788
                            </p>
                            <p>
                              <strong>Chủ tài khoản:</strong> LE DUY KHUONG
                            </p>
                            <p>
                              <strong>Nội dung:</strong>{" "}
                              {isSubscription
                                ? `DK ${restaurant?.phoneNumber?.toUpperCase()} ${restaurant?.name}`
                                : `DH ${mockOrder.tableNumber} ${restaurant?.name}`}
                            </p>
                          </div>
                          <div className="mt-3 p-3 bg-blue-100 rounded border border-blue-300">
                            <p className="text-xs text-blue-800">
                              <strong>Lưu ý:</strong> Sau khi chuyển khoản, vui lòng liên hệ hotline để xác nhận thanh
                              toán.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* MoMo Details */}
                      {paymentMethod === "momo" && (
                        <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                          <h4 className="font-medium text-pink-900 mb-2">Thanh toán qua MoMo</h4>
                          <p className="text-sm text-pink-800 mb-3">
                            Bạn sẽ được chuyển hướng đến ứng dụng MoMo để hoàn tất thanh toán.
                          </p>
                          <div className="bg-pink-100 p-3 rounded border border-pink-300">
                            <p className="text-xs text-pink-800">
                              <strong>Lưu ý:</strong> Đảm bảo bạn đã cài đặt ứng dụng MoMo trên điện thoại và đã đăng
                              nhập.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* VnPay Details */}
                      {paymentMethod === "vnpay" && (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900 mb-2">Thanh toán qua VnPay</h4>
                          <p className="text-sm text-blue-800 mb-3">
                            Bạn sẽ được chuyển hướng đến cổng thanh toán VnPay để hoàn tất giao dịch.
                          </p>
                          <div className="bg-blue-100 p-3 rounded border border-blue-300">
                            <p className="text-xs text-blue-800">
                              <strong>Lưu ý:</strong> VnPay hỗ trợ thanh toán qua thẻ ATM, Internet Banking, và ví điện
                              tử.
                            </p>
                          </div>
                        </div>
                      )}

                      <Separator />

                      {/* Terms and Conditions */}
                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="terms"
                            checked={agreedToTerms}
                            onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                          />
                          <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                            Tôi đồng ý với{" "}
                            <Link href="/terms" className="text-orange-600 hover:underline">
                              Điều khoản sử dụng
                            </Link>{" "}
                            và{" "}
                            <Link href="/privacy" className="text-orange-600 hover:underline">
                              Chính sách bảo mật
                            </Link>{" "}
                            của SmartQR Dine
                          </Label>
                        </div>

                        {isSubscription && (
                          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <div className="flex items-start gap-2">
                              <Clock className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <div className="text-sm text-yellow-800">
                                <p className="font-medium mb-1">Thông tin về thời gian dùng thử</p>
                                <p>
                                  Bạn sẽ được dùng thử miễn phí 14 ngày. Sau đó, tài khoản sẽ tự động gia hạn với mức
                                  phí {formatPrice(planData?.price || 0)}/tháng. Bạn có thể hủy bất kỳ lúc nào trong
                                  phần cài đặt tài khoản.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Error Display */}
                      {(momoError || vnpayError) && (
                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-sm text-red-800">
                            <strong>Lỗi:</strong> {momoError || vnpayError}
                          </p>
                        </div>
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
                        disabled={!agreedToTerms || isProcessingPayment}
                      >
                        {isProcessingPayment ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Đang xử lý...
                          </div>
                        ) : paymentMethod === "bank" ? (
                          isSubscription ? (
                            "Xác nhận đăng ký"
                          ) : (
                            `Xác nhận thanh toán ${formatPrice(mockOrder.total)}`
                          )
                        ) : paymentMethod === "momo" ? (
                          `Thanh toán với MoMo`
                        ) : paymentMethod === "vnpay" ? (
                          "Thanh toán với VnPay"
                        ) : (
                          "Xác nhận thanh toán"
                        )}
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        {paymentMethod === "bank"
                          ? "Hiện tại hỗ trợ chuyển khoản ngân hàng, MoMo và VnPay."
                          : paymentMethod === "momo"
                            ? "Thanh toán qua MoMo an toàn và nhanh chóng."
                            : paymentMethod === "vnpay"
                              ? "Thanh toán qua VnPay an toàn với nhiều phương thức."
                              : "Chọn phương thức thanh toán phù hợp với bạn."}
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
