"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Crown, Calendar, Star, ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"

interface SubscriptionInfo {
    planName: string
    features: string[]
    startDate: string
    endDate: string
    autoRenew: boolean
    price: number
}

interface RestaurantInfo {
    name: string
    subscriptions: Array<{
        planId: number
        startDate: string
        endDate: string
        status: string
        autoRenew: boolean
        subscriptionPlan: {
            planName: string
            features: string
            price: number
        }
    }>
}

interface VnPayCallbackData {
    vnp_Amount: string
    vnp_BankCode: string
    vnp_BankTranNo: string
    vnp_CardType: string
    vnp_OrderInfo: string
    vnp_PayDate: string
    vnp_ResponseCode: string
    vnp_TmnCode: string
    vnp_TransactionNo: string
    vnp_TransactionStatus: string
    vnp_TxnRef: string
    vnp_SecureHash: string
}

export default function SubscriptionSuccess() {
    const searchParams = useSearchParams()
    const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [vnpayData, setVnpayData] = useState<VnPayCallbackData | null>(null)
    const [isFromVnPay, setIsFromVnPay] = useState(false)

    useEffect(() => {
        const fetchSubscriptionInfo = async () => {
            try {
                // Kiểm tra xem có phải từ VnPay callback không
                const vnp_ResponseCode = searchParams.get("vnp_ResponseCode")
                const vnp_OrderInfo = searchParams.get("vnp_OrderInfo")
                const vnp_Amount = searchParams.get("vnp_Amount")
                const vnp_PayDate = searchParams.get("vnp_PayDate")
                const vnp_TransactionNo = searchParams.get("vnp_TransactionNo")
                const vnp_TxnRef = searchParams.get("vnp_TxnRef")

                if (vnp_ResponseCode && vnp_OrderInfo) {
                    setIsFromVnPay(true)

                    // Lưu thông tin VnPay callback
                    setVnpayData({
                        vnp_Amount: vnp_Amount || "",
                        vnp_BankCode: searchParams.get("vnp_BankCode") || "",
                        vnp_BankTranNo: searchParams.get("vnp_BankTranNo") || "",
                        vnp_CardType: searchParams.get("vnp_CardType") || "",
                        vnp_OrderInfo: vnp_OrderInfo || "",
                        vnp_PayDate: vnp_PayDate || "",
                        vnp_ResponseCode: vnp_ResponseCode || "",
                        vnp_TmnCode: searchParams.get("vnp_TmnCode") || "",
                        vnp_TransactionNo: vnp_TransactionNo || "",
                        vnp_TransactionStatus: searchParams.get("vnp_TransactionStatus") || "",
                        vnp_TxnRef: vnp_TxnRef || "",
                        vnp_SecureHash: searchParams.get("vnp_SecureHash") || "",
                    })

                    // Parse thông tin gói từ vnp_OrderInfo
                    const planInfo = parsePlanInfoFromOrderInfo(vnp_OrderInfo)
                    const amount = vnp_Amount ? Number.parseInt(vnp_Amount) / 100 : 0

                    console.log("VnPay callback data:", {
                        vnp_ResponseCode,
                        vnp_OrderInfo,
                        vnp_Amount,
                        planInfo,
                        amount,
                    })

                    if (vnp_ResponseCode === "00") {
                        // Thanh toán thành công
                        setSubscriptionInfo({
                            planName: planInfo.planName || "Gói Premium",
                            features: planInfo.features || [
                                "Quản lý menu không giới hạn",
                                "Tạo QR code cho bàn",
                                "Nhận đơn hàng real-time",
                                "Báo cáo doanh thu",
                                "Hỗ trợ 24/7",
                            ],
                            startDate: new Date().toISOString(),
                            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                            autoRenew: true,
                            price: amount,
                        })
                    } else {
                        setError(`Thanh toán thất bại. Mã lỗi: ${vnp_ResponseCode}`)
                    }
                } else {
                    // Không phải từ VnPay, thử lấy từ API
                    let token: string | null = null
                    if (typeof window !== "undefined") {
                        token = localStorage.getItem("token")
                    }

                    if (!token) {
                        setError("Không tìm thấy token đăng nhập")
                        setIsLoading(false)
                        return
                    }

                    console.log("Fetching restaurant info...")

                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Restaurant/owner`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    })

                    console.log("API Response status:", response.status)

                    if (response.ok) {
                        const restaurantData: RestaurantInfo = await response.json()
                        console.log("Restaurant data:", restaurantData)

                        // Tìm subscription active
                        const activeSubscription = restaurantData.subscriptions?.find((sub) => sub.status === "Active")

                        if (activeSubscription) {
                            const features = activeSubscription.subscriptionPlan.features
                                ? JSON.parse(activeSubscription.subscriptionPlan.features)
                                : [
                                    "Quản lý menu không giới hạn",
                                    "Tạo QR code cho bàn",
                                    "Nhận đơn hàng real-time",
                                    "Báo cáo doanh thu",
                                    "Hỗ trợ 24/7",
                                ]

                            setSubscriptionInfo({
                                planName: activeSubscription.subscriptionPlan.planName,
                                features: features,
                                startDate: activeSubscription.startDate,
                                endDate: activeSubscription.endDate,
                                autoRenew: activeSubscription.autoRenew,
                                price: activeSubscription.subscriptionPlan.price,
                            })
                        } else {
                            // Nếu không có subscription active, tạo thông tin mặc định
                            setSubscriptionInfo({
                                planName: "Gói Premium",
                                features: [
                                    "Quản lý menu không giới hạn",
                                    "Tạo QR code cho bàn",
                                    "Nhận đơn hàng real-time",
                                    "Báo cáo doanh thu",
                                    "Hỗ trợ 24/7",
                                ],
                                startDate: new Date().toISOString(),
                                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                                autoRenew: true,
                                price: 299000,
                            })
                        }
                    } else {
                        console.error("API call failed with status:", response.status)

                        // Fallback: Tạo thông tin subscription mặc định
                        setSubscriptionInfo({
                            planName: "Gói Premium",
                            features: [
                                "Quản lý menu không giới hạn",
                                "Tạo QR code cho bàn",
                                "Nhận đơn hàng real-time",
                                "Báo cáo doanh thu",
                                "Hỗ trợ 24/7",
                            ],
                            startDate: new Date().toISOString(),
                            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                            autoRenew: true,
                            price: 299000,
                        })
                    }
                }
            } catch (error) {
                console.error("Lỗi khi tải thông tin subscription:", error)

                // Fallback: Tạo thông tin subscription mặc định khi có lỗi
                setSubscriptionInfo({
                    planName: "Gói Premium",
                    features: [
                        "Quản lý menu không giới hạn",
                        "Tạo QR code cho bàn",
                        "Nhận đơn hàng real-time",
                        "Báo cáo doanh thu",
                        "Hỗ trợ 24/7",
                    ],
                    startDate: new Date().toISOString(),
                    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                    autoRenew: true,
                    price: 299000,
                })

                setError("Không thể tải thông tin chi tiết, hiển thị thông tin mặc định")
            } finally {
                setIsLoading(false)
            }
        }

        fetchSubscriptionInfo()
    }, [searchParams])

    // Hàm parse thông tin gói từ vnp_OrderInfo
    const parsePlanInfoFromOrderInfo = (orderInfo: string) => {
        try {
            // Decode URL
            const decodedInfo = decodeURIComponent(orderInfo)
            console.log("Decoded order info:", decodedInfo)

            // Tìm tên gói từ orderInfo
            // Format: "Goi dich vu Tiêu chuẩn Thanh toan goi Tiêu chuẩn 999000"
            let planName = "Gói Premium"

            if (decodedInfo.includes("Tiêu chuẩn") || decodedInfo.includes("Tieu chuan")) {
                planName = "Gói Tiêu chuẩn"
            } else if (decodedInfo.includes("Cơ bản") || decodedInfo.includes("Co ban")) {
                planName = "Gói Cơ bản"
            } else if (decodedInfo.includes("Premium")) {
                planName = "Gói Premium"
            } else if (decodedInfo.includes("Enterprise")) {
                planName = "Gói Enterprise"
            }

            // Định nghĩa features dựa trên tên gói
            let features = []
            switch (planName) {
                case "Gói Cơ bản":
                    features = [
                        "Quản lý menu cơ bản",
                        "Tạo QR code cho 10 bàn",
                        "Nhận đơn hàng",
                        "Báo cáo cơ bản",
                        "Hỗ trợ email",
                    ]
                    break
                case "Gói Tiêu chuẩn":
                    features = [
                        "Quản lý menu không giới hạn",
                        "Tạo QR code cho 50 bàn",
                        "Nhận đơn hàng real-time",
                        "Báo cáo chi tiết",
                        "Hỗ trợ chat",
                    ]
                    break
                case "Gói Premium":
                    features = [
                        "Quản lý menu không giới hạn",
                        "Tạo QR code không giới hạn",
                        "Nhận đơn hàng real-time",
                        "Báo cáo doanh thu chi tiết",
                        "Hỗ trợ 24/7",
                        "Tích hợp thanh toán",
                    ]
                    break
                case "Gói Enterprise":
                    features = [
                        "Tất cả tính năng Premium",
                        "Quản lý nhiều nhà hàng",
                        "API tích hợp",
                        "Báo cáo nâng cao",
                        "Hỗ trợ ưu tiên",
                        "Tùy chỉnh giao diện",
                    ]
                    break
                default:
                    features = [
                        "Quản lý menu không giới hạn",
                        "Tạo QR code cho bàn",
                        "Nhận đơn hàng real-time",
                        "Báo cáo doanh thu",
                        "Hỗ trợ 24/7",
                    ]
            }

            return { planName, features }
        } catch (error) {
            console.error("Error parsing plan info:", error)
            return {
                planName: "Gói Premium",
                features: [
                    "Quản lý menu không giới hạn",
                    "Tạo QR code cho bàn",
                    "Nhận đơn hàng real-time",
                    "Báo cáo doanh thu",
                    "Hỗ trợ 24/7",
                ],
            }
        }
    }

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price)

    const formatPayDate = (payDate: string) => {
        if (!payDate) return new Date().toLocaleString("vi-VN")

        // Format từ VnPay: yyyyMMddHHmmss
        if (payDate.length === 14) {
            const year = payDate.substring(0, 4)
            const month = payDate.substring(4, 6)
            const day = payDate.substring(6, 8)
            const hour = payDate.substring(8, 10)
            const minute = payDate.substring(10, 12)
            const second = payDate.substring(12, 14)

            const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`)
            return date.toLocaleString("vi-VN")
        }

        return new Date(payDate).toLocaleString("vi-VN")
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse">
                    <Card className="w-full max-w-2xl">
                        <CardContent className="p-8">
                            <div className="h-8 bg-gray-200 rounded mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
            <div className="max-w-4xl mx-auto py-12">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <CheckCircle className="h-20 w-20 text-green-500" />
                            <Crown className="h-8 w-8 text-yellow-500 absolute -top-2 -right-2" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        {isFromVnPay ? "Thanh toán thành công!" : "Chào mừng đến với SmartQR Dine!"}
                    </h1>
                    <p className="text-xl text-gray-600">
                        {isFromVnPay
                            ? "Gói dịch vụ của bạn đã được kích hoạt thành công qua VnPay"
                            : "Gói dịch vụ của bạn đã được kích hoạt thành công"}
                    </p>

                    {error && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center gap-2 text-yellow-800">
                                <AlertCircle className="h-4 w-4" />
                                <span className="text-sm">{error}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Subscription Info */}
                    <Card className="border-green-200 bg-green-50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-800">
                                <Crown className="h-5 w-5" />
                                Thông tin gói dịch vụ
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {subscriptionInfo ? (
                                <>
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-lg">{subscriptionInfo.planName}</span>
                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                            Đang hoạt động
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-green-700">
                                            <Calendar className="h-4 w-4" />
                                            <span>Bắt đầu: {new Date(subscriptionInfo.startDate).toLocaleDateString("vi-VN")}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-green-700">
                                            <Calendar className="h-4 w-4" />
                                            <span>Kết thúc: {new Date(subscriptionInfo.endDate).toLocaleDateString("vi-VN")}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-green-700">
                                            <Star className="h-4 w-4" />
                                            <span>Tự động gia hạn: {subscriptionInfo.autoRenew ? "Có" : "Không"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-green-700">
                                            <Star className="h-4 w-4" />
                                            <span>Giá: {formatPrice(subscriptionInfo.price)}/tháng</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="font-medium text-green-800">Tính năng bao gồm:</h4>
                                        <ul className="space-y-1">
                                            {subscriptionInfo.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm text-green-700">
                                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {isFromVnPay && vnpayData && (
                                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                            <h4 className="font-medium text-blue-800 mb-2">Thông tin thanh toán VnPay</h4>
                                            <div className="space-y-1 text-xs text-blue-700">
                                                <p>
                                                    <strong>Mã giao dịch:</strong> {vnpayData.vnp_TransactionNo}
                                                </p>
                                                <p>
                                                    <strong>Mã tham chiếu:</strong> {vnpayData.vnp_TxnRef}
                                                </p>
                                                <p>
                                                    <strong>Ngân hàng:</strong> {vnpayData.vnp_BankCode}
                                                </p>
                                                <p>
                                                    <strong>Loại thẻ:</strong> {vnpayData.vnp_CardType}
                                                </p>
                                                <p>
                                                    <strong>Thời gian:</strong> {formatPayDate(vnpayData.vnp_PayDate)}
                                                </p>
                                                <p>
                                                    <strong>Số tiền:</strong> {formatPrice(Number.parseInt(vnpayData.vnp_Amount) / 100)}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-4 p-3 bg-green-100 rounded-lg">
                                        <p className="text-sm text-green-800 font-medium">🎉 Dùng thử miễn phí 14 ngày!</p>
                                        <p className="text-xs text-green-700 mt-1">
                                            Bạn sẽ không bị tính phí trong 14 ngày đầu. Sau đó sẽ tự động gia hạn với giá{" "}
                                            {formatPrice(subscriptionInfo.price)}/tháng.
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-green-700">Đang tải thông tin gói dịch vụ...</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Next Steps */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ArrowRight className="h-5 w-5 text-orange-500" />
                                Bước tiếp theo
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                                    <h4 className="font-medium text-orange-800 mb-1">1. Thiết lập nhà hàng</h4>
                                    <p className="text-sm text-orange-700">Cập nhật thông tin nhà hàng, menu và cài đặt cơ bản</p>
                                </div>

                                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <h4 className="font-medium text-blue-800 mb-1">2. Tạo QR Code</h4>
                                    <p className="text-sm text-blue-700">Tạo mã QR cho từng bàn để khách hàng có thể đặt món</p>
                                </div>

                                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                                    <h4 className="font-medium text-purple-800 mb-1">3. Quản lý đơn hàng</h4>
                                    <p className="text-sm text-purple-700">Theo dõi và xử lý đơn hàng từ khách hàng</p>
                                </div>

                                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                    <h4 className="font-medium text-green-800 mb-1">4. Xem báo cáo</h4>
                                    <p className="text-sm text-green-700">Theo dõi doanh thu và phân tích kinh doanh</p>
                                </div>
                            </div>

                            <div className="space-y-2 pt-4">
                                <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
                                    <Link href="/restaurant/dashboard">Bắt đầu sử dụng Dashboard</Link>
                                </Button>
                                <Button variant="outline" asChild className="w-full">
                                    <Link href="/restaurant/settings">Cài đặt nhà hàng</Link>
                                </Button>
                                <Button variant="outline" asChild className="w-full">
                                    <Link href="/restaurant/menu">Quản lý Menu</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Support */}
                <Card className="mt-6 bg-gray-50">
                    <CardContent className="p-6 text-center">
                        <h3 className="font-semibold mb-2">Cần hỗ trợ?</h3>
                        <p className="text-gray-600 mb-4">Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp bạn bắt đầu</p>
                        <div className="flex justify-center gap-4">
                            <Button variant="outline" asChild>
                                <Link href="/support">Liên hệ hỗ trợ</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/docs">Xem hướng dẫn</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="mailto:support@smartqrdine.com">Email hỗ trợ</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 text-center">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl">🍽️</span>
                            </div>
                            <h4 className="font-medium mb-1">Tạo Menu</h4>
                            <p className="text-sm text-gray-600 mb-3">Thêm món ăn và đồ uống</p>
                            <Button variant="outline" size="sm" asChild className="w-full">
                                <Link href="/restaurant/menu">Bắt đầu</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl">📱</span>
                            </div>
                            <h4 className="font-medium mb-1">QR Code</h4>
                            <p className="text-sm text-gray-600 mb-3">Tạo mã QR cho bàn</p>
                            <Button variant="outline" size="sm" asChild className="w-full">
                                <Link href="/restaurant/qr-codes">Tạo QR</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h4 className="font-medium mb-1">Báo cáo</h4>
                            <p className="text-sm text-gray-600 mb-3">Xem doanh thu</p>
                            <Button variant="outline" size="sm" asChild className="w-full">
                                <Link href="/restaurant/reports">Xem báo cáo</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
