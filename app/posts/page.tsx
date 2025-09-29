"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { ArticleApiResponse, Article } from "@/types/articles";
import { ArrowDownCircle, ArrowUpCircle,  } from "lucide-react";

export default function ArticlesListPage() {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // local vote state per article id (UI only)
  const [localVotes, setLocalVotes] = useState<Record<number, "UP" | "DOWN" | null>>({});
  const [pendingVotes, setPendingVotes] = useState<Record<number, boolean>>({});

  // Fetch articles
  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: ArticleApiResponse = await apiRequest("/api/v1/articles");
      setArticles(response.articles || []);

      // initialize localVotes from user_vote if provided
      const initialVotes: Record<number, "UP" | "DOWN" | null> = {};
      (response.articles || []).forEach((a) => {
        initialVotes[a.id] = (a.user_vote as "UP" | "DOWN") || null;
      });
      setLocalVotes(initialVotes);
    } catch (err) {
      console.error("Failed to load posts:", err);
      setError("Failed to load posts. Please login to view posts!.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleVote = async (article: Article, type: "UP" | "DOWN") => {
    const id = article.id;
    if (pendingVotes[id]) return; // avoid double clicks

    const current = localVotes[id] || null;
    const next = current === type ? null : type; // null means remove vote

    // Optimistic UI: update localVotes and adjust net_score locally
    setLocalVotes((prev) => ({ ...prev, [id]: next }));
    setArticles((prev) =>
      prev
        ? prev.map((a) => {
            if (a.id !== id) return a;
            // compute delta
            let delta = 0;
            if (current === type) {
              // removing same vote
              delta = type === "UP" ? -1 : 1;
            } else if (current === null) {
              // adding new vote
              delta = type === "UP" ? 1 : -1;
            } else {
              // switching vote (e.g., UP -> DOWN)
              delta = type === "UP" ? 2 : -2;
            }
            return { ...a, net_score: a.net_score + delta };
          })
        : prev
    );

    // mark pending
    setPendingVotes((p) => ({ ...p, [id]: true }));

    try {
      // send to backend
      const body = { voteType: next ? next : "NONE" };
      const resp = await apiRequest(`/api/v1/articles/${article.slug}/vote`, "POST", body);

      // If backend returns updated article, patch it in list; otherwise lazily reload the article
      if (resp && typeof resp === "object") {
  // try to detect article-like shape
  const updated = resp as Partial<Article>;
        setArticles((prev) =>
          prev
            ? prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
            : prev
        );
        // ensure localVotes matches server's user_vote if present
        if (typeof updated.user_vote !== "undefined") {
          setLocalVotes((prev) => ({ ...prev, [id]: (updated.user_vote as "UP" | "DOWN" | null) || null }));
        }
      } else {
        // fallback: reload articles lazily (non-blocking)
        loadArticles();
      }
    } catch (err) {
      console.error("Vote failed:", err);
      // revert optimistic changes by reloading
      loadArticles();
    } finally {
      setPendingVotes((p) => ({ ...p, [id]: false }));
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // --- Post article form state & handler ---
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);

  const postArticle = async (e?: React.FormEvent) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    setPostError(null);

    if (!postTitle.trim() || !postContent.trim()) {
      setPostError("Please provide both a title and some content.");
      return;
    }

    setPosting(true);
    try {
      const body = { title: postTitle.trim(), content: postContent.trim(), slug: "" };
      await apiRequest("/api/v1/articles", "POST", body);
      // reload list and clear inputs
      setPostTitle("");
      setPostContent("");
      loadArticles();
    } catch (err) {
      console.error("Failed to post article:", err);
      setPostError("Failed to post article. Please try again.");
    } finally {
      setPosting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-modern font-bold mb-6">Posts</h1>

      {/* Post form */}
      <form
        onSubmit={postArticle}
        className="mb-6 bg-card border rounded-md p-4"
      >
        <div className="mb-2">
          <label className="block text-base font-bold mb-1">Title</label>
          <input
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            className="w-full rounded-md border px-3 py-2 bg-input"
            placeholder="My Post"
          />
        </div>

        <div className="mb-3">
          <label className="block text-base font-bold mb-1">Content</label>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full rounded-md border px-3 py-2 bg-input min-h-[120px]"
            placeholder="This is the content of my post..."
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={posting}
            className={`px-4 py-2 rounded-md bg-amber-600 text-white  ${posting ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-700"}`}
          >
            {posting ? "Posting..." : "Post"}
          </button>
          {postError ? <div className="text-sm text-red-600">{postError}</div> : null}
        </div>
      </form>

      <div className="space-y-4">
        {(articles || []).map((article) => (
          <div
            key={article.id}
            className="flex bg-accent border rounded-md shadow-sm overflow-hidden"
          >
            {/* Vote column */}
            <div className={`w-20 bg-accent flex flex-col items-center py-4 px-2  ${localVotes[article.id] === "UP"
                    ? "bg-amber-600/90"
                    : ""} ${localVotes[article.id] === "DOWN"
                    ? "bg-primary"
                    : ""}`}>
              <button
                onClick={() => handleVote(article, "UP")}
                aria-label={`Upvote ${article.title}`}
                disabled={!!pendingVotes[article.id]}
                className={`w-10 h-10 flex items-center justify-center rounded-md mb-2 transition-colors ${pendingVotes[article.id] ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <ArrowUpCircle className={`w-7 h-8 ${localVotes[article.id] === "UP" ? "text-foreground" : "text-gray-500 hover:text-amber-600"}`} />
              </button>

              <div className="font-semibold text-base text-accent-foreground">
                {article.net_score}
              </div>

              <button
                onClick={() => handleVote(article, "DOWN")}
                aria-label={`Downvote ${article.title}`}
                disabled={!!pendingVotes[article.id]}
                className={`w-10 h-10 flex items-center justify-center rounded-md mb-2 transition-colors ${pendingVotes[article.id] ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <ArrowDownCircle className={`w-7 h-8 ${localVotes[article.id] === "DOWN" ? "text-foreground" : "text-gray-500 hover:text-primary"}`} />
              </button>
            </div>

            {/* Content column */}
            <div className="flex-1 p-4">
              <div className="flex items-center justify-between">
                <Link
                  href={`/posts/${article.slug}`}
                  className="text-lg font-semibold text-foreground hover:underline"
                >
                  {article.title}
                </Link>
                <div className="text-xs text-gray-500">{formatDate(article.created_at)}</div>
              </div>

              <div className="text-sm text-accent-foreground mt-2">
                {article.content_preview || "No preview available."}
              </div>

              <div className="mt-3 text-xs text-gray-500 flex items-center gap-3">
                <span>By {article.author_username || "Unknown"}</span>
                <span>•</span>
                <span>{article.upvote_count} up</span>
                <span>{article.downvote_count} down</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
