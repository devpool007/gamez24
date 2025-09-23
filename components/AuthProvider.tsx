// app/AuthProvider.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth();

  if (loading) {
    // Optional: put a full-screen loader here
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
