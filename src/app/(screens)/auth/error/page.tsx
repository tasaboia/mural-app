"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  let errorMessage = "Ocorreu um erro durante a autenticação."

  if (error === "AccessDenied") {
    errorMessage = "Acesso negado. Você não tem permissão para acessar este recurso."
  } else if (error === "Configuration") {
    errorMessage = "Erro de configuração do servidor. Por favor, tente novamente mais tarde."
  } else if (error === "OAuthSignin" || error === "OAuthCallback" || error === "OAuthCreateAccount") {
    errorMessage = "Ocorreu um erro durante a autenticação com o provedor. Por favor, tente novamente."
  }

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-red-800 mb-4">Erro de Autenticação</h1>
        <p className="text-red-700 mb-6">{errorMessage}</p>
        <Link href="/" className="btn-primary">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}

