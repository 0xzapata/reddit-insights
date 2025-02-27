```markdown
# Product Requirements Document (PRD)

## Project Overview

We are building a Reddit analytics platform that allows users to obtain analytics for different subreddits. Users can view top content, analyze categories of posts, and add new subreddits for analysis. The platform will be developed using Next.js 14, Shadcn UI components, Tailwind CSS, and Lucide Icons.

## Core Functionalities

### 1. Subreddit Management

#### 1.1 View Available Subreddits

- **Display**: A list of available subreddits displayed as cards on the home page (app/page.tsx).
- **Default Subreddits**: Include common subreddits like ollama and openai.
- **Components**:
  - SubredditCard: Renders each subreddit with its name and basic info.

#### 1.2 Add New Subreddits

- **Add Button**: An "Add Subreddit" button on the home page opens a modal.
- **Modal Functionality**:
  - Input: Users can paste a Reddit URL or enter a subreddit name.
  - Validation: Ensure the subreddit exists before adding.
- **Post-Addition**:
  - A new SubredditCard is added to the list.
  - The state is updated to include the new subreddit.
- **Components**:
  - AddSubredditModal: Handles the addition of new subreddits.

### 2. Subreddit Detail Page

#### 2.1 Navigation

- **Routing**: Clicking on a SubredditCard navigates to /[subreddit]/page.tsx.
- **Dynamic Route**: The [subreddit] folder handles dynamic routing for different subreddits.

#### 2.2 Tabs: "Top Posts" and "Themes"

- **Tabs Component**: Allows users to switch between "Top Posts" and "Themes" views.
- **State Management**: Use local state or context to manage the active tab.

### 3. Fetching Reddit Posts ("Top Posts" Tab)

#### 3.1 Data Retrieval

- **Library**: Use Snoowrap for Reddit API interactions.
- **Data Scope**: Fetch posts from the past 24 hours.
- **Data Points**:
  - title
  - score
  - content
  - url
  - created_utc
  - num_comments

#### 3.2 Displaying Posts

- **Component**: PostsTable renders the posts in a table format.
- **Sorting**: Default sorting based on the number of upvotes (score).
- **Pagination**: Implement if necessary for more than 100 posts.

### 4. Analyzing Reddit Posts ("Themes" Tab)

#### 4.1 Post Categorization

- **Categories**:
  - Solution Requests: Seeking solutions for problems.
  - Pain & Anger: Expressing pain or anger.
  - Advice Requests: Seeking advice.
  - Money Talk: Discussing spending money.
- **Process**:
  - For each post, send data to OpenAI for categorization.
  - Use structured output to receive boolean flags for each category.
- **Concurrency**:
  - Perform API calls concurrently to improve performance.

#### 4.2 Displaying Categories

- **Components**:
  - ThemeCard: Displays each category with a title, description, and post count.
  - SidePanel: Opens upon clicking a ThemeCard, showing all posts under that category.
- **Interaction**:
  - Users can view detailed posts within each category via the SidePanel.

#### 4.3 Adding New Categories

- **Functionality**:
  - Users can add new categories via an "Add Category" button.
  - Upon addition, re-trigger the analysis to include the new category.
- **Components**:
  - AddCategoryModal: Handles the addition of new categories.
- **Data Update**:
  - Update the OpenAI prompt to include the new category.

## File Structure

The project aims for minimal files without compromising clarity.

```

reddit-analytics
├── README.md
├── biome.json
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── src
│   ├── app
│   │   ├── (auth)
│   │   ├── (marketing)
│   │   ├── dashboard
│   │   ├── favicon.ico
│   │   ├── fonts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── loading.tsx
│   ├── components
│   │   ├── icons.tsx
│   │   ├── layout
│   │   ├── mode-toggle.tsx
│   │   ├── tailwind-indicator.tsx
│   │   └── ui
│   ├── constants.ts
│   ├── db
│   │   ├── index.ts
│   │   └── schema.ts
│   ├── env.mjs
│   ├── lib
│   │   └── utils.ts
│   └── middleware.ts
├── tailwind.config.ts
└── tsconfig.json

```

## Documentation and Code Examples

### 1. Fetching Reddit Posts with Snoowrap

#### Installation

```bash
npm install snoowrap
```

#### Code Example

```typescript
import snoowrap from 'snoowrap';

// Define the structure for a Reddit post
interface RedditPost {
  title: string;
  content: string;
  score: number;
  numComments: number;
  createdAt: Date;
  url: string;
}

// Initialize the Snoowrap client
const r = new snoowrap({
  userAgent: 'reddit-insights-app',
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  username: 'your_username',
  password: 'your_password'
});

export async function fetchRecentPosts(subreddit: string): Promise<RedditPost[]> {
  const now = Math.floor(Date.now() / 1000);
  const oneDayAgo = now - 24 * 60 * 60;

  try {
    const posts = await r.getSubreddit(subreddit).getNew({ limit: 100 });
  
    const recentPosts = posts
      .filter((post: any) => post.created_utc > oneDayAgo)
      .map((post: any) => ({
        title: post.title,
        content: post.selftext,
        score: post.score,
        numComments: post.num_comments,
        createdAt: new Date(post.created_utc * 1000),
        url: post.url
      }));

    return recentPosts;
  } catch (error) {
    console.error('Error fetching Reddit posts:', error);
    return [];
  }
}

