"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { Testimony } from "@/src/common/types/testimony"
import { Card } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Label } from "@/src/components/ui/label"
import { Button } from "@/src/components/ui/button"
import { Checkbox } from "@/src/components/ui/checkbox"
import { Alert } from "@/src/components/ui/alert"
import { useTestimonies } from "@/src/hooks/use-testimonies"
import { getAllCategories } from "@/src/lib/categories"

const testimonySchema = z.object({
  title: z
    .string()
    .min(5, "O título deve ter pelo menos 5 caracteres")
    .max(100, "O título deve ter no máximo 100 caracteres"),
  content: z
    .string()
    .min(20, "O conteúdo deve ter pelo menos 20 caracteres")
    .max(5000, "O conteúdo deve ter no máximo 5000 caracteres"),
  category: z.string().min(1, "Selecione uma categoria"),
  approved: z.boolean().optional(),
  rejected: z.boolean().optional(),
})

type TestimonyFormData = z.infer<typeof testimonySchema>

interface AdminTestimonyEditProps {
  testimony: Testimony
}

export default function AdminTestimonyEdit({ testimony }: AdminTestimonyEditProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { updateTestimony, deleteTestimony } = useTestimonies()
  const categories = getAllCategories()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestimonyFormData>({
    resolver: zodResolver(testimonySchema),
    defaultValues: {
      title: testimony.title,
      content: testimony.content,
      category: testimony.category,
      approved: testimony.approved,
      rejected: testimony.rejected,
    },
  })

  const onSubmit = async (data: TestimonyFormData) => {
    setIsSubmitting(true)

    try {
      await updateTestimony(testimony.id, data)
      setShowSuccess(true)

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/admin")
      }, 2000)
    } catch (error) {
      console.error("Erro ao atualizar testemunho:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja excluir este testemunho? Esta ação não pode ser desfeita.")) {
      return
    }

    setIsDeleting(true)

    try {
      await deleteTestimony(testimony.id)
      router.push("/admin")
    } catch (error) {
      console.error("Erro ao excluir testemunho:", error)
      setIsDeleting(false)
    }
  }

  if (showSuccess) {
    return (
      <Alert variant="success" title="Testemunho atualizado com sucesso!">
        As alterações foram salvas. Você será redirecionado em instantes.
      </Alert>
    )
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="title" required>
            Título
          </Label>
          <Input id="title" type="text" error={errors.title?.message} {...register("title")} />
        </div>

        <div>
          <Label htmlFor="category" required>
            Categoria
          </Label>
          <select
            id="category"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
            {...register("category")}
          >
            <option value="">Selecione uma categoria</option>
            {categories
              .filter((c) => c.id !== "all")
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.emoji} {category.name}
                </option>
              ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
        </div>

        <div>
          <Label htmlFor="content" required>
            Conteúdo
          </Label>
          <Textarea id="content" rows={10} error={errors.content?.message} {...register("content")} />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Checkbox id="approved" label="Aprovado" {...register("approved")} />
          </div>

          <div className="flex items-center">
            <Checkbox id="rejected" label="Rejeitado" {...register("rejected")} />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button type="button" variant="danger" onClick={handleDelete} isLoading={isDeleting} disabled={isDeleting}>
            {isDeleting ? "Excluindo..." : "Excluir testemunho"}
          </Button>

          <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar alterações"}
          </Button>
        </div>
      </form>
    </Card>
  )
}

