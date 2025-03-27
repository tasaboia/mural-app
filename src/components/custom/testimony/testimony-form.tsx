"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Alert } from "@/src/components/ui/alert"
import { apiClientService } from "@/src/services/api-client"
import { useCategories } from "@/src/hooks/use-categories"

// Esquema de validação para o formulário de testemunho
const testimonySchema = z.object({
  title: z
    .string()
    .min(3, { message: "O título deve ter pelo menos 3 caracteres" })
    .max(100, { message: "O título deve ter no máximo 100 caracteres" }),
  content: z
    .string()
    .min(10, { message: "O conteúdo deve ter pelo menos 10 caracteres" })
    .max(2000, { message: "O conteúdo deve ter no máximo 2000 caracteres" }),
  category: z.string({ required_error: "Por favor, selecione uma categoria" }),
  anonymous: z.boolean().default(false),
})

type TestimonyFormData = z.infer<typeof testimonySchema>

interface TestimonyFormProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
  }
}

export default function TestimonyForm({ user }: TestimonyFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { categories, isLoading: loadingCategories } = useCategories()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TestimonyFormData>({
    resolver: zodResolver(testimonySchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      anonymous: false,
    },
  })

  const onSubmit = async (data: TestimonyFormData) => {
    setIsSubmitting(true)

    try {
      await apiClientService.createTestimony({
        ...data,
        authorId: user.id,
        authorName: user.name || "Usuário",
        authorEmail: user.email || "",
      })

      reset()
      setShowSuccess(true)

      // Redirecionar após 3 segundos
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (error) {
      console.error("Erro ao enviar testemunho:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <Alert variant="success" title="Testemunho enviado com sucesso!">
        Seu testemunho foi recebido e está aguardando aprovação. Você será redirecionado em instantes.
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            id="title"
            type="text"
            className={`w-full rounded-md border ${
              errors.title ? "border-red-300" : "border-gray-300"
            } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Ex: Testemunho de cura"
            {...register("title")}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Seu testemunho
          </label>
          <textarea
            id="content"
            rows={6}
            className={`w-full rounded-md border ${
              errors.content ? "border-red-300" : "border-gray-300"
            } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Compartilhe seu testemunho em detalhes..."
            {...register("content")}
          />
          {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <select
            id="category"
            className={`w-full rounded-md border ${
              errors.category ? "border-red-300" : "border-gray-300"
            } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("category")}
          >
            <option value="">Selecione uma categoria</option>
            {!loadingCategories &&
              categories.map((category: { id: string; emoji: string; name: string }) => (
                <option key={category.id} value={category.id}>
                  {category.emoji} {category.name}
                </option>
              ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
        </div>

        <div className="flex items-center">
          <input
            id="anonymous"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            {...register("anonymous")}
          />
          <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
            Compartilhar anonimamente
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isSubmitting ? "Enviando..." : "Enviar testemunho"}
      </button>
    </form>
  )
}

