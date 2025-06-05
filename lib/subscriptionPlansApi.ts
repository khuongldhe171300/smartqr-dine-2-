export async function fetchAllSubscriptionPlans() {
    try {
        const res = await fetch("https://localhost:7082/api/Subscriptions/plans", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Response status:", res.status)

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || "Không thể tải danh sách gói đăng ký");
        }

        return await res.json();
    } catch (err) {
        console.error("Lỗi khi fetch gói đăng ký:", err);
        throw err;
    }


}

import axios from 'axios';


export async function updateSubscriptionPlan(id: number, planData: {
    planName: string;
    description: string;
    price: number;
    billingCycle: string;
    maxTables: number;
    maxMenuItems: number;
    features: string[];
}) {
    const response = await axios.put(`https://localhost:7082/api/Subscriptions/plans/${id}`, planData);
    return response.data;
}


export async function fetchSubscriptionPlanById(id: number) {
    const res = await fetch(`https://localhost:7082/api/Subscriptions/plans/${id}`)
    if (!res.ok) throw new Error("Không thể lấy gói đăng ký")
    return res.json()
}

