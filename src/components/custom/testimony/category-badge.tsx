import { getCategoryById } from "@/src/lib/categories"

interface CategoryBadgeProps {
  category: string
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  //tem que arrumar esse fetch aqui
  const categoryData = getCategoryById(category)

  if (!categoryData) {
    return null
  }

  const { name, emoji, color } = categoryData
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800", 
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
    purple: "bg-purple-100 text-purple-800",
    indigo: "bg-indigo-100 text-indigo-800",
    pink: "bg-pink-100 text-pink-800"
  }

  const badgeColor = colorClasses[color] || "bg-gray-100 text-gray-800"

  return (
    <span className={`badge ${badgeColor}`}>
      <span className="mr-1">{emoji}</span>
      {name}
    </span>
  )
}

