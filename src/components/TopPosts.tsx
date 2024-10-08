import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface RedditPost {
  title: string
  score: number
  url: string
  created_utc: number
  num_comments: number
}

export function TopPosts() {
  const [posts, setPosts] = useState<RedditPost[]>([])
  const [loading, setLoading] = useState(true)
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
        // Handle error (e.g., show error message to user)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [subreddit])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Top Posts</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Comments</TableHead>
            <TableHead>Posted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.url}>
              <TableCell>
                <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {post.title}
                </a>
              </TableCell>
              <TableCell>{post.score}</TableCell>
              <TableCell>{post.num_comments}</TableCell>
              <TableCell>{formatDistanceToNow(new Date(post.created_utc * 1000))} ago</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}