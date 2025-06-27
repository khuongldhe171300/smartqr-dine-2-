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
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation"

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

  const featuredAnimation = useScrollAnimation()
  const categoriesAnimation = useScrollAnimation()
  const postsAnimation = useStaggeredAnimation(9, 100)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "ngrok-skip-browser-warning": "true",
        }

        const [featuredRes, listRes, categoryRes, tagRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Blog/top-viewed`, { headers }),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Blog/GetAll`, { headers }),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Blog/categories-blog`, { headers }),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Blog/tags-blog`, { headers }),
        ])

        setFeaturedPost(featuredRes.data)
        setBlogPosts(listRes.data)
        setCategories(categoryRes.data)

        const categoryMap = Object.fromEntries(categoryRes.data.map((c: any) => [c.categoryId, c.name]))
        const tagMap = Object.fromEntries(tagRes.data.map((t: any) => [t.tagId, t.name]))

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
    ? blogPosts.filter((post) => JSON.parse(post.categoryIds || "[]").includes(selectedCategoryId))
    : blogPosts

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Featured Post */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Bài viết nổi bật</h2>
          </div>
          {featuredPost && (
            <div
              ref={featuredAnimation.ref}
              className={`transition-all duration-1000 ${featuredAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <Card className="overflow-hidden shadow-lg hover-lift hover-glow">
                <div className="block lg:hidden">
                  <div className="relative w-full h-64">
                    <Image
                      src={featuredPost.featuredImageUrl || "/placeholder.svg"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-4 animate-fade-in-up stagger-1">
                      <Badge variant="outline" className="hover-scale">
                        {getCategoryName(featuredPost.categoryIds) || "Chưa phân loại"}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-1 h-4 w-4" />
                        {featuredPost.publishedAt?.split("T")[0]}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="mr-1 h-4 w-4" />
                        {featuredPost.author || "Tác giả nặc danh"}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4 leading-tight animate-fade-in-up stagger-2">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3 animate-fade-in-up stagger-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4 animate-fade-in-up stagger-4">
                      {getTagNames(featuredPost.tagIds).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs hover-scale">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between animate-fade-in-up stagger-5">
                      <span className="text-xs text-gray-500">Lượt xem: {featuredPost.viewCount || "0"}</span>
                      <Link href={`/blog/${featuredPost.postId}`}>
                        <Button className="bg-orange-500 hover:bg-orange-600 hover-lift hover-glow">
                          Đọc tiếp <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout - Side by side */}
                <div className="hidden lg:flex">
                  <div className="flex-1 relative min-h-[400px]">
                    <Image
                      src={featuredPost.featuredImageUrl || "/placeholder.svg"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="50vw"
                    />
                  </div>
                  <div className="flex-1 p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-4 mb-4 animate-fade-in-up stagger-1">
                      <Badge variant="outline" className="hover-scale">
                        {getCategoryName(featuredPost.categoryIds) || "Chưa phân loại"}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-1 h-4 w-4" />
                        {featuredPost.publishedAt?.split("T")[0]}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="mr-1 h-4 w-4" />
                        {featuredPost.author || "Tác giả nặc danh"}
                      </div>
                    </div>
                    <h3 className="text-2xl xl:text-3xl font-bold mb-4 leading-tight animate-fade-in-up stagger-2">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-base leading-relaxed animate-fade-in-up stagger-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6 animate-fade-in-up stagger-4">
                      {getTagNames(featuredPost.tagIds).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs hover-scale">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between animate-fade-in-up stagger-5">
                      <span className="text-sm text-gray-500">Lượt xem: {featuredPost.viewCount || "0"}</span>
                      <Link href={`/blog/${featuredPost.postId}`}>
                        <Button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 hover-lift hover-glow">
                          Đọc tiếp <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Categories Filter */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div
            ref={categoriesAnimation.ref}
            className={`flex flex-wrap gap-2 transition-all duration-1000 ${categoriesAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <Button
              variant={selectedCategoryId === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategoryId(null)}
              className="mb-2 hover-lift animate-fade-in-up"
            >
              <Tag className="mr-2 h-3 w-3" />
              Tất cả
            </Button>
            {categories.map((category, index) => (
              <Button
                key={category.categoryId}
                variant={selectedCategoryId === category.categoryId ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategoryId(category.categoryId)}
                className="mb-2 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
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
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Bài viết mới nhất</h2>
          </div>
          <div ref={postsAnimation.ref} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <Card
                key={post.postId}
                className={`overflow-hidden hover:shadow-lg transition-all duration-500 flex flex-col hover-lift hover-glow ${postsAnimation.visibleItems.includes(index) ? "animate-fade-in-scale" : "opacity-0 scale-95"
                  }`}
              >
                <div className="relative w-full h-48">
                  <Image
                    src={post.featuredImageUrl || "/placeholder.svg?height=300&width=480"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <CardHeader className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs hover-scale">
                      {getCategoryName(post.categoryIds) || "Khác"}
                    </Badge>
                    <span className="text-xs text-gray-500">Lượt xem: {post.viewCount || "0"}</span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 leading-tight hover:text-orange-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-sm">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="mr-1 h-3 w-3" />
                      {post.author || "Admin"}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-1 h-3 w-3" />
                      {post.publishedAt?.split("T")[0]}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {getTagNames(post.tagIds)
                      .slice(0, 3)
                      .map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs hover-scale">
                          {tag}
                        </Badge>
                      ))}
                  </div>
                  <Link href={`/blog/${post.postId}`} className="block">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white hover-lift hover-glow">
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
