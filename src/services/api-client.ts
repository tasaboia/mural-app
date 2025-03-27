import axios from 'axios';
import { Category } from '@/src/lib/categories';
import { Testimony } from '@/src/common/types/testimony';

// Cliente Axios básico
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interface para os filtros de testemunhos
export interface TestimonyFilters {
  approved?: boolean;
  category?: string;
  authorId?: string;
}

// Interface para criação de testemunho
export interface CreateTestimonyDTO {
  title: string;
  content: string;
  category: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  anonymous: boolean;
}

// Interface para atualização de testemunho
export interface UpdateTestimonyDTO {
  title?: string;
  content?: string;
  category?: string;
  approved?: boolean;
  rejected?: boolean;
}

// Classe de serviço para API
export class ApiClientService {
  // Métodos para testemunhos
  async getTestimonies(filters?: TestimonyFilters): Promise<Testimony[]> {
    try {
      const params = new URLSearchParams();
      
      if (filters) {
        if (filters.approved !== undefined) {
          params.append('approved', filters.approved.toString());
        }
        
        if (filters.category) {
          params.append('category', filters.category);
        }
        
        if (filters.authorId) {
          params.append('authorId', filters.authorId);
        }
      }
      
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await apiClient.get<Testimony[]>(`/testimonies${queryString}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar testemunhos:', error);
      throw error;
    }
  }

  async getTestimonyById(id: string): Promise<Testimony> {
    try {
      const response = await apiClient.get<Testimony>(`/testimonies/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar testemunho ${id}:`, error);
      throw error;
    }
  }

  async createTestimony(data: CreateTestimonyDTO): Promise<Testimony> {
    try {
      const response = await apiClient.post<Testimony>('/testimonies', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar testemunho:', error);
      throw error;
    }
  }

  async updateTestimony(id: string, data: UpdateTestimonyDTO): Promise<Testimony> {
    try {
      const response = await apiClient.put<Testimony>(`/testimonies/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar testemunho ${id}:`, error);
      throw error;
    }
  }

  async deleteTestimony(id: string): Promise<void> {
    try {
      await apiClient.delete(`/testimonies/${id}`);
    } catch (error) {
      console.error(`Erro ao excluir testemunho ${id}:`, error);
      throw error;
    }
  }

  async likeTestimony(id: string): Promise<void> {
    try {
      await apiClient.post(`/testimonies/${id}/like`);
    } catch (error) {
      console.error(`Erro ao curtir testemunho ${id}:`, error);
      throw error;
    }
  }

  // Métodos para categorias - Se houver endpoints específicos para categorias
  async getCategories(): Promise<Category[]> {
    try {
      const response = await apiClient.get<Category[]>('/categories');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw error;
    }
  }
}

// Exportar uma instância do serviço para uso em componentes
export const apiClientService = new ApiClientService(); 