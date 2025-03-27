import { Testimony, CreateTestimonyDTO, UpdateTestimonyDTO, Category, Amen } from "@/src/types/testemunho";

class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

class ApiService {
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
    
    const config = {
      ...options,
      headers,
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new ApiError(
          error?.message || `Request failed with status ${response.status}`,
          response.status
        );
      }
      
      // For DELETE requests that return 204 No Content
      if (response.status === 204) {
        return {} as T;
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : "An unknown error occurred",
        500
      );
    }
  }

  
  async getTestimonies(filters?: { 
    approved?: boolean, 
    category?: Category,
    authorId?: string
  }): Promise<Testimony[]> {
    let queryParams = "";
    
    if (filters) {
      const params = new URLSearchParams();
      
      if (filters.approved !== undefined) {
        params.append("aprovado", filters.approved.toString());
      }
      
      if (filters.category) {
        params.append("categoria", filters.category);
      }
      
      if (filters.authorId) {
        params.append("autorId", filters.authorId);
      }
      
      queryParams = `?${params.toString()}`;
    }
    
    return this.request<Testimony[]>(`/api/testimonials${queryParams}`);
  }
  
  async getTestimonyById(id: string): Promise<Testimony> {
    return this.request<Testimony>(`/testimonials/${id}`);
  }
  
  async createTestimony(testimony: CreateTestimonyDTO): Promise<Testimony> {
    // Transform from English to Portuguese for backend
    const backendData = {
      titulo: testimony.title,
      conteudo: testimony.content,
      categoria: testimony.category,
      anonimo: testimony.anonymous || false
    };
    
    return this.request<Testimony>("/testimonials", {
      method: "POST",
      body: JSON.stringify(backendData)
    });
  }
  
  async updateTestimony(id: string, testimony: UpdateTestimonyDTO): Promise<Testimony> {
    // Transform from English to Portuguese for backend
    const backendData: Record<string, any> = {};
    
    if (testimony.title !== undefined) backendData.titulo = testimony.title;
    if (testimony.content !== undefined) backendData.conteudo = testimony.content;
    if (testimony.anonymous !== undefined) backendData.anonimo = testimony.anonymous;
    if (testimony.approved !== undefined) backendData.aprovado = testimony.approved;
    if (testimony.category !== undefined) backendData.categoria = testimony.category;
    
    return this.request<Testimony>(`/testimonials/${id}`, {
      method: "PATCH",
      body: JSON.stringify(backendData)
    });
  }
  
  async deleteTestimony(id: string): Promise<void> {
    await this.request<void>(`/testimonials/${id}`, {
      method: "DELETE"
    });
  }
  
  async approveTestimony(id: string): Promise<Testimony> {
    return this.request<Testimony>(`/testimonials/${id}/aprovar`, {
      method: "PATCH"
    });
  }
  
  // Amen methods (likes)
  
  async giveLike(testimonyId: string): Promise<Amen> {
    return this.request<Amen>(`/likes`, {
      method: "POST",
      body: JSON.stringify({ testemunhoId: testimonyId })
    });
  }
  
  async removeLike(testimonyId: string): Promise<void> {
    await this.request<void>(`/likes/${testimonyId}`, {
      method: "DELETE"
    });
  }
  
  async getUserLikes(): Promise<Amen[]> {
    return this.request<Amen[]>(`/likes/my`);
  }
}

// Export a single instance of the service
export const apiService = new ApiService(); 