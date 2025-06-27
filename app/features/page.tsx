"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { CheckCircle, QrCode, Smartphone, BarChart4, Clock, CreditCard } from "lucide-react"
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation"

export default function FeaturesPage() {
  const heroAnimation = useScrollAnimation()
  const customerFeaturesAnimation = useStaggeredAnimation(6, 100)
  const restaurantFeaturesAnimation = useStaggeredAnimation(4, 150)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div
            ref={heroAnimation.ref}
            className={`flex flex-col items-center justify-center space-y-4 text-center transition-all duration-1000 ${
              heroAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                Tính năng Quét là xong
              </h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto animate-fade-in-up stagger-1">
                Khám phá đầy đủ các tính năng giúp tối ưu hóa quy trình phục vụ và tăng trải nghiệm khách hàng
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Features */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 animate-fade-in-up">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600 animate-bounce-slow">
                Dành cho khách hàng
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Trải nghiệm đặt món tuyệt vời</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                Các tính năng giúp khách hàng có trải nghiệm đặt món dễ dàng và thuận tiện
              </p>
            </div>
          </div>
          <div
            ref={customerFeaturesAnimation.ref}
            className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
          >
            {[
              {
                icon: QrCode,
                title: "Quét mã QR đơn giản",
                desc: "Khách hàng chỉ cần quét mã QR đặt trên bàn là có thể xem menu và đặt món ngay lập tức.",
              },
              {
                icon: Smartphone,
                title: "Không cần cài ứng dụng",
                desc: "Hoạt động trên trình duyệt web, không yêu cầu tải và cài đặt ứng dụng phức tạp.",
              },
              {
                icon: CheckCircle,
                title: "Tùy chỉnh món ăn",
                desc: "Dễ dàng tùy chỉnh yêu cầu đặc biệt cho món ăn như độ cay, không hành, thêm phần...",
              },
              {
                icon: Clock,
                title: "Theo dõi trạng thái",
                desc: "Theo dõi trạng thái đơn hàng theo thời gian thực: đã nhận, đang chế biến, đã hoàn thành.",
              },
              {
                icon: CreditCard,
                title: "Thanh toán linh hoạt",
                desc: "Hỗ trợ nhiều phương thức thanh toán: tiền mặt, thẻ, ví điện tử, chuyển khoản ngân hàng.",
              },
              {
                icon: BarChart4,
                title: "Đánh giá trải nghiệm",
                desc: "Khách hàng có thể đánh giá món ăn và dịch vụ ngay trên hệ thống sau khi dùng bữa.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col space-y-4 hover-lift hover-glow transition-all duration-500 p-6 rounded-xl ${
                  customerFeaturesAnimation.visibleItems.includes(index)
                    ? "animate-fade-in-scale"
                    : "opacity-0 scale-95"
                }`}
              >
                <div className="rounded-full bg-orange-100 p-3 w-12 h-12 flex items-center justify-center hover-rotate">
                  <feature.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant Features */}
      <section className="bg-orange-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 animate-fade-in-up">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600 animate-bounce-slow">
                Dành cho nhà hàng
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Quản lý hiệu quả, tăng doanh thu</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                Các tính năng giúp nhà hàng tối ưu quy trình, giảm chi phí và tăng doanh thu
              </p>
            </div>
          </div>
          <div
            ref={restaurantFeaturesAnimation.ref}
            className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 max-w-5xl mx-auto"
          >
            {[
              {
                title: "Quản lý menu linh hoạt",
                features: [
                  "Cập nhật menu theo thời gian thực",
                  "Thêm/xóa món, điều chỉnh giá nhanh chóng",
                  "Phân loại món ăn theo danh mục",
                  "Đánh dấu món đặc biệt, món mới, món bán chạy",
                ],
              },
              {
                title: "Quản lý đơn hàng hiệu quả",
                features: [
                  "Nhận đơn hàng tự động, không cần ghi chép",
                  "Phân loại đơn theo trạng thái, bàn, thời gian",
                  "Thông báo đơn mới cho nhà bếp",
                  "Lịch sử đơn hàng chi tiết",
                ],
              },
              {
                title: "Báo cáo và phân tích",
                features: [
                  "Thống kê doanh thu theo ngày, tuần, tháng",
                  "Phân tích món ăn bán chạy",
                  "Báo cáo thời gian phục vụ trung bình",
                  "Phân tích đánh giá của khách hàng",
                ],
              },
              {
                title: "Marketing và khách hàng",
                features: [
                  "Chương trình khuyến mãi, mã giảm giá",
                  "Hệ thống tích điểm, khách hàng thân thiết",
                  "Gửi thông báo, ưu đãi qua email/SMS",
                  "Phân tích hành vi khách hàng",
                ],
              },
            ].map((section, index) => (
              <div
                key={index}
                className={`flex flex-col space-y-4 rounded-lg border bg-white p-6 hover-lift hover-glow transition-all duration-500 ${
                  restaurantFeaturesAnimation.visibleItems.includes(index)
                    ? "animate-slide-in-bottom"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h3 className="text-xl font-bold">{section.title}</h3>
                <ul className="space-y-2">
                  {section.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center animate-fade-in-left"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <CheckCircle className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 hover-scale" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
