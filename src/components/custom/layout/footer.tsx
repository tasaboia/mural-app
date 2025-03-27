import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">&copy; {currentYear} Mural de Testemunhos da Comunidade</p>
            <p className="text-gray-500 text-xs mt-1">"Digam os remidos do Senhor..." — Salmo 107:2</p>
          </div>

          <div className="flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm">
              Início
            </Link>
            <Link href="/testemunhos/novo" className="text-gray-600 hover:text-blue-600 text-sm">
              Compartilhar
            </Link>
            <Link href="/politica-de-privacidade" className="text-gray-600 hover:text-blue-600 text-sm">
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

