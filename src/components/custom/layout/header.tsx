"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { Menu, X, User, LogOut, FileText, Home, Shield } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { isAdmin } from "@/src/lib/auth-utils"

export default function Header() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">Mural de Testemunhos</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Início
            </Link>
            <Link href="/testemunhos/novo" className="text-gray-600 hover:text-blue-600 transition-colors">
              Compartilhar
            </Link>

            {status === "authenticated" ? (
              <div className="flex items-center space-x-4">
                {isAdmin(session) && (
                  <Link href="/admin" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">{session.user?.name}</span>
                  <button onClick={() => signOut()} className="text-sm text-red-600 hover:text-red-800">
                    Sair
                  </button>
                </div>
              </div>
            ) : (
              <Button onClick={() => signIn("google")}>Entrar</Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-100">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home size={18} />
                  <span>Início</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/testemunhos/novo"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FileText size={18} />
                  <span>Compartilhar</span>
                </Link>
              </li>

              {status === "authenticated" && isAdmin(session) && (
                <li>
                  <Link
                    href="/admin"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield size={18} />
                    <span>Admin</span>
                  </Link>
                </li>
              )}

              <li>
                {status === "authenticated" ? (
                  <div className="pt-4 border-t border-gray-100">
                    <div className="mb-2 text-sm font-medium text-gray-700">{session.user?.name}</div>
                    <button
                      onClick={() => {
                        signOut()
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center space-x-2 text-red-600 hover:text-red-800"
                    >
                      <LogOut size={18} />
                      <span>Sair</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => signIn("google")}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                  >
                    <User size={18} />
                    <span>Entrar</span>
                  </button>
                )}
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

