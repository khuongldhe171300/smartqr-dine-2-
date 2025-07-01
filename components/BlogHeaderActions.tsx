"use client"

import { BookmarkPlus, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import ShareButton from "@/components/share-button"

export default function BlogHeaderActions() {
    return (
        <div className="flex items-center space-x-4 mb-8">
            <ShareButton />
            <Button variant="outline">
                <BookmarkPlus className="mr-2 h-4 w-4" />
                Lưu bài viết
            </Button>
        </div>
    )
}
