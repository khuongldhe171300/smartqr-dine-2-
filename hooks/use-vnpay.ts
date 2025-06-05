"use client"

import { useState } from "react"

interface PaymentInformationModel {
    orderType: string
    amount: number
    orderDescription: string
    name: string
}

interface VnPayPaymentResponse {
    paymentUrl: string
}

export function useVnPay() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createVnPayPayment = async (
        orderType: string,
        amount: number,
        orderDescription: string,
        name: string,
    ): Promise<string | null> => {
        setIsLoading(true)
        setError(null)

        try {
            const token = localStorage.getItem("token")

            if (!token) {
                throw new Error("Vui lòng đăng nhập để tiếp tục")
            }

            const paymentData: PaymentInformationModel = {
                orderType,
                amount,
                orderDescription,
                name,
            }

            console.log("Sending VnPay payment request:", paymentData)

            const response = await fetch("https://localhost:7082/api/Payment/CreatePaymentUrlVnpay", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(paymentData),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || "Không thể tạo thanh toán VnPay")
            }

            const data: VnPayPaymentResponse = await response.json()
            console.log("VnPay payment URL received:", data.paymentUrl)
            return data.paymentUrl
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra"
            setError(errorMessage)
            console.error("VnPay payment error:", errorMessage)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    // Giữ lại các method cũ để backward compatibility
    const createSubscriptionPayment = async (
        planId: number,
        planName: string,
        amount: number,
    ): Promise<string | null> => {
        return createVnPayPayment("subscription", amount, `Thanh toan goi ${planName}`, `Goi dich vu ${planName}`)
    }

    const createOrderPayment = async (
        orderId: number,
        orderDescription: string,
        amount: number,
    ): Promise<string | null> => {
        return createVnPayPayment("order", amount, orderDescription, `Don hang #${orderId}`)
    }

    return {
        createVnPayPayment,
        createSubscriptionPayment,
        createOrderPayment,
        isLoading,
        error,
    }
}
