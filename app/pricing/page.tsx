"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchAllSubscriptionPlans } from "@/lib/subscriptionPlansApi"
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation"

interface SubscriptionPlan {
  planId: number
  planName: string
  description: string
  price: number
  billingCycle: string
  maxTables: number
  maxMenuItems: number
  features: string[]
  createdAt: string
}

export default function PricingPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const heroAnimation = useScrollAnimation()
  const plansAnimation = useStaggeredAnimation(3, 200)
  const tableAnimation = useScrollAnimation()
  const faqAnimation = useScrollAnimation()

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await fetchAllSubscriptionPlans()
        const parsedData = data.map((plan: any) => ({
          ...plan,
          features: typeof plan.features === "string" ? JSON.parse(plan.features) : [],
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
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div
            ref={heroAnimation.ref}
            className={`flex flex-col items-center justify-center space-y-6 text-center transition-all duration-1000 ${
              heroAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600 animate-bounce-slow">
                <Zap className="mr-2 h-4 w-4" />
                Bảng giá minh bạch
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                Chọn gói phù hợp với bạn
              </h1>
              <p className="max-w-3xl text-gray-600 text-lg leading-relaxed mx-auto animate-fade-in-up stagger-1">
                Lựa chọn gói dịch vụ phù hợp với quy mô và nhu cầu của nhà hàng bạn. Tất cả gói đều có 14 ngày dùng thử
                miễn phí.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div ref={plansAnimation.ref} className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.planId}
                className={`flex flex-col h-full rounded-2xl border-2 ${
                  index === 1 ? "border-orange-300 shadow-lg scale-105 relative" : "border-gray-200 shadow-sm"
                } bg-white p-8 hover:shadow-xl transition-all duration-500 hover-lift hover-glow ${
                  plansAnimation.visibleItems.includes(index) ? "animate-fade-in-scale" : "opacity-0 scale-95"
                }`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Phổ biến nhất
                    </div>
                  </div>
                )}
                <div className="flex-1">
                  <div className="space-y-4 mb-8">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-900 animate-fade-in-up">{plan.planName}</h3>
                      <p className="text-gray-600 animate-fade-in-up stagger-1">{plan.description}</p>
                    </div>
                    <div className="flex items-baseline animate-fade-in-up stagger-2">
                      <span className="text-4xl font-bold text-gray-900 gradient-text">
                        {plan.price.toLocaleString("vi-VN")}đ
                      </span>
                      <span className="ml-2 text-lg text-gray-500">/{plan.billingCycle}</span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 animate-fade-in-left"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0 hover-scale" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={`/checkout?type=subscription&planId=${plan.planId}`} className="w-full">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold hover-lift hover-glow">
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
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div
            ref={tableAnimation.ref}
            className={`text-center mb-12 transition-all duration-1000 ${
              tableAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">So sánh chi tiết các gói</h2>
            <p className="text-gray-600 text-lg animate-fade-in-up stagger-1">
              Tìm hiểu chi tiết về tính năng của từng gói dịch vụ
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm hover-lift">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-6 font-semibold">Tính năng</th>
                  <th className="text-center p-6 font-semibold">Cơ bản</th>
                  <th className="text-center p-6 font-semibold bg-orange-50">Tiêu chuẩn</th>
                  <th className="text-center p-6 font-semibold">Cao cấp</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-6">Số lượng bàn</td>
                  <td className="text-center p-6">10 bàn</td>
                  <td className="text-center p-6 bg-orange-50">30 bàn</td>
                  <td className="text-center p-6">Không giới hạn</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-6">Menu điện tử</td>
                  <td className="text-center p-6">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto hover-scale" />
                  </td>
                  <td className="text-center p-6 bg-orange-50">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto hover-scale" />
                  </td>
                  <td className="text-center p-6">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto hover-scale" />
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-6">Thanh toán online</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6 bg-orange-50">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto hover-scale" />
                  </td>
                  <td className="text-center p-6">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto hover-scale" />
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-6">Báo cáo nâng cao</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6 bg-orange-50">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto hover-scale" />
                  </td>
                  <td className="text-center p-6">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto hover-scale" />
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-6">Tích hợp POS</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6 bg-orange-50">-</td>
                  <td className="text-center p-6">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto hover-scale" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div
            ref={faqAnimation.ref}
            className={`text-center mb-12 transition-all duration-1000 ${
              faqAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">Câu hỏi thường gặp</h2>
            <p className="text-gray-600 text-lg animate-fade-in-up stagger-1">
              Giải đáp những thắc mắc phổ biến về dịch vụ Quét là xong
            </p>
          </div>
          <div className="mx-auto max-w-3xl space-y-8">
            {[
              {
                question: "Tôi có thể dùng thử trước khi đăng ký không?",
                answer:
                  "Có, chúng tôi cung cấp gói dùng thử miễn phí 14 ngày với đầy đủ tính năng để bạn có thể trải nghiệm dịch vụ trước khi quyết định.",
              },
              {
                question: "Tôi có thể nâng cấp hoặc hạ cấp gói dịch vụ không?",
                answer:
                  "Có, bạn có thể dễ dàng nâng cấp hoặc hạ cấp gói dịch vụ bất kỳ lúc nào. Việc thay đổi sẽ có hiệu lực vào chu kỳ thanh toán tiếp theo.",
              },
              {
                question: "Có cần thiết bị phần cứng đặc biệt nào không?",
                answer:
                  "Không, Quét là xong hoạt động hoàn toàn trên nền tảng web. Bạn chỉ cần in mã QR và đặt trên bàn. Khách hàng sử dụng điện thoại thông minh của họ để quét mã.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="space-y-3 hover-lift p-6 rounded-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h3 className="text-xl font-bold">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 py-16 md:py-24 text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-6 text-center animate-fade-in-up">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-fade-in-scale">
                Bắt đầu ngay hôm nay
              </h2>
              <p className="max-w-2xl text-xl leading-relaxed text-orange-100 mx-auto animate-fade-in-up stagger-1">
                Dùng thử miễn phí 14 ngày, không cần thẻ tín dụng. Hủy bất kỳ lúc nào.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-2">
              <Link href="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold w-full sm:w-auto hover-lift hover-glow"
                >
                  Đăng ký dùng thử
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold w-full sm:w-auto hover-lift hover-glow"
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
