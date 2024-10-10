import type { NextApiRequest, NextApiResponse } from 'next/types'
import snoowrap from 'snoowrap'
import { subDays } from 'date-fns'
import type { CategorizedPost, SnoowrapSubmission } from '@/app/types'
import { categorizePost } from '@/lib/openai'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { subreddit } = req.query

  if (!subreddit || typeof subreddit !== 'string') {
    return res.status(400).json({ error: 'Subreddit name is required' })
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
      .filter((post: SnoowrapSubmission) => {
        const createdAt = new Date(post.created_utc * 1000);
        return createdAt >= oneDayAgo;
      })

    const categorizedPosts: CategorizedPost[] = await Promise.all(
      posts.map(async (post): Promise<CategorizedPost> => {
        const redditPost = {
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
          categories,
        };
      })
    );

    res.status(200).json(categorizedPosts)
  } catch (error) {
    console.error('Error fetching and categorizing Reddit posts:', error)
    res.status(500).json({ error: 'Failed to fetch and categorize Reddit posts' })
  }
}