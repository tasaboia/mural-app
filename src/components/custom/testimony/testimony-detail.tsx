"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ArrowLeft, Edit } from "lucide-react"
import type { Testimony } from "@/src/common/types/testimony"
import { isAdmin } from "@/src/lib/auth-utils"
import { Card } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { getCategoryById } from "@/src/lib/categories"

interface TestimonyDetailProps {
  testimony: Testimony
}

export default function TestimonyDetail({ testimony }: TestimonyDetailProps) {
  const { data: session } = useSession()
  const category = getCategoryById(testimony.category)

  const formattedDate = format(new Date(testimony.createdAt), "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  })

  return (
    <Card className="p-6 md:p-8">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft size={16} className="mr-1" />
          <span>Voltar para o mural</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-3">
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

          {testimony.approved ? null : <Badge variant="warning">Aguardando aprovação</Badge>}
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">{testimony.title}</h1>

        <div className="flex items-center justify-between">
          <div className="text-gray-600">
            {testimony.anonymous ? <span>Compartilhado anonimamente</span> : <span>Por {testimony.authorName}</span>}
            <span className="mx-1">•</span>
            <span>{formattedDate}</span>
          </div>

          {session && isAdmin(session) && (
            <Link
              href={`/admin/testemunhos/${testimony.id}`}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <Edit size={16} className="mr-1" />
              <span>Editar</span>
            </Link>
          )}
        </div>
      </div>

      <div className="prose max-w-none mb-8">
        {testimony.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </Card>
  )
}

