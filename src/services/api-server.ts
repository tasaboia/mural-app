import { Testimony } from "@/src/common/types/testimony"
import api from "../lib/axios"

export async function getTestimoniesFromAPI(filters: Record<string, any> = {}): Promise<Testimony[]> {
  try {
    const params: Record<string, string> = {}
    
    if (filters.approved !== undefined) {
      params.approved = filters.approved.toString()
    }
    
    if (filters.category) {
      params.category = filters.category
    }
    
    if (filters.authorId) {
      params.authorId = filters.authorId
    }
    
    const response = await api.get('/api/testimonies', { params })

    return response.data
  } catch (error) {
    console.error('Erro ao buscar testemunhos:', error)
    throw new Error('Falha ao buscar testemunhos')
  }
}