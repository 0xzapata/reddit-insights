import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trash2 } from "lucide-react"

interface SubredditCardProps {
  name: string
  description: string
  onDelete: () => void
}

export function SubredditCard({ name, description, onDelete }: SubredditCardProps) {
  return (
    <Card className="relative">
      <Link href={`/dashboard/${name}`}>
        <CardHeader>
          <CardTitle>r/{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Link>
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2"
        onClick={(e) => {
          e.preventDefault()
          onDelete()
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </Card>
  )
}