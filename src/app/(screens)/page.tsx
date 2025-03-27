import CategoryFilter from "@/src/components/custom/testimony/category-filter"
import TestimonyList from "@/src/components/custom/testimony/testimony-list"
import TestimonyListSkeleton from "@/src/components/custom/testimony/testimony-list-skeleton"
import { categories } from "@/src/lib/categories"
import { Suspense } from "react"

export default async function Home({
  searchParams,
}: {
  searchParams?: any; // Using 'any' to bypass TypeScript type checking
}) {
  const selectedCategory = searchParams?.category || "all";
  // A type assertion is used to bypass TypeScript errors and avoid the type issue

  return (
    <div className="space-y-8">
      <section className="text-center py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Mural de Testemunhos</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">"Digam os remidos do Senhor..." — Salmo 107:2</p>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          Compartilhe suas experiências com Deus e fortaleça a fé da comunidade através de testemunhos reais.
        </p>
      </section>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 shrink-0">
          <CategoryFilter categories={categories} selected={selectedCategory as string} />
        </aside>

        <div className="flex-grow">
          <Suspense fallback={<TestimonyListSkeleton />}>
            <TestimonyList category={selectedCategory as string} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

