"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2, Crown, Calendar, CreditCard } from "lucide-react"
import Link from "next/link"

export default function PaymentCallback() {
    const searchParams = useSearchParams()
    const [status, setStatus] = useState<"loading" | "success" | "failed">("loading")
    const [transactionInfo, setTransactionInfo] = useState<any>(null)
    const [isSubscription, setIsSubscription] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState<"vnpay" | "momo" | "bank">("bank")

    useEffect(() => {
        const processPaymentResult = async () => {
            try {
                // Kiểm tra xem có phải callback từ MoMo không
                const momoParams = {
                    orderId: searchParams.get("orderId"),
                    requestId: searchParams.get("requestId"),
                    amount: searchParams.get("amount"),
                    orderInfo: searchParams.get("orderInfo"),
                    orderType: searchParams.get("orderType"),
                    transId: searchParams.get("transId"),
                    resultCode: searchParams.get("resultCode"),
                    message: searchParams.get("message"),
                    payType: searchParams.get("payType"),
                    responseTime: searchParams.get("responseTime"),
                    extraData: searchParams.get("extraData"),
                    signature: searchParams.get("signature"),
                }

                // Kiểm tra xem có phải callback từ VnPay không
                const vnpayParams = {
                    vnp_TxnRef: searchParams.get("vnp_TxnRef"),
                    vnp_Amount: searchParams.get("vnp_Amount"),
                    vnp_ResponseCode: searchParams.get("vnp_ResponseCode"),
                    vnp_OrderInfo: searchParams.get("vnp_OrderInfo"),
                    vnp_PayDate: searchParams.get("vnp_PayDate"),
                    vnp_SecureHash: searchParams.get("vnp_SecureHash"),
                }

                // Xác định loại payment method
                if (momoParams.orderId && momoParams.resultCode) {
                    setPaymentMethod("momo")
                    console.log("MoMo callback detected:", momoParams)

                    // Kiểm tra loại giao dịch
                    const isSubTransaction = momoParams.orderId?.includes("SUB_")
                    setIsSubscription(isSubTransaction || false)

                    // Xử lý kết quả từ MoMo
                    if (momoParams.resultCode === "0") {
                        setStatus("success")
                        setTransactionInfo({
                            txnRef: momoParams.orderId,
                            amount: momoParams.amount ? Number.parseInt(momoParams.amount) : 0,
                            orderInfo: momoParams.orderInfo,
                            payDate: momoParams.responseTime,
                            isSubscription: isSubTransaction,
                            success: true,
                            transId: momoParams.transId,
                            paymentMethod: "MoMo",
                        })
                    } else {
                        setStatus("failed")
                        setTransactionInfo({
                            txnRef: momoParams.orderId,
                            orderInfo: momoParams.orderInfo,
                            isSubscription: isSubTransaction,
                            success: false,
                            errorMessage: momoParams.message || "Giao dịch thất bại",
                            errorCode: momoParams.resultCode,
                        })
                    }
                } else if (vnpayParams.vnp_TxnRef && vnpayParams.vnp_ResponseCode) {
                    setPaymentMethod("vnpay")
                    console.log("VnPay callback detected:", vnpayParams)

                    // Kiểm tra loại giao dịch
                    const isSubTransaction = vnpayParams.vnp_TxnRef?.includes("SUB_")
                    setIsSubscription(isSubTransaction || false)

                    // Thử gọi API backend để xử lý callback
                    try {
                        // Tạo query string từ searchParams (bỏ dấu ? ở đầu)
                        const queryString = searchParams.toString()

                        console.log("Calling API with query string:", queryString)

                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Payment/PaymentBackReturnUrl?${queryString}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "true"
                            },
                        });


                        console.log("API Response status:", response.status)

                        if (response.ok) {
                            const result = await response.json()
                            console.log("API Result:", result)

                            // Xử lý kết quả từ API mới
                            if (result.success === true || result.responseCode === "00" || vnpayParams.vnp_ResponseCode === "00") {
                                setStatus("success")
                                setTransactionInfo({
                                    txnRef: result.txnRef || vnpayParams.vnp_TxnRef,
                                    amount: result.amount || (vnpayParams.vnp_Amount ? Number.parseInt(vnpayParams.vnp_Amount) / 100 : 0),
                                    orderInfo: result.orderInfo || vnpayParams.vnp_OrderInfo,
                                    payDate: result.payDate || vnpayParams.vnp_PayDate,
                                    isSubscription: isSubTransaction,
                                    success: true,
                                    paymentMethod: "VnPay",
                                })
                            } else {
                                setStatus("failed")
                                setTransactionInfo({
                                    txnRef: result.txnRef || vnpayParams.vnp_TxnRef,
                                    orderInfo: result.orderInfo || vnpayParams.vnp_OrderInfo,
                                    isSubscription: isSubTransaction,
                                    success: false,
                                    errorMessage: result.message || "Giao dịch thất bại",
                                    paymentMethod: "VnPay",
                                })
                            }
                        } else {
                            console.log("API call failed, using fallback logic")
                            throw new Error(`API returned ${response.status}`)
                        }
                    } catch (apiError) {
                        console.error("API call failed:", apiError)

                        // Fallback: Xử lý trực tiếp từ query parameters
                        console.log("Using fallback logic with query parameters")

                        if (vnpayParams.vnp_ResponseCode === "00") {
                            setStatus("success")
                            setTransactionInfo({
                                txnRef: vnpayParams.vnp_TxnRef,
                                amount: vnpayParams.vnp_Amount ? Number.parseInt(vnpayParams.vnp_Amount) / 100 : 0,
                                orderInfo: vnpayParams.vnp_OrderInfo,
                                payDate: vnpayParams.vnp_PayDate,
                                isSubscription: isSubTransaction,
                                success: true,
                                paymentMethod: "VnPay",
                            })
                        } else {
                            setStatus("failed")
                            setTransactionInfo({
                                txnRef: vnpayParams.vnp_TxnRef,
                                orderInfo: vnpayParams.vnp_OrderInfo,
                                isSubscription: isSubTransaction,
                                success: false,
                                errorMessage: getVnPayErrorMessage(vnpayParams.vnp_ResponseCode),
                                paymentMethod: "VnPay",
                            })
                        }
                    }
                } else {
                    // Không phải callback từ payment gateway
                    console.log("No payment gateway callback detected")
                    setStatus("failed")
                    setTransactionInfo({
                        success: false,
                        errorMessage: "Không nhận được thông tin thanh toán",
                    })
                }
            } catch (error) {
                console.error("Lỗi xử lý kết quả thanh toán:", error)
                setStatus("failed")
                setTransactionInfo({
                    success: false,
                    errorMessage: "Có lỗi xảy ra khi xử lý kết quả thanh toán",
                })
            }
        }

        if (status === "loading") {
            processPaymentResult()
        }
    }, [searchParams, status])

    const getVnPayErrorMessage = (responseCode: string | null) => {
        const errorMessages: { [key: string]: string } = {
            "01": "Giao dịch chưa hoàn tất",
            "02": "Giao dịch bị lỗi",
            "04": "Giao dịch đảo (Khách hàng đã bị trừ tiền tại Ngân hàng nhưng GD chưa thành công ở VNPAY)",
            "05": "VNPAY đang xử lý giao dịch này (GD hoàn tiền)",
            "06": "VNPAY đã gửi yêu cầu hoàn tiền sang Ngân hàng (GD hoàn tiền)",
            "07": "Giao dịch bị nghi ngờ gian lận",
            "09": "GD Hoàn trả bị từ chối",
            "10": "Đã giao hàng",
            "11": "Giao dịch không thành công do: Khách hàng nhập sai mật khẩu OTP quá số lần quy định",
            "12": "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa",
            "13": "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP)",
            "24": "Giao dịch không thành công do: Khách hàng hủy giao dịch",
            "51": "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch",
            "65": "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày",
            "75": "Ngân hàng thanh toán đang bảo trì",
            "79": "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định",
            "99": "Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)",
        }

        return errorMessages[responseCode || ""] || "Giao dịch thất bại"
    }

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price)

    const formatPayDate = (payDate: string) => {
        if (!payDate) return new Date().toLocaleString("vi-VN")

        // Xử lý format date từ MoMo
        if (paymentMethod === "momo") {
            try {
                const date = new Date(Number.parseInt(payDate))
                return date.toLocaleString("vi-VN")
            } catch (e) {
                return new Date().toLocaleString("vi-VN")
            }
        }

        // Xử lý format date từ VnPay (yyyyMMddHHmmss)
        if (paymentMethod === "vnpay" && payDate.length === 14) {
            const year = payDate.substring(0, 4)
            const month = payDate.substring(4, 6)
            const day = payDate.substring(6, 8)
            const hour = payDate.substring(8, 10)
            const minute = payDate.substring(10, 12)
            const second = payDate.substring(12, 14)

            const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`)
            return date.toLocaleString("vi-VN")
        }

        return new Date().toLocaleString("vi-VN")
    }

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Card className="w-full max-w-md">
                    <CardContent className="flex flex-col items-center justify-center p-8">
                        <Loader2 className="h-12 w-12 animate-spin text-orange-500 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Đang xử lý thanh toán</h2>
                        <p className="text-gray-600 text-center">Vui lòng đợi trong giây lát...</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-lg">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        {status === "success" ? (
                            <div className="relative">
                                <CheckCircle className="h-16 w-16 text-green-500" />
                                {isSubscription && <Crown className="h-6 w-6 text-yellow-500 absolute -top-1 -right-1" />}
                            </div>
                        ) : (
                            <XCircle className="h-16 w-16 text-red-500" />
                        )}
                    </div>
                    <CardTitle className="text-2xl">
                        {status === "success"
                            ? isSubscription
                                ? "Đăng ký thành công!"
                                : "Thanh toán thành công!"
                            : isSubscription
                                ? "Đăng ký thất bại!"
                                : "Thanh toán thất bại!"}
                    </CardTitle>
                    {status === "success" && isSubscription && (
                        <p className="text-green-600 mt-2">
                            Chào mừng bạn đến với SmartQR Dine! Gói dịch vụ của bạn đã được kích hoạt.
                        </p>
                    )}
                </CardHeader>
                <CardContent className="space-y-4">
                    {status === "success" && transactionInfo && (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                                {isSubscription ? (
                                    <>
                                        <Crown className="h-4 w-4" />
                                        Thông tin đăng ký
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="h-4 w-4" />
                                        Thông tin giao dịch
                                    </>
                                )}
                            </h3>
                            <div className="space-y-2 text-sm text-green-700">
                                <div className="flex justify-between">
                                    <span className="font-medium">Mã giao dịch:</span>
                                    <span className="font-mono">{transactionInfo.txnRef}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Số tiền:</span>
                                    <span className="font-semibold">{formatPrice(transactionInfo.amount)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Phương thức:</span>
                                    <span>{transactionInfo.paymentMethod || (paymentMethod === "momo" ? "MoMo" : "VnPay")}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Thời gian:</span>
                                    <span>{formatPayDate(transactionInfo.payDate)}</span>
                                </div>
                                {transactionInfo.orderInfo && (
                                    <div className="flex justify-between">
                                        <span className="font-medium">Mô tả:</span>
                                        <span>{transactionInfo.orderInfo}</span>
                                    </div>
                                )}
                                {transactionInfo.transId && (
                                    <div className="flex justify-between">
                                        <span className="font-medium">Mã giao dịch MoMo:</span>
                                        <span className="font-mono">{transactionInfo.transId}</span>
                                    </div>
                                )}
                            </div>

                            {isSubscription && (
                                <div className="mt-3 pt-3 border-t border-green-300">
                                    <div className="flex items-center gap-2 text-green-800 mb-2">
                                        <Calendar className="h-4 w-4" />
                                        <span className="font-medium">Thông tin gói dịch vụ</span>
                                    </div>
                                    <div className="space-y-1 text-sm text-green-700">
                                        <p>• Gói dịch vụ đã được kích hoạt</p>
                                        <p>• Thời hạn: 1 tháng kể từ hôm nay</p>
                                        <p>• Tự động gia hạn: Có</p>
                                        <p>• Bạn có thể quản lý gói dịch vụ trong trang dashboard</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {status === "failed" && (
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                            <h3 className="font-semibold text-red-800 mb-2">Lý do thất bại</h3>
                            <p className="text-sm text-red-700">
                                {transactionInfo?.errorMessage ||
                                    (isSubscription
                                        ? "Không thể hoàn tất đăng ký gói dịch vụ. Vui lòng kiểm tra lại thông tin thanh toán hoặc thử lại sau."
                                        : "Giao dịch không thể hoàn tất. Vui lòng kiểm tra lại thông tin thanh toán hoặc thử lại sau.")}
                            </p>
                            {transactionInfo?.txnRef && (
                                <p className="text-xs text-red-600 mt-2">Mã tham chiếu: {transactionInfo.txnRef}</p>
                            )}
                            {transactionInfo?.errorCode && (
                                <p className="text-xs text-red-600 mt-1">Mã lỗi: {transactionInfo.errorCode}</p>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        {status === "success" ? (
                            <>
                                {isSubscription ? (
                                    <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                                        <Link href="/subscription-success">Xem thông tin gói dịch vụ</Link>
                                    </Button>
                                ) : (
                                    <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                                        <Link href="/restaurant/dashboard">Về trang chủ</Link>
                                    </Button>
                                )}
                                <Button variant="outline" asChild className="w-full">
                                    <Link href="/restaurant/dashboard">Vào Dashboard</Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
                                    <Link href={isSubscription ? "/pricing" : "/checkout"}>
                                        {isSubscription ? "Chọn gói khác" : "Thử lại"}
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild className="w-full">
                                    <Link href="/">Về trang chủ</Link>
                                </Button>
                            </>
                        )}
                    </div>

                    <div className="text-center">
                        <p className="text-xs text-gray-500">
                            Nếu bạn cần hỗ trợ, vui lòng liên hệ{" "}
                            <Link href="/support" className="text-orange-600 hover:underline">
                                bộ phận chăm sóc khách hàng
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
