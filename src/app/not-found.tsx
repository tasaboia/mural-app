import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Página não encontrada</h2>
      <p className="text-gray-600 mb-8">O conteúdo que você está procurando não existe ou foi movido.</p>
      <Link href="/" className="btn-primary">
        Voltar para a página inicial
      </Link>
    </div>
  )
}

