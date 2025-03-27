"use client"

import { useState, useEffect } from "react"
import { Category, getAllCategories, getCategoryById } from "@/src/lib/categories"

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Carrega as categorias no lado do cliente
      const allCategories = getAllCategories()
      setCategories(allCategories)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar categorias")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Função para obter uma categoria pelo ID
  const getCategory = (id: string): Category | undefined => {
    return getCategoryById(id)
  }

  return {
    categories,
    isLoading,
    error,
    getCategory
  }
} 