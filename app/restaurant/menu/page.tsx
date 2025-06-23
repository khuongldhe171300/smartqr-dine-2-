"use client";

import { useEffect, useState } from "react";
import RestaurantSidebar from "@/components/restaurant-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, ImageIcon } from "lucide-react";
import { fetchMenuItems, addMenuItem } from "@/lib/menuApi";

interface MenuItem {
  itemId: number;
  categoryId: number;
  categoryName: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  imageUrl: string;
  preparationTime: number;
  calories: number;
  ingredients: string;
  allergenInfo: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  isFeatured: boolean;
  isAvailable: boolean;
  displayOrder: number;
  options: string;
  addons: string;
  additionalImages: string[];
  averageRating: number;
  reviewCount: number;
}

export default function RestaurantMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<{ categoryId: number; name: string }[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // State cho form thêm món
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryID, setCategoryID] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [preparationTime, setPreparationTime] = useState(0);
  const [calories, setCalories] = useState(0);
  const [ingredients, setIngredients] = useState("");
  const [allergenInfo, setAllergenInfo] = useState("");
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isSpicy, setIsSpicy] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  // Lỗi khi lấy danh mục
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const items = await fetchMenuItems();
        setMenuItems(items);
      } catch (err) {
        console.error("Lỗi tải menu:", err);
      }
    };
    loadMenu();
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Menu/categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "ngrok-skip-browser-warning": "true"
          },
        });
        if (!res.ok) throw new Error("Không thể tải danh mục món ăn");
        const data = await res.json();
        setCategories(data);
        setCategoryError("");
      } catch (err) {
        setCategories([]);
        setCategoryError("Chưa có danh mục món ăn");
      }
    };
    loadCategories();
  }, []);

  const handleAddMenuItem = async () => {
    try {
      const formData = new FormData();

      if (imageFile) {
        formData.append("ImageFile", imageFile);
      }

      formData.append("CategoryID", categoryID.toString());
      formData.append("Name", name);
      formData.append("Description", description || "");
      formData.append("Price", price.toString());
      formData.append("DiscountPrice", discountPrice?.toString());
      formData.append("PreparationTime", preparationTime?.toString());
      formData.append("Calories", calories?.toString());
      formData.append("Ingredients", ingredients || "");
      formData.append("AllergenInfo", allergenInfo || "");
      formData.append("IsVegetarian", isVegetarian ? "true" : "false");
      formData.append("IsVegan", isVegan ? "true" : "false");
      formData.append("IsGlutenFree", isGlutenFree ? "true" : "false");
      formData.append("IsSpicy", isSpicy ? "true" : "false");
      formData.append("IsFeatured", isFeatured ? "true" : "false");
      formData.append("IsAvailable", isAvailable ? "true" : "false");
      formData.append("DisplayOrder", "0");
      formData.append("Options", "[]");
      formData.append("Addons", "[]");

      const result = await addMenuItem(formData);
      alert(result.message);
      setShowAddDialog(false);
      location.reload();
    } catch (err: any) {
      alert("Lỗi: " + err.message);
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

  return (
    <div className="flex h-screen bg-gray-100">
      <RestaurantSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Menu</h1>
            <div className="flex items-center space-x-4">
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600" disabled={categories.length === 0}>
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm món mới
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Thêm món ăn mới</DialogTitle>
                    <DialogDescription>Điền thông tin chi tiết cho món ăn mới</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Tên món ăn</Label>
                        <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Nhập tên món ăn" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Giá (VND)</Label>
                        <Input id="price" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="0" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Danh mục</Label>
                      {categories.length === 0 && categoryError ? (
                        <div className="text-red-500 text-sm">{categoryError}</div>
                      ) : (
                        <Select onValueChange={val => setCategoryID(Number(val))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn danh mục" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.categoryId} value={category.categoryId.toString()}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Mô tả</Label>
                      <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Mô tả chi tiết về món ăn" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="discount">Giá khuyến mãi</Label>
                        <Input id="discount" type="number" value={discountPrice} onChange={e => setDiscountPrice(Number(e.target.value))} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prep">Thời gian chuẩn bị (phút)</Label>
                        <Input id="prep" type="number" value={preparationTime} onChange={e => setPreparationTime(Number(e.target.value))} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calories">Calories</Label>
                      <Input id="calories" type="number" value={calories} onChange={e => setCalories(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ingredients">Thành phần</Label>
                      <Textarea id="ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allergen">Thông tin dị ứng</Label>
                      <Textarea id="allergen" value={allergenInfo} onChange={e => setAllergenInfo(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch checked={isVegetarian} onCheckedChange={setIsVegetarian} />
                        <Label>Chay</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={isVegan} onCheckedChange={setIsVegan} />
                        <Label>Thuần chay</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={isGlutenFree} onCheckedChange={setIsGlutenFree} />
                        <Label>Không gluten</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={isSpicy} onCheckedChange={setIsSpicy} />
                        <Label>Cay</Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">Hình ảnh</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {imagePreviewUrl ? (
                          <img src={imagePreviewUrl} alt="preview" className="mx-auto h-40 object-cover rounded-md" />
                        ) : (
                          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        )}
                        <p className="mt-2 text-sm text-gray-500">Upload image</p>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setImageFile(file);
                              setImagePreviewUrl(URL.createObjectURL(file));
                            }
                          }}
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="available" checked={isAvailable} onCheckedChange={setIsAvailable} />
                      <Label htmlFor="available">Có sẵn</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="popular" checked={isFeatured} onCheckedChange={setIsFeatured} />
                      <Label htmlFor="popular">Món phổ biến</Label>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>Hủy</Button>
                    <Button
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={handleAddMenuItem}
                      disabled={categories.length === 0}
                    >
                      Thêm món
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        {/* Danh sách món ăn */}
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              {categories.length === 0 && categoryError && (
                <span className="ml-4 text-red-500 text-sm">{categoryError}</span>
              )}
              {categories.map((category) => (
                <TabsTrigger key={category.categoryId} value={category.categoryId.toString().toLowerCase()}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {menuItems.map((item) => (
                  <Card key={item.itemId} className="overflow-hidden">
                    <div className="relative">
                      <img src={item.imageUrl || "/placeholder.svg"} alt={item.name} className="h-48 w-full object-cover" />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        {item.isFeatured && <Badge className="bg-red-500">Phổ biến</Badge>}
                        <Badge variant={item.isAvailable ? "default" : "secondary"}>{item.isAvailable ? "Có sẵn" : "Hết hàng"}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-2xl font-bold text-orange-600">{formatCurrency(item.price)}</span>
                        <Badge variant="outline">{item.categoryName}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch checked={item.isAvailable} />
                          <span className="text-sm">Có sẵn</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                          <Button variant="outline" size="sm" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            {categories.map((category) => (
              <TabsContent key={category.categoryId} value={category.categoryId.toString().toLowerCase()}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {menuItems.filter(item => item.categoryName === category.name).map((item) => (
                    <Card key={item.itemId} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={`${item.imageUrl}`}
                          alt={item.name}
                          className="h-48 w-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex space-x-1">
                          {item.isFeatured && <Badge className="bg-red-500">Phổ biến</Badge>}
                          <Badge variant={item.isAvailable ? "default" : "secondary"}>{item.isAvailable ? "Có sẵn" : "Hết hàng"}</Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-2xl font-bold text-orange-600">{formatCurrency(item.price)}</span>
                          <Badge variant="outline">{item.categoryName}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch checked={item.isAvailable} />
                            <span className="text-sm">Có sẵn</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                            <Button variant="outline" size="sm" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
    </div>
  );
}
