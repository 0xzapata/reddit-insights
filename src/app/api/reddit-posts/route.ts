import { type NextRequest, NextResponse } from 'next/server'
import snoowrap, { type Listing, type Submission } from 'snoowrap'
import { subDays } from 'date-fns'
import type { CategorizedPost, RedditPostPartial } from '@/app/types'
import { categorizePost } from '@/lib/openai'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const subreddit = searchParams.get('subreddit')

  if (!subreddit) {
    return NextResponse.json({ error: 'Subreddit name is required' }, { status: 400 })
  }

  try {
    const r = new snoowrap({
      userAgent: 'reddit-insights-app',
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      username: process.env.REDDIT_USERNAME,
      password: process.env.REDDIT_PASSWORD
    })

    const oneDayAgo = subDays(new Date(), 1)
    const posts = await r
      .getSubreddit(subreddit)
      .getTop({ time: "day", limit: 100 })
      .then((posts: Listing<Submission>) => posts.filter((post: Submission) => {
        const createdAt = new Date(post.created_utc * 1000);
        return createdAt >= oneDayAgo;
      }))

    const categorizedPosts: CategorizedPost[] = await Promise.all(
      posts.map(async (post): Promise<CategorizedPost> => {
        const redditPost: RedditPostPartial = {
          title: post.title,
          content: post.selftext,
          score: post.score,
          numComments: post.num_comments,
          createdAt: new Date(post.created_utc * 1000).toISOString(),
          url: post.url,
        };
        const categories = await categorizePost(redditPost);
        return {
          ...redditPost,
          categories: categories || {
            solutionRequests: false,
            painAndAnger: false,
            adviceRequests: false,
            moneyTalk: false,
          },
        };
      })
    );

    return NextResponse.json(categorizedPosts)
  } catch (error) {
    console.error('Error fetching and categorizing Reddit posts:', error)
    return NextResponse.json({ error: 'Failed to fetch and categorize Reddit posts' }, { status: 500 })
  }
}