"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { Article } from "@/types/articles";
import { ArrowDownCircle, ArrowLeftCircle, ArrowUpCircle } from "lucide-react";

export default function PostPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [localVote, setLocalVote] = useState<"UP" | "DOWN" | null>(null);
  const [pending, setPending] = useState(false);

  const loadArticle = async () => {
    if (!slug) return;
    try {
      setLoading(true);
      setError(null);
      const resp = await apiRequest(`/api/v1/articles/${slug}`);
      // backend might return { article } or article directly
      const hasArticle = (v: unknown): v is { article: Article } =>
        typeof v === "object" && v !== null && "article" in (v as Record<string, unknown>);

      const a = hasArticle(resp) ? resp.article : (resp as Article);
      setArticle(a);
      setLocalVote(a?.user_vote || null);
    } catch (err) {
      console.error("Failed to load article:", err);
      setError("Failed to load article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const handleVote = async (type: "UP" | "DOWN") => {
    if (!article) return;
    if (pending) return;

  const current = localVote || null;
    const next = current === type ? null : type;

    // optimistic update
    setLocalVote(next);
    setArticle((prev) => (prev ? { ...prev, net_score: prev.net_score + (() => {
      if (current === type) return type === "UP" ? -1 : 1;
      if (current === null) return type === "UP" ? 1 : -1;
      return type === "UP" ? 2 : -2;
    })() } : prev));

    setPending(true);
    try {
      const body = { voteType: next ? next : "NONE" };
      const resp = await apiRequest(`/api/v1/articles/${article.slug}/vote`, "POST", body);
      // patch with server result if provided
      const hasArticle = (v: unknown): v is { article: Article } =>
        typeof v === "object" && v !== null && "article" in (v as Record<string, unknown>);
      const updated = hasArticle(resp) ? resp.article : (resp as Partial<Article>);
      if (updated && typeof updated === "object") {
        setArticle((prev) => (prev ? { ...prev, ...(updated as Partial<Article>) } : prev));
        if ((updated as Partial<Article>).user_vote !== undefined) {
          setLocalVote((updated as Partial<Article>).user_vote || null);
        }
      } else {
        // fallback reload
        loadArticle();
      }
    } catch (err) {
      console.error("Vote failed:", err);
      // rollback by reloading
      loadArticle();
    } finally {
      setPending(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error || "Article not found."}</p>
          <Link href="/posts" className="underline">Back to posts</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-4">
        
        <Link href="/posts" className="text-base text-gray-500 hover:underline flex items-center gap-1">
            <ArrowLeftCircle className="w-5 h-5 mr-1" />
            Back to posts
        </Link>
      </div>

      <div className="flex bg-accent border rounded-md shadow-sm overflow-hidden">
        <div className={`w-24 bg-accent flex flex-col items-center py-6 px-2 ${localVote === "UP" ? "bg-amber-600/90" : ""} ${localVote === "DOWN" ? "bg-primary" : ""}`}>
          <button
            onClick={() => handleVote("UP")}
            aria-label={`Upvote ${article.title}`}
            disabled={pending}
            className={`w-12 h-12 flex items-center justify-center rounded-md mb-2 transition-colors ${pending ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <ArrowUpCircle className={`w-8 h-8 ${localVote === "UP" ? "text-foreground" : "text-gray-500 hover:text-amber-600"}`} />
          </button>

          <div className="font-semibold text-base text-accent-foreground">{article.net_score}</div>

          <button
            onClick={() => handleVote("DOWN")}
            aria-label={`Downvote ${article.title}`}
            disabled={pending}
            className={`w-12 h-12 flex items-center justify-center rounded-md mt-2 transition-colors ${pending ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <ArrowDownCircle className={`w-8 h-8 ${localVote === "DOWN" ? "text-foreground" : "text-gray-500 hover:text-primary"}`} />
          </button>
        </div>

        <div className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-2">{article.title}</h1>
          <div className="text-xs text-gray-500 mb-4">By {article.author_username || "Unknown"} • {formatDate(article.created_at)}</div>

          <div className="prose max-w-none text-accent-foreground">{article.content || article.content_preview}</div>

          <div className="mt-6 text-xs text-gray-500 flex items-center gap-3">
            <span>{article.upvote_count} up</span>
            <span>•</span>
            <span>{article.downvote_count} down</span>
          </div>
        </div>
      </div>
    </div>
  );
}