// Usage in Subreddit Page
const posts = await fetchRecentPosts('ollama');
```

**Notes**:

- Authentication: Replace the placeholder credentials with actual Reddit API credentials.
- Error Handling: Ensure proper error handling for failed API calls.

### 2. OpenAI Structured Output for Post Categorization

#### Installation

```bash
npm install openai zod
```

#### Code Example

```typescript
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

// Define the structure for the post category analysis using Zod
const PostCategoryAnalysisSchema = z.object({
  solutionRequests: z.boolean().describe("Posts where people are seeking solutions for problems"),
  painAndAnger: z.boolean().describe("Posts where people are expressing pains or anger"),
  adviceRequests: z.boolean().describe("Posts where people are seeking advice"),
  moneyTalk: z.boolean().describe("Posts where people are talking about spending money"),
});

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: 'your_openai_api_key'
});

export async function categorizePost(post: RedditPost) {
  const categoryDescriptions = Object.entries(PostCategoryAnalysisSchema.shape).map(([key, value]) => {
    return `${key}: ${value.description}`;
  }).join('\n');

  const prompt = `
    Analyze the following Reddit post and categorize it based on these criteria:
    ${categoryDescriptions}

    Post Title: ${post.title}
    Post Content: ${post.content}

    Provide a JSON response with boolean values for each category.
  `;

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a helpful assistant that analyzes Reddit posts." },
      { role: "user", content: prompt }
    ],
    response_format: zodResponseFormat(PostCategoryAnalysisSchema, "post_category_analysis"),
  });

  return completion.choices[0].message.parsed;
}

// Example usage
async function analyzePosts(posts: RedditPost[]) {
  // Perform concurrent API calls
  const analysisPromises = posts.map(categorizePost);
  const analyses = await Promise.all(analysisPromises);

  // Process analyses
  // ...
}
```

#### Example Response

```json
{
  "solutionRequests": true,
  "painAndAnger": false,
  "adviceRequests": true,
  "moneyTalk": false
}
```

**Notes**:

- Concurrency: Use Promise.all to process multiple posts concurrently.
- API Limits: Be mindful of OpenAI's rate limits and error handling.
- Dynamic Categories: If new categories are added, update the PostCategoryAnalysisSchema accordingly.

### 3. Component and State Management

#### Home Page (app/page.tsx)

- **State**:
  - subreddits: Array of subreddit names.
- **Functions**:
  - addSubreddit: Adds a new subreddit to the state.
- **Components**:
  - SubredditCard
  - AddSubredditModal

#### Subreddit Page (app/[subreddit]/page.tsx)

- **Data Fetching**:
  - Fetch posts in getServerSideProps or using useEffect for client-side fetching.
- **State**:
  - posts: Array of RedditPost.
  - categories: Analysis results from OpenAI.
  - activeTab: Currently selected tab.
- **Functions**:
  - fetchPosts: Fetches recent posts using Snoowrap.
  - analyzePosts: Categorizes posts using OpenAI.
- **Components**:
  - Tabs
  - PostsTable
  - ThemeCard
  - SidePanel
  - AddCategoryModal

## Developer Alignment Details

### Authentication and API Keys

- **Reddit API**:
  - Obtain credentials from Reddit Apps.
  - Ensure secure storage of clientId, clientSecret, username, and password.
- **OpenAI API**:
  - Obtain API key from OpenAI Dashboard.
  - Securely store the apiKey.

### Concurrency and Performance

- **Concurrent Processing**:
  - Use Promise.all for concurrent API calls to OpenAI.
  - Limit concurrency if necessary to avoid rate limits.
- **Caching**:
  - Implement caching strategies for Reddit posts and analysis results if appropriate.

### Error Handling

- **API Errors**:
  - Gracefully handle errors from both Reddit and OpenAI APIs.
  - Provide user feedback in the UI for any issues.
- **Validation**:
  - Validate user inputs when adding subreddits or categories.

### Styling and UI Components

- **Tailwind CSS**:
  - Utilize Tailwind classes for styling components.
  - Ensure responsiveness across different screen sizes.
- **Shadcn UI Components**:
  - Leverage pre-built components where applicable.
- **Icons**:
  - Use Lucide Icons for consistent iconography.

### State Management

- **Local State**:
  - Use React's useState and useEffect hooks for local component state.
- **Global State**:
  - If needed, use Context API or state management libraries for global state (e.g., list of subreddits).

### Accessibility and SEO

- **Accessibility**:
  - Ensure all interactive elements are accessible via keyboard.
  - Use semantic HTML elements.
- **SEO**:
  - Optimize pages for search engines with proper meta tags.

### Security Considerations

- **API Keys**:
  - Do not expose API keys in the client-side code.
  - Use environment variables and server-side fetching where possible.
- **Input Sanitization**:
  - Sanitize user inputs to prevent XSS attacks.

### Testing

- **Unit Tests**:
  - Write unit tests for utility functions in lib/utils.ts.
- **Integration Tests**:
  - Test API interactions with mock data.
- **End-to-End Tests**:
  - Use testing frameworks like Cypress for end-to-end testing.

```

```
