import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, QrCode, Clock, Users, Star, TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
                <Zap className="mr-2 h-4 w-4" />
                Giải pháp đặt món thông minh #1 Việt Nam
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent">
                Quét là xong
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Hệ thống đặt món thông minh qua QR code cho nhà hàng. Giúp khách hàng gọi món ngay tại bàn và đặt hàng
                từ xa, <span className="font-semibold text-orange-600">không cần cài ứng dụng</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/demo">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Dùng thử miễn phí <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-orange-200 hover:border-orange-300 px-8 py-4 text-lg font-semibold"
                  >
                    Liên hệ tư vấn
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-orange-200 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-orange-300 border-2 border-white"></div>
                  </div>
                  <span className="text-sm text-gray-600">500+ nhà hàng tin dùng</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">4.9/5</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border-8 border-white bg-white shadow-2xl">
                <Image
                  src="https://sdmntprwestus2.oaiusercontent.com/files/00000000-1268-61f8-925f-850ed1fb43a4/raw?se=2025-06-05T00%3A06%3A57Z&sp=r&sv=2024-08-04&sr=b&scid=0eb9e8d8-530f-57c6-a7dc-dff53347b692&skoid=c156db82-7a33-468f-9cdd-06af263ceec8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-04T22%3A53%3A03Z&ske=2025-06-05T22%3A53%3A03Z&sks=b&skv=2024-08-04&sig=WcdNbrPwatTx3Q47iizigaQZ7TpQikgGIfEfmyItY7M%3D"
                  alt="SmartQR Dine Demo"
                  width={600}
                  height={600}
                  className="rounded-xl object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Miễn phí 14 ngày
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-b">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600">500+</div>
              <div className="text-gray-600 mt-2">Nhà hàng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600">50K+</div>
              <div className="text-gray-600 mt-2">Đơn hàng/tháng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600">30%</div>
              <div className="text-gray-600 mt-2">Tiết kiệm thời gian</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600">99.9%</div>
              <div className="text-gray-600 mt-2">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-white to-orange-50 py-20 md:py-32" id="features">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
                Tính năng nổi bật
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Tại sao nên chọn SmartQR Dine?
              </h2>
              <p className="max-w-3xl text-gray-600 text-lg leading-relaxed">
                Giải pháp toàn diện giúp tối ưu quy trình phục vụ và nâng cao trải nghiệm khách hàng
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group flex flex-col items-center space-y-4 rounded-2xl border bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="rounded-full bg-orange-100 p-4 group-hover:bg-orange-200 transition-colors">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold">Giảm 30% thời gian phục vụ</h3>
              <p className="text-center text-gray-600 leading-relaxed">
                Khách hàng tự gọi món, không cần chờ nhân viên. Tăng tốc độ phục vụ và xoay bàn nhanh hơn.
              </p>
            </div>
            <div className="group flex flex-col items-center space-y-4 rounded-2xl border bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="rounded-full bg-orange-100 p-4 group-hover:bg-orange-200 transition-colors">
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold">Loại bỏ sai sót đơn hàng</h3>
              <p className="text-center text-gray-600 leading-relaxed">
                Khách hàng tự chọn món trực tiếp, giảm thiểu 95% sai sót trong quá trình ghi nhận đơn hàng.
              </p>
            </div>
            <div className="group flex flex-col items-center space-y-4 rounded-2xl border bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="rounded-full bg-orange-100 p-4 group-hover:bg-orange-200 transition-colors">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold">Tối ưu nhân sự</h3>
              <p className="text-center text-gray-600 leading-relaxed">
                Giảm 40% nhân viên phục vụ, tập trung vào chất lượng món ăn và trải nghiệm khách hàng.
              </p>
            </div>
            <div className="group flex flex-col items-center space-y-4 rounded-2xl border bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="rounded-full bg-orange-100 p-4 group-hover:bg-orange-200 transition-colors">
                <QrCode className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold">Không cần cài app</h3>
              <p className="text-center text-gray-600 leading-relaxed">
                Khách hàng chỉ cần quét QR code bằng camera điện thoại, truy cập ngay lập tức.
              </p>
            </div>
            <div className="group flex flex-col items-center space-y-4 rounded-2xl border bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="rounded-full bg-orange-100 p-4 group-hover:bg-orange-200 transition-colors">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold">Tăng doanh thu 25%</h3>
              <p className="text-center text-gray-600 leading-relaxed">
                Gợi ý món ăn thông minh, chương trình khuyến mãi tự động giúp tăng giá trị đơn hàng.
              </p>
            </div>
            <div className="group flex flex-col items-center space-y-4 rounded-2xl border bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="rounded-full bg-orange-100 p-4 group-hover:bg-orange-200 transition-colors">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold">Bảo mật tuyệt đối</h3>
              <p className="text-center text-gray-600 leading-relaxed">
                Mã hóa SSL 256-bit, tuân thủ chuẩn PCI DSS, bảo vệ thông tin khách hàng và thanh toán.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20 md:py-32" id="how-it-works">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
                Quy trình hoạt động
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Chỉ 3 bước đơn giản</h2>
              <p className="max-w-3xl text-gray-600 text-lg leading-relaxed">
                Quy trình tối ưu, dễ sử dụng cho cả nhà hàng và khách hàng
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-6 text-center relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-3xl font-bold text-white shadow-lg">
                1
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Quét mã QR</h3>
                <p className="text-gray-600 leading-relaxed">
                  Khách hàng mở camera điện thoại, quét mã QR trên bàn ăn hoặc từ website nhà hàng để truy cập menu.
                </p>
              </div>
              <div className="hidden md:block absolute top-10 -right-6 w-12 h-0.5 bg-gradient-to-r from-orange-300 to-transparent"></div>
            </div>
            <div className="flex flex-col items-center space-y-6 text-center relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-3xl font-bold text-white shadow-lg">
                2
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Chọn món và đặt hàng</h3>
                <p className="text-gray-600 leading-relaxed">
                  Duyệt menu với hình ảnh đẹp mắt, chọn món ăn, tùy chỉnh yêu cầu đặc biệt và xác nhận đơn hàng.
                </p>
              </div>
              <div className="hidden md:block absolute top-10 -right-6 w-12 h-0.5 bg-gradient-to-r from-orange-300 to-transparent"></div>
            </div>
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-3xl font-bold text-white shadow-lg">
                3
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Nhận món và thanh toán</h3>
                <p className="text-gray-600 leading-relaxed">
                  Theo dõi trạng thái đơn hàng real-time, nhận món khi sẵn sàng và thanh toán linh hoạt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
                Khách hàng nói gì
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Được tin dùng bởi 500+ nhà hàng
              </h2>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm border">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "SmartQR Dine đã giúp nhà hàng chúng tôi tăng hiệu quả phục vụ 40%. Khách hàng rất thích sự tiện lợi và
                không cần chờ đợi."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-100"></div>
                <div>
                  <div className="font-semibold">Nguyễn Văn A</div>
                  <div className="text-sm text-gray-500">Chủ nhà hàng Sài Gòn</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm border">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "Doanh thu tăng 25% sau khi sử dụng SmartQR Dine. Hệ thống gợi ý món ăn rất thông minh và hiệu quả."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-100"></div>
                <div>
                  <div className="font-semibold">Trần Thị B</div>
                  <div className="text-sm text-gray-500">Quản lý chuỗi nhà hàng</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm border">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "Triển khai nhanh chóng, dễ sử dụng. Đội ngũ hỗ trợ rất nhiệt tình và chuyên nghiệp."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-100"></div>
                <div>
                  <div className="font-semibold">Lê Văn C</div>
                  <div className="text-sm text-gray-500">Chủ quán cà phê</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 py-20 md:py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Sẵn sàng chuyển đổi số?
              </h2>
              <p className="max-w-3xl text-xl leading-relaxed text-orange-100">
                Tham gia cùng 500+ nhà hàng đã tin dùng SmartQR Dine. Dùng thử miễn phí 14 ngày, không cần thẻ tín dụng.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold shadow-lg"
                >
                  Đăng ký miễn phí
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg font-semibold"
                >
                  Liên hệ tư vấn
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">14 ngày</div>
                <div className="text-orange-200">Dùng thử miễn phí</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-orange-200">Hỗ trợ khách hàng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-orange-200">Thời gian hoạt động</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
