// lib/menuApi.ts


export async function fetchMenuItems() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Menu/items`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Không thể tải danh sách món ăn");
    }

    return res.json(); // Trả về mảng MenuItem[]
}


interface AddMenuItemRequest {
    name: string;
    description: string;
    price: number;
    categoryID: number;
    imageURL?: string;
    restaurantID: number;
    discountPrice?: number | null;
    preparationTime?: number;
    calories?: number;
    ingredients?: string;
    allergenInfo?: string;
    isVegetarian?: boolean;
    isVegan?: boolean;
    isGlutenFree?: boolean;
    isSpicy?: boolean;
    isFeatured?: boolean;
    isAvailable?: boolean;
    displayOrder?: number;
    options?: string;
    addons?: string;
    additionalImages?: string[];
}

// lib/menuApi.ts
export async function addMenuItem(formData: FormData) {
    const res = await fetch("https://localhost:7082/api/Menu/items", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Không thể thêm món ăn");
    }

    return res.json(); // { message, itemId }
}

