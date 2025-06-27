export async function fetchQrCodes() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Tables`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "ngrok-skip-browser-warning": "true"
        },
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Không thể tải danh sách bàn");
    }

    return res.json(); // trả về danh sách bàn kèm QR code
}



export async function createQrCodeForTable(tableNumber: string) {
    const formData = new FormData();
    formData.append("tbId", tableNumber);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Tables/qr-code-create/${tableNumber}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "ngrok-skip-browser-warning": "true"
        },
        body: formData,
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Không thể tạo mã QR cho bàn");
    }

    return res.json(); // { message: "Thêm qr thành công", tableId: ... }
}
