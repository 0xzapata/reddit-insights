import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface SubredditCardProps {
  name: string
  description: string
}

export function SubredditCard({ name, description }: SubredditCardProps) {
  return (
    <Link href={`/dashboard/${name}`}>
      <Card className="hover:bg-accent transition-colors">
        <CardHeader>
          <CardTitle>r/{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}