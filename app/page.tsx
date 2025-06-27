"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, QrCode, Clock, Users, Star, TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation"

export default function Home() {
  const heroAnimation = useScrollAnimation()
  const statsAnimation = useScrollAnimation()
  const featuresAnimation = useStaggeredAnimation(6, 150)
  const stepsAnimation = useStaggeredAnimation(3, 200)
  const testimonialsAnimation = useStaggeredAnimation(3, 100)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 md:px-6 relative max-w-7xl">
          <div
            ref={heroAnimation.ref}
            className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center transition-all duration-1000 ${heroAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 animate-bounce-slow">
                <Zap className="mr-2 h-4 w-4" />
                Giải pháp đặt món thông minh #1 Việt Nam
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl gradient-text">
                Quét là xong
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-fade-in-up stagger-1">
                Hệ thống đặt món thông minh qua QR code cho nhà hàng. Giúp khách hàng gọi món ngay tại bàn và đặt hàng
                từ xa, <span className="font-semibold text-orange-600">không cần cài ứng dụng</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up stagger-2">
                <Link href="/demo">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover-lift hover-glow w-full sm:w-auto"
                  >
                    Dùng thử miễn phí <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-orange-200 hover:border-orange-300 px-8 py-4 text-lg font-semibold w-full sm:w-auto bg-transparent hover-lift"
                  >
                    Liên hệ tư vấn
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 justify-center lg:justify-start animate-fade-in-up stagger-3">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white animate-pulse-slow"></div>
                    <div className="w-8 h-8 rounded-full bg-orange-200 border-2 border-white animate-pulse-slow stagger-1"></div>
                    <div className="w-8 h-8 rounded-full bg-orange-300 border-2 border-white animate-pulse-slow stagger-2"></div>
                  </div>
                  <span className="text-sm text-gray-600">500+ nhà hàng tin dùng</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 hover-scale" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">4.9/5</span>
                </div>
              </div>
            </div>
            <div className="flex-1 relative w-full max-w-lg lg:max-w-none animate-float">
              <div className="relative overflow-hidden rounded-2xl border-8 border-white bg-white shadow-2xl hover-lift">
                <Image
                  src="https://dorabot.io/quet-ma-qr-code-online-mien-phi/assets/images/qr-code-scanner-online-1.jpg"
                  alt="Quét là xong Demo"
                  width={700}
                  height={600}
                  className="rounded-xl object-cover w-full h-auto transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce-slow">
                Miễn phí 14 ngày
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-b">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div
            ref={statsAnimation.ref}
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${statsAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="text-center hover-scale">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 gradient-text">500+</div>
              <div className="text-gray-600 mt-2">Nhà hàng</div>
            </div>
            <div className="text-center hover-scale">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 gradient-text">50K+</div>
              <div className="text-gray-600 mt-2">Đơn hàng/tháng</div>
            </div>
            <div className="text-center hover-scale">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 gradient-text">30%</div>
              <div className="text-gray-600 mt-2">Tiết kiệm thời gian</div>
            </div>
            <div className="text-center hover-scale">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 gradient-text">99.9%</div>
              <div className="text-gray-600 mt-2">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-white to-orange-50 py-20 md:py-32" id="features">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
                Tính năng nổi bật
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Tại sao nên chọn Quét là xong?
              </h2>
              <p className="max-w-3xl text-gray-600 text-lg leading-relaxed mx-auto">
                Giải pháp toàn diện giúp tối ưu quy trình phục vụ và nâng cao trải nghiệm khách hàng
              </p>
            </div>
          </div>
          <div
            ref={featuresAnimation.ref}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
          >
            {[
              {
                icon: Clock,
                title: "Giảm 30% thời gian phục vụ",
                desc: "Khách hàng tự gọi món, không cần chờ nhân viên. Tăng tốc độ phục vụ và xoay bàn nhanh hơn.",
              },
              {
                icon: CheckCircle,
                title: "Loại bỏ sai sót đơn hàng",
                desc: "Khách hàng tự chọn món trực tiếp, giảm thiểu 95% sai sót trong quá trình ghi nhận đơn hàng.",
              },
              {
                icon: Users,
                title: "Tối ưu nhân sự",
                desc: "Giảm 40% nhân viên phục vụ, tập trung vào chất lượng món ăn và trải nghiệm khách hàng.",
              },
              {
                icon: QrCode,
                title: "Không cần cài app",
                desc: "Khách hàng chỉ cần quét QR code bằng camera điện thoại, truy cập ngay lập tức.",
              },
              {
                icon: TrendingUp,
                title: "Tăng doanh thu 25%",
                desc: "Gợi ý món ăn thông minh, chương trình khuyến mãi tự động giúp tăng giá trị đơn hàng.",
              },
              {
                icon: Shield,
                title: "Bảo mật tuyệt đối",
                desc: "Mã hóa SSL 256-bit, tuân thủ chuẩn PCI DSS, bảo vệ thông tin khách hàng và thanh toán.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group flex flex-col items-center space-y-4 rounded-2xl border bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-500 hover-lift hover-glow ${featuresAnimation.visibleItems.includes(index) ? "animate-fade-in-scale" : "opacity-0 scale-95"
                  }`}
              >
                <div className="rounded-full bg-orange-100 p-4 group-hover:bg-orange-200 transition-colors duration-300 hover-rotate">
                  <feature.icon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-center">{feature.title}</h3>
                <p className="text-center text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20 md:py-32" id="how-it-works">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
                Quy trình hoạt động
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Chỉ 3 bước đơn giản</h2>
              <p className="max-w-3xl text-gray-600 text-lg leading-relaxed mx-auto">
                Quy trình tối ưu, dễ sử dụng cho cả nhà hàng và khách hàng
              </p>
            </div>
          </div>
          <div ref={stepsAnimation.ref} className="grid grid-cols-1 gap-12 md:grid-cols-3 max-w-6xl mx-auto">
            {[
              {
                step: "1",
                title: "Quét mã QR",
                desc: "Khách hàng mở camera điện thoại, quét mã QR trên bàn ăn hoặc từ website nhà hàng để truy cập menu.",
              },
              {
                step: "2",
                title: "Chọn món và đặt hàng",
                desc: "Duyệt menu với hình ảnh đẹp mắt, chọn món ăn, tùy chỉnh yêu cầu đặc biệt và xác nhận đơn hàng.",
              },
              {
                step: "3",
                title: "Nhận món và thanh toán",
                desc: "Theo dõi trạng thái đơn hàng real-time, nhận món khi sẵn sàng và thanh toán linh hoạt.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center space-y-6 text-center relative transition-all duration-700 ${stepsAnimation.visibleItems.includes(index) ? "animate-slide-in-bottom" : "opacity-0 translate-y-8"
                  }`}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-3xl font-bold text-white shadow-lg hover-scale animate-pulse-slow">
                  {step.step}
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 -right-6 w-12 h-0.5 bg-gradient-to-r from-orange-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
                Khách hàng nói gì
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Được tin dùng bởi 500+ nhà hàng
              </h2>
            </div>
          </div>
          <div ref={testimonialsAnimation.ref} className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {[
              {
                quote:
                  "Quét là xong đã giúp nhà hàng chúng tôi tăng hiệu quả phục vụ 40%. Khách hàng rất thích sự tiện lợi và không cần chờ đợi.",
                name: "Nguyễn Văn A",
                role: "Chủ nhà hàng Sài Gòn",
              },
              {
                quote:
                  "Doanh thu tăng 25% sau khi sử dụng Quét là xong. Hệ thống gợi ý món ăn rất thông minh và hiệu quả.",
                name: "Trần Thị B",
                role: "Quản lý chuỗi nhà hàng",
              },
              {
                quote: "Triển khai nhanh chóng, dễ sử dụng. Đội ngũ hỗ trợ rất nhiệt tình và chuyên nghiệp.",
                name: "Lê Văn C",
                role: "Chủ quán cà phê",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`rounded-2xl bg-white p-8 shadow-sm border hover-lift hover-glow transition-all duration-500 ${testimonialsAnimation.visibleItems.includes(index) ? "animate-fade-in-scale" : "opacity-0 scale-95"
                  }`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 hover-scale" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 animate-pulse-slow"></div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 py-20 md:py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 md:px-6 relative max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-8 text-center animate-fade-in-up">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl animate-fade-in-scale">
                Sẵn sàng chuyển đổi số?
              </h2>
              <p className="max-w-3xl text-xl leading-relaxed text-orange-100 mx-auto animate-fade-in-up stagger-1">
                Tham gia cùng 500+ nhà hàng đã tin dùng Quét là xong. Dùng thử miễn phí 14 ngày, không cần thẻ tín dụng.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-2">
              <Link href="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold shadow-lg w-full sm:w-auto hover-lift hover-glow"
                >
                  Đăng ký miễn phí
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold shadow-lg w-full sm:w-auto hover-lift hover-glow"
                >
                  Liên hệ tư vấn
                </Button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-8 pt-8 animate-fade-in-up stagger-3">
              <div className="text-center hover-scale">
                <div className="text-2xl font-bold">14 ngày</div>
                <div className="text-orange-200">Dùng thử miễn phí</div>
              </div>
              <div className="text-center hover-scale">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-orange-200">Hỗ trợ khách hàng</div>
              </div>
              <div className="text-center hover-scale">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-orange-200">Thời gian hoạt động</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <script src="https://subbot.io.vn/widget.js" api-key="8nFF17h26vdvcMyljmgHZtDCJWW4xFLy"></script>
    </div>
  )
}
