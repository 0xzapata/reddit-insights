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
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import type { RedditPost } from "@/app/types"
import { CategoryBadge } from "@/components/CategoryBadge"

type SortKey = 'score' | 'numComments' | 'createdAt';

export function TopPosts() {
  const [posts, setPosts] = useState<RedditPost[]>([])
  const [loading, setLoading] = useState(true)
  const [sortKey, setSortKey] = useState<SortKey>('score')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return 'Invalid date'
    try {
      return `${formatDistanceToNow(date)} ago`
    } catch (error) {
      console.error('Error formatting date:', error)
      return 'Invalid date'
    }
  }

  const sortPosts = (a: RedditPost, b: RedditPost) => {
    let valueA: number | string
		let valueB: number | string;

    switch (sortKey) {
      case 'score':
      case 'numComments':
        valueA = a[sortKey];
        valueB = b[sortKey];
        break;
      case 'createdAt':
        valueA = new Date(a.createdAt).getTime();
        valueB = new Date(b.createdAt).getTime();
        break;
      default:
        return 0;
    }

    if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  }

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('desc')
    }
  }

  const sortedPosts = [...posts].sort(sortPosts)

  const getCategories = (post: RedditPost) => {
    return (
      <div className="flex flex-wrap">
        {Object.entries(post.categories).map(([category, value]) => (
          <CategoryBadge key={category} category={category} value={value} />
        ))}
      </div>
    )
  }

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
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort('score')}>
                Score <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort('numComments')}>
                Comments <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort('createdAt')}>
                Posted <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Categories</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPosts.map((post) => (
            <TableRow key={post.url}>
              <TableCell>
                <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {post.title}
                </a>
              </TableCell>
              <TableCell>{post.score}</TableCell>
              <TableCell>{post.numComments}</TableCell>
              <TableCell>{formatDate(post.createdAt)}</TableCell>
              <TableCell>{getCategories(post)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}