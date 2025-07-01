import axios from "axios"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import BlogHeaderActions from "@/components/BlogHeaderActions"

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const [postRes, categoryRes] = await Promise.all([
      axios.get(`https://api.quetlaxong.io.vn/api/Blog/${params.id}`),
      axios.get("https://api.quetlaxong.io.vn/api/Blog/categories-blog"),
    ])

    const post = postRes.data
    const categories = categoryRes.data

    if (!post) notFound()



    const categoryIds: number[] = JSON.parse(post.categoryIds || "[]")
    const categoryName =
      categories.find((cat: { categoryId: number; name: string }) => cat.categoryId === categoryIds[0])?.name || "Chưa có danh mục"
    const relatedPosts: any[] = [] // có thể fetch sau

    return (
      <div className="flex min-h-screen flex-col">
        <Header />

        {/* Header bài viết */}
        <section className="bg-white py-8">
          <div className="container px-4 md:px-6">
            <Link
              href="/blog"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại blog
            </Link>

            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-4 mb-6">
                <Badge variant="outline">{categoryName}</Badge>

                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1 h-4 w-4" />
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                    : "Không rõ ngày"}
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <User className="mr-1 h-4 w-4" />
                  {post.author || "Admin"}
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-1 h-4 w-4" />
                  {post.readTime || "5 phút đọc"}
                </div>
              </div>

              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                {post.title}
              </h1>

              <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>

              <BlogHeaderActions />
            </div>
          </div>
        </section>

        {/* Ảnh chính */}
        <section className="bg-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
                <Image
                  src={post.featuredImageUrl || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nội dung bài viết */}
        <section className="bg-white py-8">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .split("\n\n")
                      .map((para: string) => `<p>${para.trim()}</p>`)
                      .join(""),
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tác giả */}
        <section className="bg-gray-50 py-12">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-orange-500 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        {(post.author || "A").charAt(0)}
                      </span>
                    </div>
                    <div>
                      <CardTitle>{post.author || "Admin"}</CardTitle>
                      <CardDescription>
                        Chuyên gia công nghệ F&B với hơn 10 năm kinh nghiệm
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {(post.author || "Admin")} là một chuyên gia hàng đầu trong lĩnh vực công nghệ nhà hàng...
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Bài viết liên quan (placeholder) */}
        <section className="bg-white py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Bài viết liên quan</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">
                        {relatedPost.title}
                      </CardTitle>
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

        <Footer />
      </div>
    )
  } catch (error) {
    console.error("Lỗi khi fetch blog:", error)
    notFound()
  }
}
