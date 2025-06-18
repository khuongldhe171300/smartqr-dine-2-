"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchAllSubscriptionPlans } from "@/lib/subscriptionPlansApi"

interface SubscriptionPlan {
  planId: number
  planName: string
  description: string
  price: number
  billingCycle: string
  maxTables: number
  maxMenuItems: number
  features: string[] // Giả định bạn đã parse JSON thành mảng
  createdAt: string
}


export default function PricingPage() {

  const [plans, setPlans] = useState<SubscriptionPlan[]>([])

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await fetchAllSubscriptionPlans()
        const parsedData = data.map((plan: any) => ({
          ...plan,
          features: typeof plan.features === "string" ? JSON.parse(plan.features) : []
        }))
        setPlans(parsedData)
      } catch (err) {
        console.error("Lỗi tải danh sách gói:", err)
      }
    }

    loadPlans()
  }, [])



  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
                <Zap className="mr-2 h-4 w-4" />
                Bảng giá minh bạch
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Chọn gói phù hợp với bạn</h1>
              <p className="max-w-3xl text-gray-600 text-lg leading-relaxed">
                Lựa chọn gói dịch vụ phù hợp với quy mô và nhu cầu của nhà hàng bạn. Tất cả gói đều có 14 ngày dùng thử
                miễn phí.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="bg-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.planId}
                className={`flex flex-col h-full rounded-2xl border-2 ${index === 1 ? "border-orange-300 shadow-lg scale-105 relative" : "border-gray-200 shadow-sm"} bg-white p-8 hover:shadow-xl transition-all duration-300`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Phổ biến nhất
                    </div>
                  </div>
                )}
                <div className="flex-1">
                  <div className="space-y-4 mb-8">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-900">{plan.planName}</h3>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900">{plan.price.toLocaleString("vi-VN")}đ</span>
                      <span className="ml-2 text-lg text-gray-500">/{plan.billingCycle}</span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={`/checkout?type=subscription&planId=${plan.planId}`} className="w-full">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold">
                    Đăng ký ngay
                  </Button>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* Comparison Table */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">So sánh chi tiết các gói</h2>
            <p className="text-gray-600 text-lg">Tìm hiểu chi tiết về tính năng của từng gói dịch vụ</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-6 font-semibold">Tính năng</th>
                  <th className="text-center p-6 font-semibold">Cơ bản</th>
                  <th className="text-center p-6 font-semibold bg-orange-50">Tiêu chuẩn</th>
                  <th className="text-center p-6 font-semibold">Cao cấp</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-6">Số lượng bàn</td>
                  <td className="text-center p-6">10 bàn</td>
                  <td className="text-center p-6 bg-orange-50">30 bàn</td>
                  <td className="text-center p-6">Không giới hạn</td>
                </tr>
                <tr className="border-b">
                  <td className="p-6">Menu điện tử</td>
                  <td className="text-center p-6">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center p-6 bg-orange-50">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center p-6">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-6">Thanh toán online</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6 bg-orange-50">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center p-6">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-6">Báo cáo nâng cao</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6 bg-orange-50">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center p-6">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-6">Tích hợp POS</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6 bg-orange-50">-</td>
                  <td className="text-center p-6">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Câu hỏi thường gặp</h2>
            <p className="text-gray-600 text-lg">Giải đáp những thắc mắc phổ biến về dịch vụ Quét là xong</p>
          </div>
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-3">
              <h3 className="text-xl font-bold">Tôi có thể dùng thử trước khi đăng ký không?</h3>
              <p className="text-gray-600 leading-relaxed">
                Có, chúng tôi cung cấp gói dùng thử miễn phí 14 ngày với đầy đủ tính năng để bạn có thể trải nghiệm dịch
                vụ trước khi quyết định.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold">Tôi có thể nâng cấp hoặc hạ cấp gói dịch vụ không?</h3>
              <p className="text-gray-600 leading-relaxed">
                Có, bạn có thể dễ dàng nâng cấp hoặc hạ cấp gói dịch vụ bất kỳ lúc nào. Việc thay đổi sẽ có hiệu lực vào
                chu kỳ thanh toán tiếp theo.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold">Có cần thiết bị phần cứng đặc biệt nào không?</h3>
              <p className="text-gray-600 leading-relaxed">
                Không, Quét là xong hoạt động hoàn toàn trên nền tảng web. Bạn chỉ cần in mã QR và đặt trên bàn. Khách
                hàng sử dụng điện thoại thông minh của họ để quét mã.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 py-16 md:py-24 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Bắt đầu ngay hôm nay</h2>
              <p className="max-w-2xl text-xl leading-relaxed text-orange-100">
                Dùng thử miễn phí 14 ngày, không cần thẻ tín dụng. Hủy bất kỳ lúc nào.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold"
                >
                  Đăng ký dùng thử
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold"
                >
                  Liên hệ tư vấn
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
