"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

export default function ShareButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [copied, setCopied] = useState(false)
    const [url, setUrl] = useState("")
    const ref = useRef<HTMLDivElement>(null)

    // Lấy URL khi mounted
    useEffect(() => {
        setUrl(window.location.href)
    }, [])

    // Auto đóng khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleCopy = async () => {
        if (url) {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="relative" ref={ref}>
            <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
                <Share2 className="mr-2 h-4 w-4" />
                Chia sẻ
            </Button>

            {isOpen && (
                <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded shadow p-3 space-y-2 w-48">
                    <button
                        onClick={handleCopy}
                        className="text-sm text-gray-700 hover:text-orange-600 w-full text-left"
                    >
                        📋 {copied ? "Đã sao chép!" : "Sao chép liên kết"}
                    </button>
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline block"
                    >
                        📘 Chia sẻ Facebook
                    </a>
                    <a
                        href={`https://zalo.me/share/url?url=${encodeURIComponent(url)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-green-600 hover:underline block"
                    >
                        🟢 Chia sẻ Zalo
                    </a>
                    <a
                        href={`https://www.messenger.com/share?link=${encodeURIComponent(url)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline block"
                    >
                        💬 Chia sẻ Messenger
                    </a>
                </div>
            )}
        </div>
    )
}
