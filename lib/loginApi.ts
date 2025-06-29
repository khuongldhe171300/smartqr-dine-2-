// lib/loginApi.ts
export async function loginApi(email: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({ email, password })
    });

    let data: any;

    try {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            data = await res.json();
        } else {
            const text = await res.text();
            data = { message: text };
        }
    } catch (err) {
        throw new Error("Lỗi khi xử lý phản hồi từ máy chủ.");
    }

    if (!res.ok) {
        throw new Error(data.message || "Đăng nhập thất bại.");
    }

    return data;
}
