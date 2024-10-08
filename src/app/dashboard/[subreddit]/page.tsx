"use client"

import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { SubredditTabs } from "@/components/SubredditTabs"

export default function SubredditPage() {
  const params = useParams()
  const router = useRouter()
  const subredditName = params.subreddit as string

  return (
    <div className="container mx-auto py-8">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      <h1 className="text-3xl font-bold mb-6">r/{subredditName}</h1>
      <SubredditTabs />
    </div>
  )
}