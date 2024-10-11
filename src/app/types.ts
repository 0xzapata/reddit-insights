import type { Submission } from 'snoowrap'

export interface RedditPostPartial {
  title: string;
  content: string;
  score: number;
  numComments: number;
  createdAt: string;
  url: string;
}

export interface RedditPost {
  title: string;
  content: string;
  score: number;
  numComments: number;
  createdAt: string;
  url: string;
  categories: PostCategory;
}

export type SnoowrapSubmission = Submission;

export interface PostCategory {
  solutionRequests: boolean;
  painAndAnger: boolean;
  adviceRequests: boolean;
  moneyTalk: boolean;
}

export interface CategorizedPost extends RedditPostPartial {
  categories: PostCategory;
}