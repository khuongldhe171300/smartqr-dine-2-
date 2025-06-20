import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, User, Clock, Share2, BookmarkPlus, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // Mock data - trong thực tế sẽ fetch từ database
  const post = {
    id: 1,
    title: "Vì sao “Quét Là Xong” phù hợp với nhà hàng vừa và lớn?",
    content: `
     <p>Ngành công nghiệp nhà hàng đang trải qua một cuộc cách mạng số hóa mạnh mẽ. Với sự phát triển của công nghệ, các nhà hàng đang tìm cách tối ưu hóa hoạt động và nâng cao trải nghiệm khách hàng.</p>

<h2>1. Giảm tải cho nhân viên – Duy trì hiệu suất cao giờ cao điểm</h2>
<p>Ở các nhà hàng quy mô lớn, chỉ cần 5–10 bàn gọi món cùng lúc là nhân viên đã dễ bị quá tải. Với giải pháp “Quét Là Xong”, khách hàng chủ động xem menu và gọi món qua QR code. Đơn hàng được chuyển trực tiếp đến bếp, giảm sai sót truyền đạt và giúp nhân viên tập trung phục vụ, kiểm tra chất lượng. Nhờ đó, nhà hàng duy trì hiệu suất cao mà không cần tuyển thêm người.</p>

<h2>2. Tăng tốc độ phục vụ – Trải nghiệm khách hàng mượt mà hơn</h2>
<p>Khách hàng không còn phải chờ đợi menu giấy, nhân viên ghi order hay xếp hàng thanh toán. Tất cả được thực hiện nhanh chóng ngay trên smartphone với một mã QR duy nhất. Từ đặt món, thanh toán, đến theo dõi trạng thái đơn hàng – mọi thao tác chỉ trong vài chạm, mang đến trải nghiệm hiện đại và tiết kiệm thời gian.</p>

<h2>3. Quản lý đơn hàng và doanh thu theo thời gian thực</h2>
<p>Các nhà hàng lớn thường gặp khó khăn khi kiểm soát doanh thu, đánh giá hiệu suất nhân viên và xác định món bán chạy. “Quét Là Xong” cung cấp dashboard quản lý real-time, báo cáo doanh thu theo ca/ngày/tháng, và thống kê chi tiết từng đơn hàng. Nhờ đó, chủ quán có thể ra quyết định chính xác, kịp thời và dễ dàng mở rộng quy mô.</p>

<h2>4. Tích hợp ưu đãi – Tăng khả năng giữ chân khách hàng</h2>
<p>“Quét Là Xong” giúp các nhà hàng triển khai linh hoạt các chương trình ưu đãi như khuyến mãi giờ vàng, combo theo mùa, hay chương trình thành viên. Hệ thống có thể tự động hiển thị ưu đãi theo từng bàn, từng khung giờ; gợi ý combo thông minh khi khách gọi món, tích điểm không cần thẻ cứng – tất cả được số hóa hoàn toàn.</p>

<h2>5. Dễ dàng mở rộng và quản lý tập trung nhiều chi nhánh</h2>
<p>Giải pháp cho phép các chuỗi nhà hàng hoặc mô hình nhượng quyền sử dụng chung một hệ thống. Chủ quán có thể quản lý toàn bộ chi nhánh từ xa qua một tài khoản duy nhất, đồng bộ menu, chương trình ưu đãi và kiểm soát hoạt động mọi lúc, mọi nơi.</p>

    `,
    excerpt:
      "Vì sao “Quét là Xong” phù hợp với nhà hàng vừa và lớn?",
    image: "https://photo2.tinhte.vn/data/attachment-files/2023/04/6395149_cover_qr-code.jpg?height=400&width=800",
    author: "Admin",
    date: "14 Tháng 6, 2025",
    category: "QR Menu",
    readTime: "5 phút đọc",
    tags: ["QR Code", "Công nghệ", "Nhà hàng", "Số hóa"],
  }

  const relatedPosts = [
    {
      id: 2,
      title: "Top 5 khó khăn khiến nhà hàng nhỏ chưa thể số hoá",
      image: "https://i.ibb.co/x8t8DGTx/06d79ca3-90f1-4e7d-843b-70fb7fdbede2.jpg?height=200&width=300",
      date: "17 Tháng 6, 2025",
    },
    {
      id: 3,
      title: "Hướng Dẫn Sử Dụng QR Menu Cho Nhà Hàng",
      image: "https://image.plo.vn/w1000/Uploaded/2025/vrwqqxjwp/2022_12_08/quet-qr-code-1949.jpg.webp?height=200&width=300",
      date: "05 Tháng 6, 2026",
    },
  ]

  if (!post) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Article Header */}
      <section className="bg-white py-8">
        <div className="container px-4 md:px-6">
          <Link href="/blog" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại blog
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-6">
              <Badge variant="outline">{post.category}</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-1 h-4 w-4" />
                {post.date}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <User className="mr-1 h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-1 h-4 w-4" />
                {post.readTime}
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">{post.title}</h1>

            <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>

            <div className="flex items-center space-x-4 mb-8">
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Chia sẻ
              </Button>
              <Button variant="outline">
                <BookmarkPlus className="mr-2 h-4 w-4" />
                Lưu bài viết
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white py-8">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="bg-gray-50 py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{post.author.charAt(0)}</span>
                  </div>
                  <div>
                    <CardTitle>{post.author}</CardTitle>
                    <CardDescription>Chuyên gia công nghệ F&B với hơn 10 năm kinh nghiệm trong ngành</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {post.author} là một chuyên gia hàng đầu trong lĩnh vực công nghệ nhà hàng. Với kinh nghiệm phong phú
                  trong việc tư vấn và triển khai các giải pháp số hóa cho hàng trăm nhà hàng trên toàn quốc.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="bg-white py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{relatedPost.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        {relatedPost.date}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/blog/${relatedPost.id}`}>
                      <Button variant="outline" className="w-full">
                        Đọc thêm <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-600 py-16 text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Sẵn sàng áp dụng công nghệ cho nhà hàng của bạn?</h2>
            <p className="text-xl mb-8">Hãy để SmartQR Dine giúp bạn số hóa nhà hàng và tăng doanh thu ngay hôm nay</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button className="bg-white text-orange-600 hover:bg-orange-100">Dùng thử miễn phí</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-orange-700">
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
