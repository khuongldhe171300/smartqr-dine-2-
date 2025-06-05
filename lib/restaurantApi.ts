export async function fetchRestaurantByOwner() {
    const token = localStorage.getItem("token")

    if (!token) {
        throw new Error("Bạn chưa đăng nhập.")
    }

    const res = await fetch("https://localhost:7082/api/restaurants/owner", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        const err = await res.text()
        throw new Error(err || "Không thể lấy thông tin nhà hàng.")
    }

    return await res.json()
}
