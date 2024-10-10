import { Badge } from "@/components/ui/badge"

interface CategoryBadgeProps {
  category: string
  value: boolean
}

const categoryColors: Record<string, string> = {
  solutionRequests: "bg-blue-500 hover:bg-blue-600",
  painAndAnger: "bg-red-500 hover:bg-red-600",
  adviceRequests: "bg-green-500 hover:bg-green-600",
  moneyTalk: "bg-yellow-500 hover:bg-yellow-600",
}

export function CategoryBadge({ category, value }: CategoryBadgeProps) {
  if (!value) return null

  const colorClass = categoryColors[category] || "bg-gray-500 hover:bg-gray-600"

  return (
    <Badge className={`${colorClass} text-white mr-1 mb-1`}>
      {category}
    </Badge>
  )
}