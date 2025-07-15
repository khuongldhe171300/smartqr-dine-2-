"use client"

import { useState } from "react"

interface OrderInfoModel {
    fullName: string
    orderId: string
    orderInfo: string
    amount: string
}

interface MomoPaymentResponse {
    payUrl: string
}

export function useMomo() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createMomoPayment = async (
        fullName: string,
        orderId: string,
        orderInfo: string,
        amount: number,
    ): Promise<string | null> => {
        setIsLoading(true)
        setError(null)

        try {
            const token = localStorage.getItem("token")

            if (!token) {
                throw new Error("Vui lòng đăng nhập để tiếp tục")
            }

            const paymentData: OrderInfoModel = {
                fullName,
                orderId,
                orderInfo,
                amount: amount.toString(),
            }

            console.log("Sending MoMo payment request:", paymentData)

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(paymentData),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || "Không thể tạo thanh toán MoMo")
            }

            const data: MomoPaymentResponse = await response.json()
            console.log("MoMo payment URL received:", data.payUrl)
            return data.payUrl
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra"
            setError(errorMessage)
            console.error("MoMo payment error:", errorMessage)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    return {
        createMomoPayment,
        isLoading,
        error,
    }
}
