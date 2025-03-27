"use client"

import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Heart } from "lucide-react"
import type { Testimony } from "@/src/common/types/testimony"
import { Card, CardHeader, CardContent, CardFooter } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { apiClientService } from "@/src/services/api-client"
import { getCategoryById } from "@/src/lib/categories"

interface TestimonyCardProps {
  testimony: Testimony
}

export default function TestimonyCard({ testimony }: TestimonyCardProps) {
  const [likes, setLikes] = useState(testimony.likes)
  const [isLiking, setIsLiking] = useState(false)
  const category = getCategoryById(testimony.category)

  const handleLike = async () => {
    if (isLiking) return

    setIsLiking(true)
    try {
      await apiClientService.likeTestimony(testimony.id)
      setLikes((prev) => prev + 1)
    } catch (error) {
      console.error("Erro ao curtir testemunho:", error)
    } finally {
      setIsLiking(false)
    }
  }

  const formattedDate = formatDistanceToNow(new Date(testimony.createdAt), {
    addSuffix: true,
    locale: ptBR,
  })

  return (
    <Card>
      <CardHeader className="flex justify-between items-start">
        <div>
          <Badge
            variant={
              category?.color === "blue"
                ? "primary"
                : category?.color === "green"
                  ? "success"
                  : category?.color === "red"
                    ? "danger"
                    : category?.color === "yellow"
                      ? "warning"
                      : category?.color === "purple" || category?.color === "indigo"
                        ? "info"
                        : "default"
            }
          >
            <span className="mr-1">{category?.emoji}</span>
            {category?.name}
          </Badge>
          <h3 className="text-xl font-semibold mt-2 text-gray-800">{testimony.title}</h3>
        </div>
        <button
          onClick={handleLike}
          className="flex items-center text-gray-400 hover:text-red-500 transition-colors"
          disabled={isLiking}
        >
          <Heart
            className={`h-5 w-5 ${isLiking ? "fill-red-500 text-red-500" : ""}`}
            fill={likes > testimony.likes ? "currentColor" : "none"}
          />
          <span className="ml-1 text-sm font-medium">{likes}</span>
        </button>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 whitespace-pre-line">{testimony.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="text-sm text-gray-500">
          {testimony.anonymous ? "Anônimo" : testimony.authorName}
        </div>
        <div className="text-xs text-gray-400">{formattedDate}</div>
      </CardFooter>
    </Card>
  )
}

