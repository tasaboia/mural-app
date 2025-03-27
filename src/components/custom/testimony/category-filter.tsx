"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import type { Category } from "@/src/common/types/category"
import { Card } from "@/src/components/ui/card"

interface CategoryFilterProps {
  categories: Category[]
  selected: string
}

export default function CategoryFilter({ categories, selected }: CategoryFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams)

    if (categoryId === "all") {
      params.delete("category")
    } else {
      params.set("category", categoryId)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-3">Categorias</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              selected === category.id ? "bg-blue-100 text-blue-800 font-medium" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="mr-2">{category.emoji}</span>
            {category.name}
          </button>
        ))}
      </div>
    </Card>
  )
}

