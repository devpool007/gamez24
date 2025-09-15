// app/AuthProvider.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    // Optional: put a full-screen loader here
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <span className="animate-pulse text-3xl text-foreground font-gaming">Loading...</span>
      </div>
    );
  }

  return <>{children}</>;
}
