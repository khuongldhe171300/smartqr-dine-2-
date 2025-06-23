export async function fetchRestaurantByOwner() {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Bạn chưa đăng nhập.");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/restaurants/owner`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Không thể lấy thông tin nhà hàng.");
    }

    return await res.json();
}
