import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPage() {
  const featuredPost = {
    id: 1,
    title: "10 Xu hướng công nghệ nhà hàng sẽ thống trị năm 2024",
    excerpt:
      "Khám phá những xu hướng công nghệ mới nhất đang thay đổi ngành F&B và cách SmartQR Dine dẫn đầu cuộc cách mạng số hóa.",
    image: "/placeholder.svg?height=400&width=600",
    author: "Nguyễn Văn A",
    date: "15 Tháng 1, 2024",
    category: "Công nghệ",
    readTime: "5 phút đọc",
  }

  const blogPosts = [
    {
      id: 2,
      title: "Cách tăng doanh thu nhà hàng 30% với QR Code Menu",
      excerpt: "Hướng dẫn chi tiết cách sử dụng menu QR code để tối ưu hóa trải nghiệm khách hàng và tăng doanh thu.",
      image: "/placeholder.svg?height=200&width=300",
      author: "Trần Thị B",
      date: "12 Tháng 1, 2024",
      category: "Kinh doanh",
      readTime: "7 phút đọc",
    },
    {
      id: 3,
      title: "Hướng dẫn thiết lập hệ thống đặt món thông minh",
      excerpt: "Từng bước thiết lập và tối ưu hóa hệ thống đặt món qua QR code cho nhà hàng của bạn.",
      image: "/placeholder.svg?height=200&width=300",
      author: "Lê Văn C",
      date: "10 Tháng 1, 2024",
      category: "Hướng dẫn",
      readTime: "10 phút đọc",
    },
    {
      id: 4,
      title: "Phân tích dữ liệu khách hàng: Chìa khóa thành công",
      excerpt: "Tìm hiểu cách sử dụng dữ liệu khách hàng để đưa ra quyết định kinh doanh thông minh.",
      image: "/placeholder.svg?height=200&width=300",
      author: "Phạm Thị D",
      date: "8 Tháng 1, 2024",
      category: "Phân tích",
      readTime: "6 phút đọc",
    },
    {
      id: 5,
      title: "Tối ưu hóa menu điện tử để tăng tỷ lệ chuyển đổi",
      excerpt: "Những mẹo thiết kế menu điện tử hiệu quả giúp khách hàng đặt món nhiều hơn.",
      image: "/placeholder.svg?height=200&width=300",
      author: "Hoàng Văn E",
      date: "5 Tháng 1, 2024",
      category: "Thiết kế",
      readTime: "8 phút đọc",
    },
    {
      id: 6,
      title: "Case Study: Nhà hàng ABC tăng 50% khách hàng",
      excerpt: "Câu chuyện thành công của nhà hàng ABC khi áp dụng giải pháp SmartQR Dine.",
      image: "/placeholder.svg?height=200&width=300",
      author: "Nguyễn Thị F",
      date: "3 Tháng 1, 2024",
      category: "Case Study",
      readTime: "12 phút đọc",
    },
    {
      id: 7,
      title: "Bảo mật dữ liệu trong hệ thống F&B số",
      excerpt: "Tầm quan trọng của bảo mật dữ liệu và cách SmartQR Dine bảo vệ thông tin khách hàng.",
      image: "/placeholder.svg?height=200&width=300",
      author: "Vũ Văn G",
      date: "1 Tháng 1, 2024",
      category: "Bảo mật",
      readTime: "9 phút đọc",
    },
  ]

  const categories = [
    "Tất cả",
    "Công nghệ",
    "Kinh doanh",
    "Hướng dẫn",
    "Phân tích",
    "Thiết kế",
    "Case Study",
    "Bảo mật",
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Blog SmartQR Dine</h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Khám phá những xu hướng mới nhất, mẹo kinh doanh và hướng dẫn chi tiết về công nghệ nhà hàng
              </p>
            </div>
            <div className="w-full max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Tìm kiếm bài viết..." className="pl-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="bg-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Bài viết nổi bật</h2>
          </div>
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 lg:p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge variant="outline">{featuredPost.category}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="mr-1 h-4 w-4" />
                    {featuredPost.author}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{featuredPost.readTime}</span>
                  <Link href={`/blog/${featuredPost.id}`}>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      Đọc tiếp <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button key={category} variant="outline" size="sm">
                <Tag className="mr-2 h-3 w-3" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="bg-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Bài viết mới nhất</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="mr-1 h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-1 h-3 w-3" />
                      {post.date}
                    </div>
                  </div>
                  <Link href={`/blog/${post.id}`} className="block mt-4">
                    <Button variant="outline" className="w-full">
                      Đọc thêm <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-orange-600 py-16 md:py-24 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Đăng ký nhận bài viết mới</h2>
              <p className="max-w-[600px] md:text-xl/relaxed">
                Nhận những bài viết mới nhất về công nghệ nhà hàng và mẹo kinh doanh qua email
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <div className="flex space-x-2">
                <Input placeholder="Nhập email của bạn" className="bg-white text-gray-900" />
                <Button className="bg-white text-orange-600 hover:bg-orange-100">Đăng ký</Button>
              </div>
              <p className="text-xs text-orange-100">
                Chúng tôi tôn trọng quyền riêng tư của bạn. Hủy đăng ký bất cứ lúc nào.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
