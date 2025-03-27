"use client"

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { isAdmin } from "@/src/lib/auth-utils";
import { apiClientService, TestimonyFilters, UpdateTestimonyDTO, CreateTestimonyDTO } from "@/src/services/api-client";
import { useToast } from "../components/ui/use-toast";
import { Testimony } from "@/src/common/types/testimony";

interface UseTestimoniesOptions {
  approved?: boolean;
  category?: string;
  authorId?: string;
}

export function useTestimonies(options: UseTestimoniesOptions = {}) {
  const { data: session } = useSession();
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchTestimonies = useCallback(async (filters?: TestimonyFilters) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await apiClientService.getTestimonies(filters);
      setTestimonies(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Erro ao buscar testemunhos"));
      toast({
        title: "Erro",
        description: "Não foi possível carregar os testemunhos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const getTestimony = async (id: string): Promise<Testimony | null> => {
    try {
      return await apiClientService.getTestimonyById(id);
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível encontrar o testemunho solicitado.",
        variant: "destructive",
      });
      throw err;
    }
  };

  const createTestimony = useCallback(async (data: any): Promise<Testimony | null> => {
    try {
      const newTestimony = await apiClientService.createTestimony(data);
      setTestimonies(prev => [...prev, newTestimony]);
      return newTestimony;
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível criar o testemunho.",
        variant: "destructive",
      });
      throw err;
    }
  }, [toast]);

  const updateTestimony = useCallback(async (id: string, data: UpdateTestimonyDTO): Promise<Testimony | null> => {
    try {
      const updatedTestimony = await apiClientService.updateTestimony(id, data);
      setTestimonies(prev => 
        prev.map(t => (t.id === id ? updatedTestimony : t))
      );
      return updatedTestimony;
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o testemunho.",
        variant: "destructive",
      });
      throw err;
    }
  }, [toast]);

  const deleteTestimony = useCallback(async (id: string): Promise<boolean> => {
    if (!session || !isAdmin(session)) {
      toast({
        title: "Atenção",
        description: "Você precisa ser administrador para excluir um testemunho.",
        variant: "default",
      });
      return false;
    }

    try {
      await apiClientService.deleteTestimony(id);
      setTestimonies(prev => prev.filter(t => t.id !== id));
      return true;
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o testemunho.",
        variant: "destructive",
      });
      throw err;
    }
  }, [session, toast]);

  const approveTestimony = useCallback(async (id: string): Promise<Testimony | null> => {
    if (!session || !isAdmin(session)) {
      toast({
        title: "Atenção",
        description: "Você precisa ser administrador para aprovar um testemunho.",
        variant: "default",
      });
      return null;
    }

    try {
      return await updateTestimony(id, { approved: true });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível aprovar o testemunho.",
        variant: "destructive",
      });
      throw err;
    }
  }, [updateTestimony, toast, session]);

  const rejectTestimony = useCallback(async (id: string): Promise<Testimony | null> => {
    if (!session || !isAdmin(session)) {
      toast({
        title: "Atenção",
        description: "Você precisa ser administrador para rejeitar um testemunho.",
        variant: "default",
      });
      return null;
    }

    try {
      return await updateTestimony(id, { approved: false });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível rejeitar o testemunho.",
        variant: "destructive",
      });
      throw err;
    }
  }, [updateTestimony, toast, session]);

  const filterByCategory = useCallback((categoryId: string) => {
    fetchTestimonies(categoryId ? { category: categoryId } : undefined);
  }, [fetchTestimonies]);

  const fetchUserTestimonies = useCallback(() => {
    if (!session?.user?.id) return;
    
    fetchTestimonies({ authorId: session.user.id });
  }, [session, fetchTestimonies]);

  useEffect(() => {
    fetchTestimonies();
  }, [fetchTestimonies]);

  return {
    testimonies,
    isLoading,
    error,
    fetchTestimonies,
    getTestimony,
    createTestimony,
    updateTestimony,
    deleteTestimony,
    approveTestimony,
    rejectTestimony,
    filterByCategory,
    fetchUserTestimonies,
  };
} 