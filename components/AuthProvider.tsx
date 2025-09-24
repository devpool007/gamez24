// app/AuthProvider.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useClaimStore } from "@/store/useClaimStore";
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth();
  const { loadClaimedGames, initializeUserStats } = useClaimStore();

  // Initialize game stats when user logs in or app loads
  useEffect(() => {
    console.log("🚀 App useEffect - User reloaded:");

    initializeUserStats();
    loadClaimedGames();
  }, []);
  // const {initializeUserStats} = useClaimStore();
  if (loading) {
    // Optional: put a full-screen loader here
    // initializeUserStats();
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <span className="animate-pulse text-3xl text-foreground font-gaming">
          Loading...
        </span>
      </div>
    );
  }

  return <>{children}</>;
}
