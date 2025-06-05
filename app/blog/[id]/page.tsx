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
    title: "10 Xu hướng công nghệ nhà hàng sẽ thống trị năm 2024",
    content: `
      <p>Ngành công nghiệp nhà hàng đang trải qua một cuộc cách mạng số hóa mạnh mẽ. Với sự phát triển của công nghệ, các nhà hàng đang tìm cách tối ưu hóa hoạt động và nâng cao trải nghiệm khách hàng.</p>
      
      <h2>1. Menu QR Code - Xu hướng không thể thiếu</h2>
      <p>Menu QR code đã trở thành tiêu chuẩn mới trong ngành F&B. Không chỉ giúp giảm chi phí in ấn, menu QR còn cho phép cập nhật thông tin món ăn theo thời gian thực và cung cấp trải nghiệm tương tác phong phú cho khách hàng.</p>
      
      <h2>2. Hệ thống đặt món tự động</h2>
      <p>Việc tự động hóa quy trình đặt món giúp giảm thiểu sai sót và tăng tốc độ phục vụ. Khách hàng có thể tự đặt món thông qua điện thoại mà không cần chờ đợi nhân viên.</p>
      
      <h2>3. Thanh toán không tiếp xúc</h2>
      <p>Thanh toán qua ví điện tử, thẻ contactless và QR code đang ngày càng phổ biến, đặc biệt sau đại dịch COVID-19.</p>
      
      <h2>4. Phân tích dữ liệu khách hàng</h2>
      <p>Việc thu thập và phân tích dữ liệu khách hàng giúp nhà hàng hiểu rõ hơn về sở thích, thói quen tiêu dùng để đưa ra các chiến lược kinh doanh phù hợp.</p>
      
      <h2>5. Trí tuệ nhân tạo trong dự đoán nhu cầu</h2>
      <p>AI giúp dự đoán nhu cầu nguyên liệu, tối ưu hóa menu và cá nhân hóa trải nghiệm cho từng khách hàng.</p>
    `,
    excerpt:
      "Khám phá những xu hướng công nghệ mới nhất đang thay đổi ngành F&B và cách SmartQR Dine dẫn đầu cuộc cách mạng số hóa.",
    image: "/placeholder.svg?height=400&width=800",
    author: "Nguyễn Văn A",
    date: "15 Tháng 1, 2024",
    category: "Công nghệ",
    readTime: "5 phút đọc",
    tags: ["QR Code", "Công nghệ", "Nhà hàng", "Số hóa"],
  }

  const relatedPosts = [
    {
      id: 2,
      title: "Cách tăng doanh thu nhà hàng 30% với QR Code Menu",
      image: "/placeholder.svg?height=200&width=300",
      date: "12 Tháng 1, 2024",
    },
    {
      id: 3,
      title: "Hướng dẫn thiết lập hệ thống đặt món thông minh",
      image: "/placeholder.svg?height=200&width=300",
      date: "10 Tháng 1, 2024",
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
