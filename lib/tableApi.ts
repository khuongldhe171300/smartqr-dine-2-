export interface TableOrderInfo {
    orderId: number;
    customerName: string;
    status: string;
    createdAt: string;
}

export interface RestaurantTable {
    tableId: number;
    tableNumber: number;
    capacity: number;
    location: string;
    status: string;
    qrcodeUrl: string;
    qrcodeData: string;
    createdAt: string;
    updatedAt: string;
    currentOrder?: TableOrderInfo | null;
}

export async function fetchRestaurantTables(): Promise<RestaurantTable[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Tables`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "ngrok-skip-browser-warning": "true"
        },
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Không thể tải danh sách bàn");
    }

    return res.json(); // Trả về mảng RestaurantTable[]
}

export async function addTable(formData: FormData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Tables`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "ngrok-skip-browser-warning": "true"
        },
        body: formData,
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Không thể thêm bàn");
    }

    return res.json(); // { message, itemId }
}
