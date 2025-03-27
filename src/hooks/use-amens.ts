import { useState, useEffect, useCallback } from "react";
import { Amen } from "@/src/types/testemunho";
import { useSession } from "next-auth/react";

export function useAmens() {
  const [amens, setAmens] = useState<Amen[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

  const fetchAmens = useCallback(async () => {
    if (status !== "authenticated") {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/amens");
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error fetching amens");
      }
      
      const data = await response.json();
      setAmens(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  const giveAmen = async (testimonyId: string): Promise<Amen | null> => {
    if (status !== "authenticated") {
      setError("You must be logged in to give amen");
      return null;
    }

    try {
      const response = await fetch("/api/amens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ testimonyId }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error giving amen");
      }
      
      const newAmen = await response.json();
      setAmens(prev => [...prev, newAmen]);
      return newAmen;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      return null;
    }
  };

  const removeAmen = async (testimonyId: string): Promise<boolean> => {
    if (status !== "authenticated") {
      setError("You must be logged in to remove amen");
      return false;
    }

    try {
      const response = await fetch(`/api/amens/${testimonyId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error removing amen");
      }
      
      setAmens(prev => prev.filter(a => a.testimonyId !== testimonyId));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      return false;
    }
  };

  const hasUserGivenAmen = (testimonyId: string): boolean => {
    return amens.some(a => a.testimonyId === testimonyId);
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchAmens();
    }
  }, [fetchAmens, status]);

  return {
    amens,
    isLoading,
    error,
    refetch: fetchAmens,
    giveAmen,
    removeAmen,
    hasUserGivenAmen,
  };
} 