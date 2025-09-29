export type ArticleApiResponse = {
  articles: Article[];
  pagination: Pagination;
};

export type Article = {
  id: number;
  title: string;
  slug: string;
  author_id: number;
  author_username: string;
  created_at: string; // Or a Date object if you plan to parse it
  upvote_count: number;
  downvote_count: number;
  net_score: number;
  user_vote: "UP" | "DOWN" | null;
  content_preview: string;
  content?: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
};
