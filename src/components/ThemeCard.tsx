import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ThemeCardProps {
  title: string
  description: string
  count: number
  onClick: () => void
}

export function ThemeCard({ title, description, count, onClick }: ThemeCardProps) {
  return (
    <Card className="cursor-pointer hover:bg-accent" onClick={onClick}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{count} posts</p>
        <Button className="mt-2">View Posts</Button>
      </CardContent>
    </Card>
  )
}