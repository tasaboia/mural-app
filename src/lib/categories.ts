// Definição da interface Category para que não dependa de outras importações
export interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

// Mapeamento entre os IDs de categorias da API e as categorias para exibição
export const categories: Category[] = [
  {
    id: "HEALING",   // Alterado para o valor correspondente do enum Prisma
    name: "Cura",
    emoji: "💊",
    color: "green"
  },
  {
    id: "PROVISION", // Alterado para o valor correspondente do enum Prisma
    name: "Provisão",
    emoji: "💰",
    color: "blue"
  },
  {
    id: "SALVATION", // Alterado para o valor correspondente do enum Prisma
    name: "Salvação",
    emoji: "🙏",
    color: "purple"
  },
  {
    id: "DELIVERANCE", // Alterado para o valor correspondente do enum Prisma
    name: "Libertação",
    emoji: "🔓",
    color: "red"
  },
  {
    id: "FAMILY",     // Alterado para o valor correspondente do enum Prisma
    name: "Família",
    emoji: "👨‍👩‍👧‍👦",
    color: "yellow"
  },
  {
    id: "MINISTRY",   // Alterado para o valor correspondente do enum Prisma
    name: "Ministério",
    emoji: "🕊️",
    color: "indigo"
  },
  {
    id: "OTHER",      // Alterado para o valor correspondente do enum Prisma
    name: "Outro",
    emoji: "✨",
    color: "pink"
  }
];

// Função para buscar uma categoria por ID
export function getCategoryById(id: string): Category | undefined {
  return categories.find(category => category.id === id);
}

// Função para buscar todas as categorias
export function getAllCategories(): Category[] {
  return categories;
}
