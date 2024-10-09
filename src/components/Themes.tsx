import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import type { CategorizedPost, PostCategory } from "@/app/types"
import { ThemeCard } from "@/components/ThemeCard"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

const categoryDescriptions: Record<keyof PostCategory, string> = {
  solutionRequests: "Posts where people are seeking solutions for problems",
  painAndAnger: "Posts where people are expressing pains or anger",
  adviceRequests: "Posts where people are seeking advice",
  moneyTalk: "Posts where people are talking about spending money",
}

export function Themes() {
  const [posts, setPosts] = useState<CategorizedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<keyof PostCategory | null>(null)
  const { subreddit } = useParams()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/reddit-posts?subreddit=${subreddit}`)
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        const fetchedPosts = await response.json()
        setPosts(fetchedPosts)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [subreddit])

  const categoryCounts = posts.reduce((acc, post) => {
    Object.entries(post.categories).forEach(([category, value]) => {
      if (value) {
        acc[category as keyof PostCategory] = (acc[category as keyof PostCategory] || 0) + 1
      }
    })
    return acc
  }, {} as Record<keyof PostCategory, number>)

  const getCategoryPosts = (category: keyof PostCategory) => {
    return posts.filter(post => post.categories[category])
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Themes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(categoryCounts).map(([category, count]) => (
          <Sheet key={category}>
            <SheetTrigger asChild>
              <ThemeCard
                title={category}
                description={categoryDescriptions[category as keyof PostCategory]}
                count={count}
                onClick={() => setSelectedCategory(category as keyof PostCategory)}
              />
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>{category}</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-100px)] mt-4">
                {getCategoryPosts(category as keyof PostCategory).map((post) => (
                  <div key={post.url} className="mb-4 p-4 border rounded">
                    <h3 className="font-semibold mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-500">Score: {post.score} | Comments: {post.numComments}</p>
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View on Reddit
                    </a>
                  </div>
                ))}
              </ScrollArea>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  )
}