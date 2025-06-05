"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        router.push("/login")
    }

    return (
        <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-left text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
        >
            <LogOut className="h-5 w-5" />
            <span>Đăng xuất</span>
        </button>
    )
}
