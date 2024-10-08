import { NextApiRequest, NextApiResponse } from 'next'
import snoowrap from 'snoowrap'
import { subDays } from 'date-fns'

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
      .filter((post) => new Date(post.created_utc * 1000) >= oneDayAgo)

    res.status(200).json(posts)
  } catch (error) {
    console.error('Error fetching Reddit posts:', error)
    res.status(500).json({ error: 'Failed to fetch Reddit posts' })
  }
}