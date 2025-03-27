"use client"

import { useState } from "react"

type ToastVariant = "default" | "destructive" | "success"

interface Toast {
  id: string
  title: string
  description?: string
  variant: ToastVariant
}

interface ToastOptions {
  title: string
  description?: string
  variant?: ToastVariant
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (options: ToastOptions) => {
    const id = crypto.randomUUID()
    const newToast: Toast = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant || "default",
    }

    setToasts((prev) => [...prev, newToast])

    // Remover o toast após 5 segundos
    setTimeout(() => {
      dismissToast(id)
    }, 5000)

    return id
  }

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return {
    toasts,
    toast,
    dismissToast,
  }
} 