"use client"

import { useState, useEffect } from "react"
import { SubredditCard } from "@/components/SubredditCard"
import { AddSubredditModal } from "@/components/AddSubredditModal"

interface Subreddit {
  name: string;
  description: string;
}

export default function DashboardPage() {
  const [subreddits, setSubreddits] = useState<Subreddit[]>([])

  useEffect(() => {
    const storedSubreddits = localStorage.getItem('subreddits')
    if (storedSubreddits) {
      setSubreddits(JSON.parse(storedSubreddits))
    }
  }, [])

  const handleAddSubreddit = (name: string, description: string) => {
    const newSubreddit = { name, description }
    const updatedSubreddits = [...subreddits, newSubreddit]
    setSubreddits(updatedSubreddits)
    localStorage.setItem('subreddits', JSON.stringify(updatedSubreddits))
  }

  const handleDeleteSubreddit = (name: string) => {
    const updatedSubreddits = subreddits.filter(subreddit => subreddit.name !== name)
    setSubreddits(updatedSubreddits)
    localStorage.setItem('subreddits', JSON.stringify(updatedSubreddits))
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
            onDelete={() => handleDeleteSubreddit(subreddit.name)}
          />
        ))}
      </div>
    </div>
  )
}