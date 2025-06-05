import Header from "@/components/header"
import Footer from "@/components/footer"
import { CheckCircle, QrCode, Smartphone, BarChart4, Clock, CreditCard } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Tính năng SmartQR Dine</h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Khám phá đầy đủ các tính năng giúp tối ưu hóa quy trình phục vụ và tăng trải nghiệm khách hàng
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Features */}
      <section className="bg-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                Dành cho khách hàng
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Trải nghiệm đặt món tuyệt vời</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Các tính năng giúp khách hàng có trải nghiệm đặt món dễ dàng và thuận tiện
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col space-y-4">
              <div className="rounded-full bg-orange-100 p-3 w-12 h-12 flex items-center justify-center">
                <QrCode className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold">Quét mã QR đơn giản</h3>
              <p className="text-gray-500">
                Khách hàng chỉ cần quét mã QR đặt trên bàn là có thể xem menu và đặt món ngay lập tức.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="rounded-full bg-orange-100 p-3 w-12 h-12 flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold">Không cần cài ứng dụng</h3>
              <p className="text-gray-500">
                Hoạt động trên trình duyệt web, không yêu cầu tải và cài đặt ứng dụng phức tạp.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="rounded-full bg-orange-100 p-3 w-12 h-12 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold">Tùy chỉnh món ăn</h3>
              <p className="text-gray-500">
                Dễ dàng tùy chỉnh yêu cầu đặc biệt cho món ăn như độ cay, không hành, thêm phần...
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="rounded-full bg-orange-100 p-3 w-12 h-12 flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold">Theo dõi trạng thái</h3>
              <p className="text-gray-500">
                Theo dõi trạng thái đơn hàng theo thời gian thực: đã nhận, đang chế biến, đã hoàn thành.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="rounded-full bg-orange-100 p-3 w-12 h-12 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold">Thanh toán linh hoạt</h3>
              <p className="text-gray-500">
                Hỗ trợ nhiều phương thức thanh toán: tiền mặt, thẻ, ví điện tử, chuyển khoản ngân hàng.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="rounded-full bg-orange-100 p-3 w-12 h-12 flex items-center justify-center">
                <BarChart4 className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold">Đánh giá trải nghiệm</h3>
              <p className="text-gray-500">
                Khách hàng có thể đánh giá món ăn và dịch vụ ngay trên hệ thống sau khi dùng bữa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Features */}
      <section className="bg-orange-50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                Dành cho nhà hàng
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Quản lý hiệu quả, tăng doanh thu</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Các tính năng giúp nhà hàng tối ưu quy trình, giảm chi phí và tăng doanh thu
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
            <div className="flex flex-col space-y-4 rounded-lg border bg-white p-6">
              <h3 className="text-xl font-bold">Quản lý menu linh hoạt</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Cập nhật menu theo thời gian thực</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Thêm/xóa món, điều chỉnh giá nhanh chóng</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Phân loại món ăn theo danh mục</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Đánh dấu món đặc biệt, món mới, món bán chạy</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-4 rounded-lg border bg-white p-6">
              <h3 className="text-xl font-bold">Quản lý đơn hàng hiệu quả</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Nhận đơn hàng tự động, không cần ghi chép</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Phân loại đơn theo trạng thái, bàn, thời gian</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Thông báo đơn mới cho nhà bếp</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Lịch sử đơn hàng chi tiết</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-4 rounded-lg border bg-white p-6">
              <h3 className="text-xl font-bold">Báo cáo và phân tích</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Thống kê doanh thu theo ngày, tuần, tháng</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Phân tích món ăn bán chạy</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Báo cáo thời gian phục vụ trung bình</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Phân tích đánh giá của khách hàng</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-4 rounded-lg border bg-white p-6">
              <h3 className="text-xl font-bold">Marketing và khách hàng</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Chương trình khuyến mãi, mã giảm giá</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Hệ thống tích điểm, khách hàng thân thiết</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Gửi thông báo, ưu đãi qua email/SMS</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Phân tích hành vi khách hàng</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
