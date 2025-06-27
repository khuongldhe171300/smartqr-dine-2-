// Trang AdminBlogs.tsx đầy đủ — popup thêm/sửa có select danh mục & tag từ API
"use client"

import AdminSidebar from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Search, PlusCircle, Eye, Edit2, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

interface BlogPost {
  postId: number
  title: string
  excerpt: string
  publishedAt: string
  viewCount: number
  author?: string
  categoryIds: string
  tagIds: string
  status: "published" | "draft"
}

export default function AdminBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    featuredImageURL: "",
    isPublished: false,
    publishedAt: "",
    categoryIDs: "[]",
    tagIDs: "[]"
  })
  const [categories, setCategories] = useState<{ categoryId: number, name: string }[]>([])
  const [tags, setTags] = useState<{ tagId: number, name: string }[]>([])

  const loadPosts = () => {
    axios.get("https://localhost:7082/api/Blog/GetAll")
      .then(res => setPosts(res.data))
      .catch(err => console.error("Lỗi khi lấy blog:", err))
  }

  const loadSelectData = () => {
    axios.get("https://localhost:7082/api/Blog/categories-blog").then(res => setCategories(res.data))
    axios.get("https://localhost:7082/api/Blog/tags-blog").then(res => setTags(res.data))
  }

  useEffect(() => {
    loadPosts()
    loadSelectData()
  }, [])

  const openAddForm = () => {
    setEditingId(null)
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      featuredImageURL: "",
      isPublished: false,
      publishedAt: "",
      categoryIDs: "[]",
      tagIDs: "[]"
    })
    setIsDialogOpen(true)
  }

  const openEditForm = (id: number) => {
    setEditingId(id)
    loadSelectData()
    axios.get(`https://localhost:7082/api/Blog/${id}`)
      .then(res => {
        const d = res.data
        setFormData({
          title: d.title,
          excerpt: d.excerpt,
          content: d.content,
          featuredImageURL: d.featuredImageUrl,
          isPublished: d.isPublished,
          publishedAt: d.publishedAt,
          categoryIDs: d.categoryIds,
          tagIDs: d.tagIds
        })
        setIsDialogOpen(true)
      })
  }

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`https://localhost:7082/api/Blog/${editingId}`, {
          postId: editingId,
          slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
          viewCount: 0,
          updatedAt: new Date().toISOString(),
          ...formData
        })
        alert("Cập nhật thành công")
      } else {
        await axios.post("https://localhost:7082/api/Blog/create", {
          title: formData.title,
          slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
          content: formData.content,
          featuredImageURL: formData.featuredImageURL,
          excerpt: formData.excerpt,
          isPublished: formData.isPublished,
          publishedAt: formData.publishedAt ? new Date(formData.publishedAt).toISOString() : null,
          categoryIDs: formData.categoryIDs,
          tagIDs: formData.tagIDs
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })

        alert("Tạo mới thành công")
      }
      loadPosts()
      setIsDialogOpen(false)
    } catch (err) {
      console.error("Lỗi khi gửi dữ liệu:", err)
      alert("Đã xảy ra lỗi")
    }
  }

  const publishedCount = posts.filter(p => p.status === "published").length
  const draftCount = posts.filter(p => p.status === "draft").length

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Quản lý bài viết</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={openAddForm}><PlusCircle className="mr-2 h-4 w-4" /> Thêm bài viết</Button>
              <Button className="bg-orange-500 hover:bg-orange-600" onClick={loadPosts}>Làm mới</Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
            <Card><CardHeader><CardTitle>Tổng bài viết</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{posts.length}</div></CardContent></Card>
            <Card><CardHeader><CardTitle>Đã xuất bản</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{publishedCount}</div></CardContent></Card>
            <Card><CardHeader><CardTitle>Bản nháp</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{draftCount}</div></CardContent></Card>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="published">Đã xuất bản</TabsTrigger>
              <TabsTrigger value="draft">Bản nháp</TabsTrigger>
            </TabsList>

            {["all", "published", "draft"].map(tab => (
              <TabsContent key={tab} value={tab}>
                <Card><CardHeader><CardTitle>Danh sách bài viết</CardTitle></CardHeader><CardContent>
                  <Table><TableHeader><TableRow>
                    <TableHead>ID</TableHead><TableHead>Tiêu đề</TableHead><TableHead>Tác giả</TableHead><TableHead>Lượt xem</TableHead><TableHead>Ngày đăng</TableHead><TableHead>Trạng thái</TableHead><TableHead className="text-right">Thao tác</TableHead>
                  </TableRow></TableHeader><TableBody>
                      {posts.filter(p => tab === "all" || p.status === tab).map(post => (
                        <TableRow key={post.postId}>
                          <TableCell>{post.postId}</TableCell>
                          <TableCell>{post.title}</TableCell>
                          <TableCell>{post.author || "Admin"}</TableCell>
                          <TableCell>{post.viewCount}</TableCell>
                          <TableCell>{post.publishedAt?.split("T")[0]}</TableCell>
                          <TableCell><Badge className={post.publishedAt === "1" ? "bg-green-500" : "bg-yellow-500"}>{post.publishedAt === "published" ? "Đã xuất bản" : "Bản nháp"}</Badge></TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Link href={`/blog/${post.postId}`}><Button size="sm" variant="outline"><Eye className="h-4 w-4 mr-1" />Xem</Button></Link>
                              <Button size="sm" variant="outline" onClick={() => openEditForm(post.postId)}><Edit2 className="h-4 w-4 mr-1" />Sửa</Button>
                              <Button size="sm" variant="outline" className="text-red-600"><Trash2 className="h-4 w-4 mr-1" />Xoá</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody></Table></CardContent></Card>
              </TabsContent>
            ))}
          </Tabs>
        </main>

        {/* Pop-up thêm/sửa */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input name="title" placeholder="Tiêu đề" value={formData.title} onChange={handleChange} />
              <Textarea name="excerpt" placeholder="Mô tả ngắn" value={formData.excerpt} onChange={handleChange} />
              <Textarea name="content" placeholder="Nội dung" value={formData.content} onChange={handleChange} />
              <Input name="featuredImageURL" placeholder="URL ảnh đại diện" value={formData.featuredImageURL} onChange={handleChange} />
              <Input name="publishedAt" type="datetime-local" value={formData.publishedAt} onChange={handleChange} />
              <label className="flex items-center space-x-2">
                <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} />
                <span>Xuất bản</span>
              </label>

              {/* Danh mục */}
              <label className="block">
                <span className="text-sm font-medium">Danh mục</span>
                <select
                  multiple
                  name="categoryIDs"
                  className="w-full border rounded px-3 py-2 mt-1 min-h-[80px]"
                  value={JSON.parse(formData.categoryIDs || "[]")}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    categoryIDs: JSON.stringify(Array.from(e.target.selectedOptions).map(opt => Number(opt.value)))
                  }))}
                >
                  {categories.map(c => (
                    <option key={c.categoryId} value={c.categoryId}>{c.name}</option>
                  ))}
                </select>
              </label>

              {/* Tags */}
              <label className="block">
                <span className="text-sm font-medium">Thẻ (Tags)</span>
                <select
                  multiple
                  name="tagIDs"
                  className="w-full border rounded px-3 py-2 mt-1 min-h-[80px]"
                  value={JSON.parse(formData.tagIDs || "[]")}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    tagIDs: JSON.stringify(Array.from(e.target.selectedOptions).map(opt => Number(opt.value)))
                  }))}
                >
                  {tags.map(t => (
                    <option key={t.tagId} value={t.tagId}>{t.name}</option>
                  ))}
                </select>
              </label>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Hủy</Button>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={handleSubmit}>
                  {editingId ? "Cập nhật" : "Tạo mới"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
