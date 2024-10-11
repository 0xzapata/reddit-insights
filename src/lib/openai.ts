import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import type { RedditPostPartial } from "@/app/types";

const PostCategoryAnalysisSchema = z.object({
  solutionRequests: z.boolean().describe("Posts where people are seeking solutions for problems"),
  painAndAnger: z.boolean().describe("Posts where people are expressing pains or anger"),
  adviceRequests: z.boolean().describe("Posts where people are seeking advice"),
  moneyTalk: z.boolean().describe("Posts where people are talking about spending money"),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
	baseURL: "https://oai.helicone.ai/v1",
  defaultHeaders: {
    "Helicone-Auth": "Bearer pk-helicone-lnitpjy-fx6ujha-v3jmfmi-k3tqxda",
  },
});

export async function categorizePost(post: RedditPostPartial) {
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
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant that analyzes Reddit posts." },
      { role: "user", content: prompt }
    ],
    response_format: zodResponseFormat(PostCategoryAnalysisSchema, "post_category_analysis"),
  });

  return completion.choices[0].message.parsed;
}

// Example usage (you can keep this commented out or remove it)
// async function analyzePosts(posts: RedditPost[]) {
//   const analysisPromises = posts.map(categorizePost);
//   const analyses = await Promise.all(analysisPromises);
//   // Process analyses
//   // ...
// }