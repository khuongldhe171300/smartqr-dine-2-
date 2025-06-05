// lib/loginApi.ts
export async function loginApi(email: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
    }

    return res.json(); // { token, userId, role }
}

