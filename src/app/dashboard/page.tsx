"use client"

import { useState } from "react"
import { SubredditCard } from "@/components/SubredditCard"
import { AddSubredditModal } from "@/components/AddSubredditModal"

// This would typically come from a database or API
const initialSubreddits = [
  { name: "ollama", description: "An open-source AI model" },
  { name: "openai", description: "OpenAI's official subreddit" },
]

export default function DashboardPage() {
  const [subreddits, setSubreddits] = useState(initialSubreddits)

  const handleAddSubreddit = (name: string, description: string) => {
    setSubreddits([...subreddits, { name, description }])
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Available Subreddits</h1>
        <AddSubredditModal onAddSubreddit={handleAddSubreddit} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subreddits.map((subreddit) => (
          <SubredditCard
            key={subreddit.name}
            name={subreddit.name}
            description={subreddit.description}
          />
        ))}
      </div>
    </div>
  )
}