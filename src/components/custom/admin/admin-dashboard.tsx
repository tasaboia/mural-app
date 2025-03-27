"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Check, X, AlertTriangle } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import { Card } from "@/src/components/ui/card"
import { useTestimonies } from "@/src/hooks/use-testimonies"
import { getCategoryById } from "@/src/lib/categories"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending")
  const { 
    testimonies, 
    isLoading, 
    approveTestimony, 
    rejectTestimony 
  } = useTestimonies()

  const handleApprove = async (id: string) => {
    try {
      await approveTestimony(id)
    } catch (error) {
      console.error("Erro ao aprovar testemunho:", error)
    }
  }

  const handleReject = async (id: string) => {
    try {
      await rejectTestimony(id)
    } catch (error) {
      console.error("Erro ao rejeitar testemunho:", error)
    }
  }

  const filteredTestimonies = testimonies.filter((t) => {
    if (activeTab === "pending") return !t.approved && !t.rejected
    if (activeTab === "approved") return t.approved
    if (activeTab === "rejected") return t.rejected
    return true
  })

  if (isLoading) {
    return <div className="text-center py-12">Carregando...</div>
  }

  return (
    <div>
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "pending" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Pendentes
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "approved" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("approved")}
        >
          Aprovados
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "rejected" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("rejected")}
        >
          Rejeitados
        </button>
      </div>

      {filteredTestimonies.length === 0 ? (
        <Card className="text-center py-12 bg-gray-50">
          <AlertTriangle size={32} className="mx-auto text-gray-400 mb-2" />
          <h3 className="text-lg font-medium text-gray-600">
            Nenhum testemunho{" "}
            {activeTab === "pending" ? "pendente" : activeTab === "approved" ? "aprovado" : "rejeitado"}
          </h3>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Autor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTestimonies.map((testimony) => {
                const category = getCategoryById(testimony.category)
                return (
                  <tr key={testimony.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{testimony.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {testimony.anonymous ? "Anônimo" : testimony.authorName}
                      </div>
                      {!testimony.anonymous && <div className="text-xs text-gray-400">{testimony.authorEmail}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(testimony.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link href={`/admin/testemunhos/${testimony.id}`} className="text-blue-600 hover:text-blue-800">
                          <Edit size={18} />
                        </Link>

                        {activeTab === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(testimony.id)}
                              className="text-green-600 hover:text-green-800"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={() => handleReject(testimony.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X size={18} />
                            </button>
                          </>
                        )}

                        {activeTab === "rejected" && (
                          <button
                            onClick={() => handleApprove(testimony.id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Check size={18} />
                          </button>
                        )}

                        {activeTab === "approved" && (
                          <button
                            onClick={() => handleReject(testimony.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

