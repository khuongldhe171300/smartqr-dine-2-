"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import axios from "axios"

interface BlogPost {
  postId: number
  title: string
  excerpt: string
  content?: string
  featuredImageUrl: string
  publishedAt: string
  author?: string
  categoryIds: string
  tagIds: string
  viewCount: number
}

interface Category {
  categoryId: number
  name: string
}

export default function BlogPage() {
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [categoriesMap, setCategoriesMap] = useState<Record<number, string>>({})
  const [tagsMap, setTagsMap] = useState<Record<number, string>>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredRes, listRes, categoryRes, tagRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Blog/top-viewed`),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Blog/GetAll`),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Blog/categories-blog`),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Blog/tags-blog`)
        ])

        setFeaturedPost(featuredRes.data)
        setBlogPosts(listRes.data)
        setCategories(categoryRes.data)

        const categoryMap = Object.fromEntries(
          categoryRes.data.map((c: any) => [c.categoryId, c.name])
        )
        const tagMap = Object.fromEntries(
          tagRes.data.map((t: any) => [t.tagId, t.name])
        )

        setCategoriesMap(categoryMap)
        setTagsMap(tagMap)
      } catch (error) {
        console.error("Lỗi khi gọi API:", error)
      }
    }

    fetchData()
  }, [])

  const getCategoryName = (idsString: string): string => {
    try {
      return JSON.parse(idsString || "[]")
        .map((id: number) => categoriesMap[id])
        .filter(Boolean)
        .join(", ")
    } catch {
      return ""
    }
  }

  const getTagNames = (idsString: string): string[] => {
    try {
      return JSON.parse(idsString || "[]")
        .map((id: number) => tagsMap[id])
        .filter(Boolean)
    } catch {
      return []
    }
  }

  const filteredPosts = selectedCategoryId
    ? blogPosts.filter(post =>
      JSON.parse(post.categoryIds || "[]").includes(selectedCategoryId)
    )
    : blogPosts

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Featured Post */}
      <section className="bg-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Bài viết nổi bật</h2>
          </div>
          {featuredPost && (
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={featuredPost.featuredImageUrl || "/placeholder.svg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge variant="outline">{getCategoryName(featuredPost.categoryIds) || "Chưa phân loại"}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-1 h-4 w-4" />
                      {featuredPost.publishedAt?.split("T")[0]}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="mr-1 h-4 w-4" />
                      {featuredPost.author || "Tác giả nặc danh"}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {getTagNames(featuredPost.tagIds).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Lượt xem : {featuredPost.viewCount || "0"}</span>
                    <Link href={`/blog/${featuredPost.postId}`}>
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        Đọc tiếp <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Categories Filter */}
      <section className="bg-gray-50 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategoryId === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategoryId(null)}
            >
              <Tag className="mr-2 h-3 w-3" />
              Tất cả
            </Button>
            {categories.map((category) => (
              <Button
                key={category.categoryId}
                variant={selectedCategoryId === category.categoryId ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategoryId(category.categoryId)}
              >
                <Tag className="mr-2 h-3 w-3" />
                {category.name}
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
            {filteredPosts.map((post) => (
              <Card key={post.postId} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className=" ">
                  <Image
                    src={post.featuredImageUrl || "https://ibb.co/Fqm5K004"}
                    alt={post.title}
                    width={480}
                    height={300}

                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-2">
                    <Badge variant="outline">{getCategoryName(post.categoryIds) || "Khác"}</Badge>
                    <span className="text-xs text-gray-500">Lượt xem : {post.viewCount || "0"}</span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="mr-1 h-3 w-3" />
                      {post.author || "Admin"}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-1 h-3 w-3" />
                      {post.publishedAt?.split("T")[0]}
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {getTagNames(post.tagIds).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/blog/${post.postId}`} className="block mt-4">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      Đọc thêm <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
