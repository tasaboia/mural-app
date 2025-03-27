import type { Session } from "next-auth"
import type { Session as AuthCoreSession } from "@auth/core/types"

// Lista de emails de administradores
const ADMIN_EMAILS = [
  "admin@example.com",
  // Adicione outros emails de administradores aqui
]

export function isAdmin(session: Session | AuthCoreSession | null): boolean {
  if (!session || !session.user || !session.user.email) {
    return false
  }

  return ADMIN_EMAILS.includes(session.user.email)
}

