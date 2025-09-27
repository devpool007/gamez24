// hooks/useAuth.ts
"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

export function useAuth() {
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMe() {
      try {
        const data = await apiRequest("/users/me");
        const userData = data as { id: string; username: string; email: string };
        setUser(userData,"");
      } catch {
        setUser(null,"");
      } finally {
        setLoading(false);
      }
    }

    fetchMe();
  }, [setUser]);

  return { loading };
}
