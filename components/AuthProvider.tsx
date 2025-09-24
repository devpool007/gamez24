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

      <>
        <div className="flex flex-col h-screen items-center justify-center bg-background">
            <div className="animate-pulse text-3xl text-foreground font-gaming">
            Loading...
            </div>
            <div className="animate-pulse text-sm text-foreground font-modern mt-2">
            Please be patient while the backend server boots up. This may take a moment.
            </div>
        </div>
      </>

    );
  }

  return <>{children}</>;
}
