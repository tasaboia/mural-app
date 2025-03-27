import { getTestimoniesFromAPI } from "@/src/services/api-server"
import TestimonyCard from "./testimony-card"
import { Category } from "@/src/lib/categories"

interface TestimonyListProps {
  category?: string
}

export default async function TestimonyList({ category = "all" }: TestimonyListProps) {
  // Buscar testemunhos da API do servidor
  let testimonies  
  
  try {
    const filters: Record<string, any> = {
      approved: true // Apenas testemunhos aprovados
    }
    
    // Adicionar filtro de categoria se não for "all"
    if (category != "all") {
      filters.category = category
    }

    console.log("filters: ",filters)
    
    testimonies = await getTestimoniesFromAPI(filters)
  } catch (error) {
    console.error("Erro ao buscar testemunhos:", error)
  }

  if (testimonies && testimonies?.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-600 mb-2">Nenhum testemunho encontrado</h3>
        <p className="text-gray-500">
          {category === "all"
            ? "Seja o primeiro a compartilhar seu testemunho!"
            : "Não há testemunhos nesta categoria ainda."}
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {testimonies?.map((testimony) => (
        <TestimonyCard key={testimony.id} testimony={testimony} />
      ))}
    </div>
  )
}

